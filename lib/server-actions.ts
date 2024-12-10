'use server'
import { Child, Child_Account, GoogleSignUpPayload, Loans, LoanDataPayload, Parent, Parent_Account, SignUpPayload, Transactions } from "@/types/types";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { dollarsToCents, centsToDollars } from "./utils";


// GET Server Actions
/**
 * Fetches the parent user details by their ID.
 * 
 * @param parent_id - The ID of the parent user to fetch.
 * @returns Parent object.
 */
export async function getParentById(parent_id: string): Promise<Parent> {
  try {
    console.log("Fetching parent for ID:", parent_id);
    const parent = await prisma.parent_user.findUnique({
      where: {
        id: parent_id,
      },
    });

    if (!parent) {
      throw new Error();
    }

    return parent;
  } catch (error) {
    // console.error(error);
    throw new Error("Unable to fetch parent");
  }
}

/**
 * Fetches the child user details by their parents ID.
 * 
 * @param parent_id - The ID of the parent user to fetch by.
 * @returns Array of Child objects.
 */
export async function getChildrenByParent(parent_id: string): Promise<Child[]> {
  try {
    const children = await prisma.child_user.findMany({
      where: {
        parent_id: parent_id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatar_img: true,
        parent_id: true,
      }
    });

    if (children.length === 0) {
      throw new Error();
    }

    return children;
  } catch (error) {
    // console.error(error);
    throw new Error("Unable to fetch children");
  }
}

/**
 * Fetches the parent account details by their parent ID.
 * 
 * @param parent_id - The ID of the parent user to fetch.
 * @returns Parent Account object.
 */
export async function getParentAccountByParentId(parent_id: string): Promise<Parent_Account> {
  try {
    const parentAccount = await prisma.parent_account.findUnique({
      where: {
        parent_id: parent_id,
      },
    });

    if (!parentAccount) {
      throw new Error();
    }

    return parentAccount;
  } catch (error) {
    // console.error(error);
    throw new Error('Unable to fetch parent account');
  }
}

/**
 * Fetches the child account details by their child ID.
 * 
 * @param child_id - The ID of the child user to fetch.
 * @returns Child Account object.
 */
export async function getChildAccountByChildId(child_id: string): Promise<Child_Account[]> {
  try {
    const childAccount = await prisma.child_account.findMany({
      where: {
        child_id: child_id,
      },
    });

    if (!childAccount) {
      throw new Error();
    }

    return childAccount;
  } catch (error) {
    // console.error(error);
    throw new Error('Unable to fetch child account');
  }
}

/**
 * Fetches the child account details by their parent ID.
 * 
 * @param parent_id - The ID of the parent user to fetch by.
 * @returns Array of Child Account objects.
 */
export async function getChildAccountByParentId(parent_id: string): Promise<Child_Account[]> {
  try {
    const childAccountByParentAccount = await prisma.child_account.findMany({
      where: {
        parent_id: parent_id,
      },
    });

    if (childAccountByParentAccount.length === 0) {
      throw new Error();
    }

    return childAccountByParentAccount;
  } catch (error) {
    // console.error(error);
    throw new Error('Unable to fetch child accounts');
  }
}

/**
 * Fetches the all transactions details by parent account ID.
 * 
 * @param p_account_id - The ID of the parent account to fetch by.
 * @returns Array of transactions objects.
 */
export async function getAllTransactionsByParentAccountId(p_account_id: string): Promise<Transactions[]> {
  try {
    const transactionsByParentAccount = await prisma.transaction.findMany({
      where: {
        p_account_id: p_account_id,
      },
    });

    if (transactionsByParentAccount.length === 0) {
      throw new Error();
    }

    return transactionsByParentAccount;
  } catch (error) {
    // console.error(error);
    throw new Error('Unable to fetch account transactions');
  }
}

/**
 * Fetches the all transactions details by child ID.
 * 
 * @param child_id - The ID of the child to fetch by.
 * @returns Array of transactions objects by child.
 */
