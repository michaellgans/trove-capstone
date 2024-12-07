import { Adapter, AdapterAccount, AdapterUser } from "next-auth/adapters";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


export const CustomPrismaAdapter = (prisma: any): Adapter => {
  const adapter = PrismaAdapter(prisma);

  return {
    ...adapter,
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
    async getUserByAccount({ provider, providerAccountId }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: provider,
            providerAccountId: providerAccountId,
          },
        },
        include: { user: true },
      });

      if (account?.user) {
        const adapterUser = {
          ...account.user,
          emailVerified: null,
        }

        return adapterUser;
      }

      return null
    }
  }
};

