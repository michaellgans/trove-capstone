// Handles savings_goal update
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const childUser = await verifyToken(req, res);

    if (!childUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update savings goal" });
  }
}