export async function getTransactionsByChildId(child_id: string): Promise<Transactions[]> {
  try {
    // Fetch the child account's c_account_id
    const childAccount = await prisma.child_account.findUnique({
      where: {
        child_id: child_id,
      },
      select: {
        id: true,
      },
    });

    if (!childAccount) {
      console.warn(`No child account found for child_id: ${child_id}`);
      return [];
    }

    const c_account_id = childAccount.id;

    // Fetch transactions where to_account_id matches c_account_id
    const transactionsToAccount = await prisma.transaction.findMany({
      where: {
        to_account_id: c_account_id,
      },
    });

    // Fetch transactions where from_account_id matches c_account_id
    const transactionsFromAccount = await prisma.transaction.findMany({
      where: {
        from_account_id: c_account_id,
      },
    });

    // Combine both results
    const allTransactionsByChild = [...transactionsToAccount, ...transactionsFromAccount];

    return allTransactionsByChild;
  } catch (error) {
    // console.error(error);
    throw new Error('Unable to fetch transactions');
  }
}

/**
 * Fetches loan where child_id is borrower.
 * 
 * @param child_id - The ID of the child to fetch by.
 * @returns Loan object.
 */
export async function getLoanWhereChildIsBorrower(child_id: string): Promise<Loans[]> {
  try {
    // Get Child Account
    const childAccount = await prisma.child_account.findUnique({
      where: {
        child_id: child_id
      },
    });

    if (!childAccount) {
      throw new Error();
    }

    // Get Loan
    const loan = await prisma.loan.findMany({
      where: {
        borrower_id: childAccount.id
      }
    })

    if (loan.length === 0) {
      throw new Error();
    }

    return loan[0];
  } catch (error) {
    throw new Error('Unable to fetch loan');
  }
}


/**
 * Fetches the all transactions details by child ID.
 * 
 * @param child_id - The ID of the child to fetch by.
 * @returns Array of loan objects by child.
 */
export async function getLoansByChildId(child_id: string): Promise<Loans[]> {
  try {
    // Fetch the child account's c_account_id
    const childAccount = await prisma.child_account.findUnique({
      where: {
        child_id: child_id,
      },
      select: {
        id: true,
      },
    });

    if (!childAccount) {
      console.warn(`No child account found for child_id: ${child_id}`);
      return [];
    }

    const c_account_id = childAccount.id;

    // Fetch loans where borrower_id matches c_account_id
    const loansToAccount = await prisma.loan.findMany({
      where: {
        borrower_id: c_account_id,
      },
    });

    // Fetch loans where lender_id matches c_account_id
    const loansFromAccount = await prisma.loan.findMany({
      where: {
        lender_id: c_account_id,
      },
    });

    // Combine both results
    const allLoansByChild = [...loansToAccount, ...loansFromAccount];

    return allLoansByChild;
  } catch (error) {
    // console.error(error);
    throw new Error('Unable to fetch loans');
  }
}

/**
 * Fetches the withholding balance details by parent account ID.
 * 
 * @param p_account_id - The ID of the parent account to fetch by.
 * @returns Whithhold balance of the parent account.
 */
export async function getWithholdingBalanceByParentAccount(p_account_id: string): Promise<number | null> {
  try {
    const parentWithholdings = await prisma.parent_account.findUnique({
      where: {
        id: p_account_id,
      },
      select: {
        withholding_balance: true,
      },
    });

    if (!parentWithholdings) {
      return (null);
    }

    return (parentWithholdings.withholding_balance);
  } catch (error) {
    // console.error(error);
    throw new Error('Unable to fetch withholding balance');
  }  
}

// POST Server Actions

/**
 * 
 * @param parent_id - The ID of the parent user
 * @param child_id - The ID of the child user
 * @param amount - Amount for the transfer
 * @param withholdings - Optional - Withholdings/Taxes Value - Expects 5, 10, or 15 then converts to percentage
 * @param description - Transaction Description
 * 
 * @returns N/A - Inserts new transaction into database and updates Parent/Child account balances
 */
