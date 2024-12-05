// Handles savings_goal update
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";
import { dollarsToCents } from "@/lib/utils";

/**
 * 
 * @param req - Request Object - Must contain { amount: number; }
 * @param res - Response Object
 * 
 * @returns Successful response or error
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Authorize User
    const childUser = await verifyToken(req, res);

    if (!childUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Retrieve new savings_goal value from request
    const amount = req.body.amount;
    const convertedAmount = dollarsToCents(amount);

    // Update savings goal value
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
