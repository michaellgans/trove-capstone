// Handles transfer from child user to other parent or child user
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";
import { newChildToChildTransfer, newChildToParentTransfer } from "@/lib/server-actions";
import { dollarsToCents } from "@/lib/utils";

/**
 * 
 * @param req - Request Object - Must contain { receiving_id(id of parent or child receiving transfer): string; amount: number; description: string; }
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

    // Retrieve transfer data from request
    const receiving_id = req.body.receiving_id;
    const amount = req.body.amount;
    const description = req.body.description ? req.body.description : "";

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

    res.status(200).json({ message: "Successful Transfer" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to complete transfer" });
  }
}