export async function newParentToChildTransfer(parent_id: string, child_id: string, amount: number, withholdings?: number, description?: string) {
  try {
    // Pull parent and child user and account info
    const parent_user = await prisma.parent_user.findUnique({
      where: {
        id: parent_id,
      },
    });
    const parent_account = await prisma.parent_account.findUnique({
      where: {
        parent_id: parent_id,
      },
    });

    if (!parent_user || !parent_account) {
      throw new Error("No parent user found");
    }

    const child_user = await prisma.child_user.findUnique({
      where: {
        id: child_id,
      },
    });
    const child_account = await prisma.child_account.findUnique({
      where: {
        child_id: child_id,
      },
    });

    if (!child_user || !child_account) {
      throw new Error("No child user found");
    }

    // If withholdings are present
    if (withholdings) {
      // Calculate withholdings value
      const withholdings_amount = amount * (withholdings / 100);
      const finalAmount = amount - withholdings_amount;

      // Insert new transaction
      await prisma.transaction.create({
        data: {
          type: "Deposit / Taxes",
          from_account_id: parent_account.id,
          from_name: parent_user.name,
          to_account_id: child_account.id,
          to_name: child_user.name,
          to_external_id: null,
          amount: finalAmount,
          withholdings: withholdings_amount,
          description: description,
          p_account_id: parent_account.id
        },
      });

      // Update parent and child account balances
      await prisma.parent_account.update({
        where: {
          id: parent_account.id,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      await prisma.child_account.update({
        where: {
          id: child_account.id,
        },
        data: {
          checking_balance: {
            increment: finalAmount,
          },
        },
      });

      // Update parent account withholdings balance
      await updateWithholdingsBalance(parent_account.id, withholdings_amount);
    } else if (!withholdings) { // If no withholdings are present
      // Insert new transaction
      await prisma.transaction.create({
        data: {
          type: "Deposit",
          from_account_id: parent_account.id,
          from_name: parent_user.name,
          to_account_id: child_account.id,
          to_name: child_user.name,
          to_external_id: null,
          amount: amount,
          withholdings: 0,
          description: description,
          p_account_id: parent_account.id
        },
      });

      // Update parent and child accounts
      await prisma.parent_account.update({
        where: {
          id: parent_account.id,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      await prisma.child_account.update({
        where: {
          id: child_account.id,
        },
        data: {
          checking_balance: {
            increment: amount,
          },
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
    // throw new Error("Failed to complete parent to child transfer");
  }
}

/**
 * 
 * @param from_child_id - Child id of the sender
 * @param to_child_id - Child id of the receiver
 * @param amount - Amount for the transfer
 * @param description - Transaction Description
 * 
 * @returns N/A - Inserts new transaction into database and updates both Child accounts
 */
export async function newChildToChildTransfer(from_child_id: string, to_child_id: string, amount: number, description?: string) {
  try {
    // Pull user and account info for sending child and receiving child
    const from_child_user = await prisma.child_user.findUnique({
      where: {
        id: from_child_id,
      },
    });
    const from_child_account = await prisma.child_account.findUnique({
      where: {
        child_id: from_child_id,
      },
    });

    if (!from_child_user || !from_child_account) {
      throw new Error("No child user found");
    }

    const to_child_user = await prisma.child_user.findUnique({
      where: {
        id: to_child_id,
      },
    });
    const to_child_account = await prisma.child_account.findUnique({
      where: {
        child_id: to_child_id,
      },
    });

    if (!to_child_user || !to_child_account) {
      throw new Error("No child user found");
    }

    // Pull Parent account info
    const parent_account = await prisma.parent_account.findUnique({
      where: {
        parent_id: from_child_user.parent_id,
      },
    });

    if (!parent_account) {
      throw new Error("No parent account found");
    }

    // Insert new transaction
    await prisma.transaction.create({
      data: {
        type: "Transfer",
        from_account_id: from_child_account.id,
        from_name: from_child_user.name,
        to_account_id: to_child_account.id,
        to_name: to_child_user.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: description,
        p_account_id: parent_account.id
      },
    });

    // Update accounts of sending and receiving child
    await prisma.child_account.update({
      where: {
        id: from_child_account.id,
      },
      data: {
        checking_balance: {
          decrement: amount,
        },
      },
    });

    await prisma.child_account.update({
      where: {
        id: to_child_account.id,
      },
      data: {
        checking_balance: {
          increment: amount,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 
 * @param child_id - The ID of the child user
 * @param parent_id - The ID of the parent user
 * @param amount - Amount for the transfer
 * @param description - Transaction Description
 * 
 * @returns N/A - Inserts new transaction into database and updates Parent/Child account balances
 */
export async function newChildToParentTransfer(child_id: string, parent_id: string, amount: number, description?: string) {
  try {
    // Pull parent and child user and account info
    const parent_user = await prisma.parent_user.findUnique({
      where: {
        id: parent_id,
      },
    });
    const parent_account = await prisma.parent_account.findUnique({
      where: {
        parent_id: parent_id,
      },
    });

    if (!parent_user || !parent_account) {
      throw new Error("No parent user found");
    }

    const child_user = await prisma.child_user.findUnique({
      where: {
        id: child_id,
      },
    });
    const child_account = await prisma.child_account.findUnique({
      where: {
        child_id: child_id,
      },
    });

    if (!child_user || !child_account) {
      throw new Error("No child user found");
    }

    // Insert new transaction
    await prisma.transaction.create({
      data: {
        type: "Transfer",
        from_account_id: child_account.id,
        from_name: child_user.name,
        to_account_id: parent_account.id,
        to_name: parent_user.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: description,
        p_account_id: parent_account.id
      },
    });

    // Update parent and child accounts
    await prisma.child_account.update({
      where: {
        id: child_account.id,
      },
      data: {
        checking_balance: {
          decrement: amount,
        },
      },
    });

    await prisma.parent_account.update({
      where: {
        id: parent_account.id,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 
 * @param child_id - Id of child user
 * @param amount - Amount to transfer
 * 
 * @returns N/A - Inserts new transaction and updates child checking/savings balance
 */
export async function newCheckingToSavingsTransfer(child_id: string, amount: number) {
  try {
    // Retrieve child user and account info and parent user info
    const child_user = await prisma.child_user.findUnique({
      where: {
        id: child_id,
      },
    });
    const child_account = await prisma.child_account.findUnique({
      where: {
        child_id: child_id,
      },
    });

    if (!child_user || !child_account) {
      throw new Error("No child user found");
    }

    const parent_account = await prisma.parent_account.findUnique({
      where: {
        parent_id: child_user.parent_id,
      },
    });

    if (!parent_account) {
      throw new Error("No parent account found");
    }

    // Insert new transaction
    await prisma.transaction.create({
      data: {
        type: "Transfer",
        from_account_id: child_account.id,
        from_name: child_user.name,
        to_account_id: child_account.id,
        to_name: child_user.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: "Savings Transfer",
        p_account_id: parent_account.id
      },
    });

    // Decrease Child checking balance and increase savings balance
    await prisma.child_account.update({
      where: {
        child_id: child_id,
      },
      data: {
        checking_balance: {
          decrement: amount,
        },
        savings_balance: {
          increment: amount,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 
 * @param child_id - Id of child user
 * @param amount - Amount to transfer
 * 
 * @returns N/A - Inserts new transaction and updates child checking/savings balance
 */
export async function newSavingsToCheckingTransfer(child_id: string, amount: number) {
  try {
    // Retrieve child user and account info and parent user info
    const child_user = await prisma.child_user.findUnique({
      where: {
        id: child_id,
      },
    });
    const child_account = await prisma.child_account.findUnique({
      where: {
        child_id: child_id,
      },
    });

    if (!child_user || !child_account) {
      throw new Error("No child user found");
    }

    const parent_account = await prisma.parent_account.findUnique({
      where: {
        parent_id: child_user.parent_id,
      },
    });

    if (!parent_account) {
      throw new Error("No parent account found");
    }

    // Insert new transaction
    await prisma.transaction.create({
      data: {
        type: "Transfer",
        from_account_id: child_account.id,
        from_name: child_user.name,
        to_account_id: child_account.id,
        to_name: child_user.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: "Savings Transfer",
        p_account_id: parent_account.id
      },
    });

    // Decrease Child savings balance and increase checking balance
    await prisma.child_account.update({
      where: {
        child_id: child_id,
      },
      data: {
        savings_balance: {
          decrement: amount,
        },
        checking_balance: {
          increment: amount,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 
 * @param parent_id - ID of parent
 * @param amount - Amount to transfer
 * 
 * @returns N/A - Inserts new transaction and updates child checking/savings balance
 */
export async function transferWithholdings(parent_id: string, amount: number) {
  try {
    // Retrieve parent user and account info
    const parent_user = await prisma.parent_user.findUnique({
      where: {
        id: parent_id,
      },
    });
    const parent_account = await prisma.parent_account.findUnique({
      where: {
        parent_id: parent_id,
      },
    });

    if (!parent_user || !parent_account) {
      throw new Error("No parent user found");
    }

    // Insert new transaction
    await prisma.transaction.create({
      data: {
        type: "Transfer",
        from_account_id: parent_account.id,
        from_name: parent_user.name,
        to_account_id: parent_account.id,
        to_name: parent_user.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: "Withholdings Transfer",
        p_account_id: parent_account.id
      },
    });

    // Update parent account, decrease withholdings balance, increase balance
    await prisma.parent_account.update({
      where: {
        parent_id: parent_id,
      },
      data: {
        withholding_balance: {
          decrement: amount,
        },
        balance: {
          increment: amount,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 
 * @param parent_account_id - Parent Account ID
 * @param withholding_amount - Withholding amount
 * 
 * @returns N/A - Updates parent account withholding balance
 */
export async function updateWithholdingsBalance(parent_account_id: string, withholding_amount: number) {
  try {
    // Update withholdings balance
    await prisma.parent_account.update({
      where: {
        id: parent_account_id,
      },
      data: {
        withholding_balance: {
          increment: withholding_amount,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update withholdings balance");
  }
}

/**
 * 
 * @param lender_id - Lender ID - Parent User
 * @param borrower_id - Borrower ID - Child User
 * @param loan - Loan Information:
 *        {
 *          interest_rate: number; (Whole Number Percentage Value)
 *          days_due: number; (Number of Days Until Due Date)
 *          loan_amount: number; (Initial Principal)
 *          description: string;
 *        }
 * 
 * @returns N/A - Inserts new transaction and loan, updates parent and child account balances
 */
export async function newParentToChildLoan(lender_id: string, borrower_id: string, loan: LoanDataPayload) {
  try {
    // Retrieve parent data as lender and child data as borrower
    const lender = await prisma.parent_user.findUnique({
      where: {
        id: lender_id,
      },
    });
    const lender_account = await prisma.parent_account.findUnique({
      where: {
        parent_id: lender_id,
      },
    });

    if (!lender || !lender_account) {
      throw new Error("No parent user found");
    }

    const borrower = await prisma.child_user.findUnique({
      where: {
        id: borrower_id,
      },
    });
    const borrower_account = await prisma.child_account.findUnique({
      where: {
        child_id: borrower_id,
      },
    });

    if (!borrower || !borrower_account) {
      throw new Error("No child user found");
    }

    // Insert new transaction
    await prisma.transaction.create({
      data: {
        type: "Loan",
        from_account_id: lender_account.id,
        from_name: lender.name,
        to_account_id: borrower_account.id,
        to_name: borrower.name,
        to_external_id: null,
        amount: loan.loan_amount,
        withholdings: 0,
        description: loan.description,
        p_account_id: lender_account.id
      },
    });

    // Update parent and child account balances
    await prisma.parent_account.update({
      where: {
        id: lender_account.id,
      },
      data: {
        balance: {
          decrement: loan.loan_amount,
        },
      },
    });

    await prisma.child_account.update({
      where: {
        id: borrower_account.id,
      },
      data: {
        checking_balance: {
          increment: loan.loan_amount,
        },
      },
    });

    // Determine due date from days_due
    const due_date = new Date();
    due_date.setDate(due_date.getDate() + loan.days_due);

    // Insert new loan
    await prisma.loan.create({
      data: {
        lender_id: lender_account.id,
        borrower_id: borrower_account.id,
        interest_rate: loan.interest_rate,
        loan_amount: loan.loan_amount,
        current_balance: loan.loan_amount + (loan.loan_amount * (loan.interest_rate / 100)),
        due_date: due_date,
        p_account_id: lender_account.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 
 * @param lender_id - Lender ID - Child User
 * @param borrower_id - Borrower ID - Child User
 * @param loan - Loan Information:
 *        {
 *          interest_rate: number; (Whole Number Percentage Value)
 *          days_due: number; (Number of Days Until Due Date)
 *          loan_amount: number; (Initial Principal)
 *          description: string;
 *        }
 * 
 * @returns N/A - Inserts new transaction and loan, updates children account balances
 */
export async function newChildToChildLoan(lender_id: string, borrower_id: string, loan: LoanDataPayload) {
  try {
    // Retrieve children user and account info as lender and borrower
    const lender = await prisma.child_user.findUnique({
      where: {
        id: lender_id,
      },
    });
    const lender_account = await prisma.child_account.findUnique({
      where: {
        child_id: lender_id,
      },
    });

    if (!lender || !lender_account) {
      throw new Error("Child lender not found");
    }

    const borrower = await prisma.child_user.findUnique({
      where: {
        id: borrower_id,
      },
    });
    const borrower_account = await prisma.child_account.findUnique({
      where: {
        child_id: borrower_id,
      },
    });

    if (!borrower || !borrower_account) {
      throw new Error("Child borrower not found");
    }

    // Insert new transaction
    await prisma.transaction.create({
      data: {
        type: "Loan",
        from_account_id: lender_account.id,
        from_name: lender.name,
        to_account_id: borrower_account.id,
        to_name: borrower.name,
        to_external_id: null,
        amount: loan.loan_amount,
        withholdings: 0,
        description: loan.description,
        p_account_id: lender_account.parent_id
      },
    });

    // Update account balances of lender and borrower
    await prisma.child_account.update({
      where: {
        id: lender_account.id,
      },
      data: {
        checking_balance: {
          decrement: loan.loan_amount,
        },
      },
    });

    await prisma.child_account.update({
      where: {
        id: borrower_account.id,
      },
      data: {
        checking_balance: {
          increment: loan.loan_amount,
        },
      },
    });

    // Determine due date from days_due
    const due_date = new Date();
    due_date.setDate(due_date.getDate() + loan.days_due);

    // Insert new loan
    await prisma.loan.create({
      data: {
        lender_id: lender_account.id,
        borrower_id: borrower_account.id,
        interest_rate: loan.interest_rate,
        current_balance: loan.loan_amount + (loan.loan_amount * (loan.interest_rate / 100)),
        loan_amount: loan.loan_amount,
        due_date: due_date,
        p_account_id: lender_account.parent_id,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 
 * @param lender_id - Lender ID - Parent User
 * @param borrower_id - Borrower ID - Child User
 * @param amount - Amount to pay
 * @param description - Description
 * 
 * @returns N/A - Creates new transaction, updates parent and child account balances, updates loan record
 */
export async function newChildToParentLoanPayment(lender_id: string, borrower_id: string, amount: number, description?: string) {
  try {
    // Retrieve parent and child info as lender and borrower
    const lender = await prisma.parent_user.findUnique({
      where: {
        id: lender_id,
      },
    });
    const lender_account = await prisma.parent_account.findUnique({
      where: {
        parent_id: lender_id,
      },
    });

    if (!lender || !lender_account) {
      throw new Error("Parent lender not found");
    }

    const borrower = await prisma.child_user.findUnique({
      where: {
        id: borrower_id,
      },
    });
    const borrower_account = await prisma.child_account.findUnique({
      where: {
        child_id: borrower_id,
      },
    });

    if (!borrower || !borrower_account) {
      throw new Error("Child borrower not found");
    }

    // Insert new transaction
    await prisma.transaction.create({
      data: {
        type: "Loan",
        from_account_id: borrower_account.id,
        from_name: borrower.name,
        to_account_id: lender_account.id,
        to_name: lender.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: description,
        p_account_id: lender_account.id
      },
    });

    // Update parent and child account balances
    await prisma.child_account.update({
      where: {
        id: borrower_account.id,
      },
      data: {
        checking_balance: {
          decrement: amount,
        },
      },
    });

    await prisma.parent_account.update({
      where: {
        id: lender_account.id,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    // Find loan record
    const loan = await prisma.loan.findFirst({
      where: {
        borrower_id: borrower_account.id,
      },
    });

    if (!loan) {
      throw new Error("Loan not found for borrower");
    }

    // Update loan record
    const updatedLoan = await prisma.loan.update({
      where: {
        id: loan.id,
      },
      data: {
        current_balance: {
          decrement: amount,
        },
      },
    });

    // Delete loan record if current_balance is 0
    if (updatedLoan.current_balance === 0) {
      await prisma.loan.delete({
        where: {
          id: loan.id,
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 
 * @param lender_id - Lender ID - Child User
 * @param borrower_id - Borrower ID - Child User
 * @param amount - Amount to pay
 * @param description - Description
 * 
 * @returns N/A - Creates new transaction, updates parent and child account balances, updates loan record
 */
export async function newChildToChildLoanPayment(lender_id: string, borrower_id: string, amount: number, description?: string) {
  try {
    // Retrieve children info as lender and borrower
    const lender = await prisma.child_user.findUnique({
      where: {
        id: lender_id,
      },
    });
    const lender_account = await prisma.child_account.findUnique({
      where: {
        child_id: lender_id,
      },
    });

    if (!lender || !lender_account) {
      throw new Error("Child lender not found");
    }

    const borrower = await prisma.child_user.findUnique({
      where: {
        id: borrower_id,
      },
    });
    const borrower_account = await prisma.child_account.findUnique({
      where: {
        child_id: borrower_id,
      },
    });

    if (!borrower || !borrower_account) {
      throw new Error("Child borrower not found");
    }

    // Insert new transaction
    await prisma.transaction.create({
      data: {
        type: "Loan",
        from_account_id: borrower_account.id,
        from_name: borrower.name,
        to_account_id: lender_account.id,
        to_name: lender.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: description,
        p_account_id: lender_account.parent_id
      },
    });

    // Update lender and borrwer child accounts
    await prisma.child_account.update({
      where: {
        id: borrower_account.id,
      },
      data: {
        checking_balance: {
          decrement: amount,
        },
      },
    });

    await prisma.child_account.update({
      where: {
        id: lender_account.id,
      },
      data: {
        checking_balance: {
          increment: amount,
        },
      },
    });

    // Find loan record
    const loan = await prisma.loan.findFirst({
      where: {
        borrower_id: borrower_account.id,
      },
    });

    if (!loan) {
      throw new Error("Loan not found for borrower");
    }

    // Update loan balance
    const updatedLoan = await prisma.loan.update({
      where: {
        id: loan.id,
      },
      data: {
        current_balance: {
          decrement: amount,
        },
      },
    });

    // Delete loan record if current_balance is 0
    if (updatedLoan.current_balance === 0) {
      await prisma.loan.delete({
        where: {
          id: loan.id,
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 
 * @param parent_id - Parent ID of User/Account to Delete
 * 
 * @returns N/A - Deletes Parent User, Cascade set to delete all accounts, children, child accounts, transactions, loans, etc.
 */
export async function deleteAccount(parent_id: string) {
  try {
    await prisma.parent_user.delete({
      where: {
        id: parent_id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete account");
  }
}

// Google and Credential Sign Up Actions

/**
 * 
 * @param {
 *    email: string;
 *    password: string;
 *    name: string; (Full Name)
 *    startingBalance: number;
 *    children: {
 *        name: string; (Full Name)
 *        username: string;
 *        password: string;
 *        startingBalance: number;
 *    }[]
 * }
 * 
 * @returns N/A - Creates new parent user with associated parent account and child users/child accounts
 */
export async function handleSignupWithCredentials({email, password, name, startingBalance, children}: SignUpPayload) {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password!, 10);

    // Create new parent user, parent account, and lessons record
    const parentUser = await prisma.parent_user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    await prisma.parent_account.create({
      data: {
        parent_id: parentUser.id,
        balance: dollarsToCents(parseInt(startingBalance)),
        withholding_balance: 0,
      },
    });

    await prisma.lessons_completed.create({
      data: {
        parent_id: parentUser.id,
        financial_literacy: false,
        savings: false,
        taxes: false,
        loans: false,
        obligations: false,
      },
    });

    // Create child users and associated accounts
    for (const child of children) {
      const hashedChildPassword = await bcrypt.hash(child.password, 10);

      const childUser = await prisma.child_user.create({
        data: {
          parent_id: parentUser.id,
          username: child.username,
          name: child.childFirstName + " " + child.childLastName,
          password: hashedChildPassword,
        },
      });

      await prisma.child_account.create({
        data: {
          child_id: childUser.id,
          parent_id: parentUser.id,
          checking_balance: dollarsToCents(parseInt(child.startingBalance)),
          savings_balance: 0,
          savings_goal: 0,
        },
      });
    }
  } catch (error) {
    console.error("Failed to Sign Up With Credentials", error);
  }
}

/**
 * 
 * @param {
 *    parent_id: string;
 *    startingBalance: number;
 *    children: {
 *        name: string; (Full Name)
 *        username: string;
 *        password: string;
 *        startingBalance: number;
 *    }[]
 * }
 * 
 * @returns N/A - Pulls new user from automatic Prisma/Google Provider process, creates new associated account, children, and child accounts
 */
export async function handleSignupWithGoogle({parent_id, startingBalance, children}: GoogleSignUpPayload) {
  try {
    // Retrieve user created by Google OAuth/Prisma Adapter
    const parentUser = await prisma.parent_user.findUnique({
      where: {
        id: parent_id,
      },
    });

    if (!parentUser) {
      throw new Error("Parent user not found");
    }

    // Create parent account and lessons completed records
    await prisma.parent_account.create({
      data: {
        parent_id: parentUser.id,
        balance: dollarsToCents(parseInt(startingBalance)),
        withholding_balance: 0,
      },
    });

    await prisma.lessons_completed.create({
      data: {
        parent_id: parentUser.id,
        financial_literacy: false,
        savings: false,
        taxes: false,
        loans: false,
        obligations: false,
      },
    });

    // Create child users and associated accounts
    for (const child of children) {
      const hashedChildPassword = await bcrypt.hash(child.password, 10);

      const childUser = await prisma.child_user.create({
        data: {
          parent_id: parentUser.id,
          username: child.username,
          name: child.childFirstName + " " + child.childLastName,
          password: hashedChildPassword,
        },
      });

      await prisma.child_account.create({
        data: {
          child_id: childUser.id,
          parent_id: parentUser.id,
          checking_balance: dollarsToCents(parseInt(child.startingBalance)),
          savings_balance: 0,
          savings_goal: 0,
        },
      });
    }
  } catch (error) {
    console.error("Failed to Sign Up With Google", error);
  }
}
