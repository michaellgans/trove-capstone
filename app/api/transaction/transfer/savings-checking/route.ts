// Handles transfer between checking/savings account
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "@/lib/verifyToken";
import { dollarsToCents } from "@/lib/utils";
import { newCheckingToSavingsTransfer, newSavingsToCheckingTransfer } from "@/lib/server-actions";

/**
 * 
 * @param req - Request Object - Must contain { direction: string; amount: number; }
 * @param res - Response Object
 * 
 * @returns Successful response or error
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Authorize user
    const childUser = await verifyToken(req, res);

    if (!childUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Retrieve transfer info from request body
    const direction = req.body.direction;
    const amount = req.body.amount;
    const convertedAmount = dollarsToCents(parseInt(amount));

    // Initiate transfer based on direction value
    if (direction === "Checking To Savings") {
      await newCheckingToSavingsTransfer(childUser.id, convertedAmount);
    } else if (direction === "Savings to Checking") {
      await newSavingsToCheckingTransfer(childUser.id, convertedAmount);
    }

    return res.status(200).json({ message: "Successfull Transfer" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to complete transfer" });
  }
}
