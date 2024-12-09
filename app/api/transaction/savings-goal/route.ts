// Handles savings_goal update
import { NextRequest, NextResponse } from "next/server";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";
import { dollarsToCents } from "@/lib/utils";

/**
 * 
 * @param req - Request Object - Must contain { amount: number; }
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

    // Retrieve new savings_goal value from request
    const amount = body.amount;
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

    NextResponse.json({ message: "Successfully Set Savings Goal" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update savings goal" }, { status: 500 });
  }
}
