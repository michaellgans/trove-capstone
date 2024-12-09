// Home route, provides all data needed to populate user and family information
import { NextRequest, NextResponse } from "next/server";
import verifyToken from "@/lib/verifyToken";
import { prisma } from "@/prisma";

/**
 * 
 * @param req - Request Object
 * 
 * @returns - User data object:
 *    {
 *      user: {
 *              id: string;
 *              name: string;
 *              username: string;
 *            }
 *      account: {
 *                 id: string;
 *                 child_id: string;
 *                 parent_id: string;
 *                 checking_balance: number;
 *                 savings_balance: number;
 *                 savings_goal: number;
 *               }
 *      loan: {
 *              id: string;
 *              lender_id: string;
 *              borrower_id: string;
 *              interest_rate: number;
 *              loan_amount: number;
 *              current_balance: number;
 *              due_date: string;
 *              p_account_id: string;
 *            }
 *      family: {
 *                parent: {
 *                          id: string;
 *                          name: string;
 *                          email: string;
 *                          avatar_img: string;
 *                        }
 *                siblings: [
 *                            {
 *                              id: string;
 *                              name: string;
 *                              email: string;
 *                              avatar_img: string;
 *                            }
 *                            ...
 *                          ]
 *              }
 *    }
 */
export default async function GET(req: NextRequest) {
  try {
    const childUser = await verifyToken(req);

    if (!childUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const childAccount = await prisma.child_account.findUnique({
      where: { child_id: childUser.id },
    });

    const loanInfo = await prisma.loan.findFirst({
      where: { borrower_id: childUser.id },
    });

    const parentUser = await prisma.parent_user.findUnique({
      where: {
        id: childUser.parent_id,
      },
      select: {
        id: true,
        name: true,
        avatar_img: true,
      },
    });

    if (!parentUser) {
      throw new Error("Parent user not found for child");
    }

    const siblings = await prisma.child_user.findMany({
      where: {
        parent_id: parentUser.id,
        id: {
          not: childUser.id,
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatar_img: true,
      },
    });

    const familyData = {
      user: childUser,
      account: childAccount,
      loan: loanInfo,
      family: {
        parent: parentUser,
        siblings: siblings,
      }
    };

    return NextResponse.json(familyData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve user data" }, { status: 500 });
  }
}
