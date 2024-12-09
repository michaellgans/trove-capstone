// Handles transfer from child user to other parent or child user
import { NextRequest, NextResponse } from "next/server";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";
import { newChildToChildTransfer, newChildToParentTransfer } from "@/lib/server-actions";
import { dollarsToCents } from "@/lib/utils";

/**
 * 
 * @param req - Request Object - Must contain { receiving_id(id of parent or child receiving transfer): string; amount: number; description: string; }
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

    // Retrieve transfer data from request
    const receiving_id = body.receiving_id;
    const amount = body.amount;
    const description = body.description ? body.description : "";

    // Determine if transfer recipient is parent or child user
    const receivingParent = await prisma.parent_user.findUnique({
      where: {
        id: receiving_id,
      },
    });
    const receivingChild = await prisma.child_user.findUnique({
      where: {
        id: receiving_id,
      },
    });

    // Initiate transfer
    if (receivingParent) {
      await newChildToParentTransfer(childUser.id, receiving_id, dollarsToCents(parseInt(amount)), description);
    } else if (receivingChild) {
      await newChildToChildTransfer(childUser.id, receiving_id, dollarsToCents(parseInt(amount)), description);
    }

    return NextResponse.json({ message: "Successful Transfer" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to complete transfer" }, { status: 500 });
  }
}
