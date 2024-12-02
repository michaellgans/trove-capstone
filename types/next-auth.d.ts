import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      avatarImg?: string | null;
    };
  }

  interface ParentUser {
    id: string;
    email: string;
    name?: string;
    avatarImg?: string;
  }

  interface ChildUser {
    id: string;
    username: string;
    name?: string;
    avatarImg?: string;
  }
}
