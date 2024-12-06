// Handles new loan creation
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";
import { newChildToChildLoan, newParentToChildLoan } from "@/lib/server-actions";
import { dollarsToCents } from "@/lib/utils";

/**
 * 
 * @param req - Request Object - Must contain { lender_id: string; loan: {interest_rate: number; days_due: number; loan_amount: number; description: string;}; }
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

    // Retrieve Loan info from request
    const lender_id = req.body.lender_id;
    const loan = req.body.loan;

    // Determine if lender is child or parent
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

    // Create new loan
    if (lendingParent) {
      await newParentToChildLoan(
        lendingParent.id,
        childUser.id,
        {
          interest_rate: loan.interest_rate,
          days_due: loan.days_due,
          loan_amount: dollarsToCents(parseInt(loan.amount)),
          description: loan.description,
        }
      );
    } else if (lendingChild) {
      await newChildToChildLoan(
        lendingChild.id,
        childUser.id,
        {
          interest_rate: loan.interest_rate,
          days_due: loan.days_due,
          loan_amount: dollarsToCents(parseInt(loan.amount)),
          description: loan.description,
        }
      );
    }

    res.status(200).json({ message: "Successful Loan Creation" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create new loan" });
  }
}
