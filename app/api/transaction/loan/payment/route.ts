// Handles loan payment
import { NextRequest, NextResponse } from "next/server";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";
import { newChildToChildLoanPayment, newChildToParentLoanPayment } from "@/lib/server-actions";
import { dollarsToCents } from "@/lib/utils";

/**
 * 
 * @param req - Request Object - Must contain { lender_id: string; amount: number; description: string; }
 * 
 * @returns Successful response or error
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Authenticate User
    const childUser = await verifyToken(req);

    if (!childUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Retrieve payment info from request
    const lender_id = body.lender_id;
    const amount = body.amount;
    const description = body.description;

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
      await newChildToParentLoanPayment(lendingParent.id, childUser.id, dollarsToCents(parseInt(amount)), description);
    } else if (lendingChild) {
      await newChildToChildLoanPayment(lendingChild.id, childUser.id, dollarsToCents(parseInt(amount)), description);
    }

    return NextResponse.json({ message: "Successful Loan Payment" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to complete loan payment" }, { status: 500 });
  }
}
