// Home route, provides all data needed to populate user and family information
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const childUser = await verifyToken(req, res);

    if (!childUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const childAccount = await prisma.child_account.findUnique({
      where: { child_id: childUser.id },
    });

    const parentUser = await prisma.parent_user.findUnique({
      where: { id: childUser.parent_id },
    });
  } catch (error) {
    return res.status(401).json({ error: "Failed to retrieve user data" });
  }
}
