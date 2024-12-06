{/* Commented out to be able to do the frontend work */}

// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/prisma";
// import bcrypt from "bcryptjs";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!
//     }),
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password"},
//       },
//       async authorize(credentials) {
//         const user = await prisma.parent_user.findUnique({
//           where: { email: credentials?.email },
//         });

//         if (user && user.password) {
//           const isPasswordValid = await bcrypt.compare(credentials?.password!, user.password);

//           if (isPasswordValid) {
//             return user;
//           }
//         }

//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     session: async ({ session, token, user }) => {
//       if (session.user) {
//         session.user.id = user.id;
//         session.user.email = user.email;
//         session.user.name = user.name;
//       }
//       return session;
//     },
//   },
// };
