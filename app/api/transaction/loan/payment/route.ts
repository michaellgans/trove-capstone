// Handles loan payment
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";
import { newChildToChildLoanPayment, newChildToParentLoanPayment } from "@/lib/server-actions";
import { centsToDollars } from "@/lib/utils";

/**
 * 
 * @param req - Request Object - Must contain { lender_id: string; amount: number; description: string; }
 * @param res - Response Object
 * 
 * @returns Successful response or error
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Authenticate User
    const childUser = await verifyToken(req, res);

    if (!childUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Retrieve payment info from request
    const lender_id = req.body.lender_id;
    const amount = req.body.amount;
    const description = req.body.description;

    // Determine if lender is parent or child
    const lendingParent = await prisma.parent_user.findUnique({
      where: {
        id: lender_id,
      },
    });
    const lendingChild = await prisma.child_user.findUnique({
      where: {
        id: lender_id,
      },
    });

    // Initiate loan payment
    if (lendingParent) {
      await newChildToParentLoanPayment(lendingParent.id, childUser.id, centsToDollars(parseInt(amount)), description);
    } else if (lendingChild) {
      await newChildToChildLoanPayment(lendingChild.id, childUser.id, centsToDollars(parseInt(amount)), description);
    }

    res.status(200).json({ message: "Successful Loan Payment" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to complete loan payment" });
  }
}
