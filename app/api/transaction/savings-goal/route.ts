// Handles savings_goal update
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";
import { dollarsToCents } from "@/lib/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const childUser = await verifyToken(req, res);

    if (!childUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const amount = req.body.amount;
    const convertedAmount = dollarsToCents(amount);

    await prisma.child_account.update({
      where: {
        child_id: childUser.id,
      },
      data: {
        savings_goal: convertedAmount,
      },
    });

    res.status(200).json({ message: "Set Savings Goal" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update savings goal" });
  }
}
