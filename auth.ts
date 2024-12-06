{/* Commented out to be able to do the frontend work */}

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";
import { Adapter, AdapterAccount, AdapterUser } from "next-auth/adapters";

export const CustomPrismaAdapter = (): Adapter => ({
  async getUser(id) {
    const user = await prisma.parent_user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.avatar_img || null,
      emailVerified: null,
    }
  },
  async getUserByEmail(email) {
    const user = await prisma.parent_user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.avatar_img || null,
      emailVerified: null
    }
  },
  async createUser(user: AdapterUser) {
    return prisma.parent_user.create({
      data: {
        name: user.name!,
        email: user.email,
        avatar_img: user.image || null,
      },
    });
  },
  async linkAccount(account: AdapterAccount) {
    return prisma.account.create({
      data: {
        userId: account.userId,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      },
    });
  },
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.name = user.name;
      }
      return session;
    },
  },
};
