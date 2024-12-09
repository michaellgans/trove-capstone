// Handles new loan creation
import { NextRequest, NextResponse } from "next/server";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";
import { newChildToChildLoan, newParentToChildLoan } from "@/lib/server-actions";
import { dollarsToCents } from "@/lib/utils";

/**
 * 
 * @param req - Request Object - Must contain { lender_id: string; loan: {interest_rate: number; days_due: number; loan_amount: number; description: string;}; }
 * 
 * @returns Successful response or error
 */
export default async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Authorize User
    const childUser = await verifyToken(req);

    if (!childUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Retrieve Loan info from request
    const lender_id = body.lender_id;
    const loan = body.loan;

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

    NextResponse.json({ message: "Successful Loan Creation" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create new loan" }, { status: 500 });
  }
}
