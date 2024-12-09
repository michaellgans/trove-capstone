// Handles transfer between checking/savings account
import { NextRequest, NextResponse } from "next/server";
import verifyToken from "@/lib/verifyToken";
import { dollarsToCents } from "@/lib/utils";
import { newCheckingToSavingsTransfer, newSavingsToCheckingTransfer } from "@/lib/server-actions";

/**
 * 
 * @param req - Request Object - Must contain { direction: string; amount: number; }
 * 
 * @returns Successful response or error
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Authorize user
    const childUser = await verifyToken(req);

    if (!childUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Retrieve transfer info from request body
    const direction = body.direction;
    const amount = body.amount;
    const convertedAmount = dollarsToCents(parseInt(amount));

    // Initiate transfer based on direction value
    if (direction === "Checking To Savings") {
      await newCheckingToSavingsTransfer(childUser.id, convertedAmount);
    } else if (direction === "Savings to Checking") {
      await newSavingsToCheckingTransfer(childUser.id, convertedAmount);
    }

    return NextResponse.json({ message: "Successful Transfer" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to complete transfer" }, { status: 500 });
  }
}
