import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";
import { CustomPrismaAdapter } from "./lib/customPrismaAdapter";

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const user = await prisma.parent_user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && user.password) {
          const isPasswordValid = await bcrypt.compare(credentials?.password!, user.password);

          if (isPasswordValid) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token}) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    jwt: async ({ token, user}) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
  },
};
