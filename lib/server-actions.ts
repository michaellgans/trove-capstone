'use server'
import { db } from "./db";
import { Child, Child_Account, LoanDataPayload, Parent, Parent_Account, SignUpPayload, Transactions } from "@/types/types";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";


// GET Server Actions
export async function getParentById(parent_id: string): Promise<Parent[]> {
  try {
    const parent = await db
      .selectFrom("parents")
      .selectAll()
      .where("parent_id", "=", parent_id)
      .execute();

    return parent;
  } catch (error) {
    console.error(`Error fetching parent by parent_id: ${parent_id}`);
    console.error(error);
    throw new Error("Unable to fetch parent");
  }
}

export async function getChildrenByParent(parent_id: string): Promise<Child[]> {
  try {
    const children = await db
      .selectFrom("children")
      .selectAll()
      .where("parent_id", "=", parent_id)
      .execute();

    return children;
  } catch (error) {
    console.error(`Error fetching children for parent_id: ${parent_id}`);
    console.error(error);
    throw new Error("Unable to fetch children");
  }
}

export async function getParentAccountByParentId(parent_id: string): Promise<Parent_Account[]> {
  try {
    const parentAccount = await db
      .selectFrom('parent_accounts')
      .selectAll()
      .where('parent_id', '=', parent_id)
      .execute();

    return parentAccount;
  } catch (error) {
    console.error(`Error fetching parent account for parent_id: ${parent_id}`);
    console.error(error);
    throw new Error('Unable to fetch parent account');
  }
}

export async function getChildAccountByChildId(child_id: string): Promise<Child_Account[]> {
  try {
    const childAccount = await db
      .selectFrom('child_accounts')
      .selectAll()
      .where('child_id', '=', child_id)
      .execute();

    return childAccount;
  } catch (error) {
    console.error(`Error fetching child account for child_id: ${child_id}`);
    console.error(error);
    throw new Error('Unable to fetch child account');
  }
}

export async function getChildAccountByParentAccountId(p_account_id: string): Promise<Child_Account[]> {
  try {
    const childAccountByParentAccount = await db
      .selectFrom('child_accounts')
      .selectAll()
      .where('p_account_id', '=', p_account_id)
      .execute();

    return childAccountByParentAccount;
  } catch (error) {
    console.error(`Error fetching child accounts for p_account_id: ${p_account_id}`);
    console.error(error);
    throw new Error('Unable to fetch child accounts');
  }
}

export async function getAllTransactionsByParentAccountId(p_account_id: string): Promise<Transactions[]> {
  try {
    const transactionsByParentAccount = await db
      .selectFrom('transactions')
      .selectAll()
      .where('p_account_id', '=', p_account_id)
      .execute();

    return transactionsByParentAccount;
  } catch (error) {
    console.error(`Error fetching transactions for p_account_id: ${p_account_id}`);
    console.error(error);
    throw new Error('Unable to fetch account transactions');
  }
}

export async function getTransactionsByChildId(child_id: string): Promise<any[]> {
  try {
    // Fetch the child account's c_account_id
    const childAccount = await db
      .selectFrom('child_accounts')
      .select(['c_account_id'])
      .where('child_id', '=', child_id)
      .execute();

    if (!childAccount.length) {
      console.warn(`No child account found for child_id: ${child_id}`);
      return [];
    }

    const c_account_id = childAccount[0].c_account_id;

    // Fetch transactions where to_account_id matches c_account_id
    const transactionsToAccount = await db
      .selectFrom('transactions')
      .selectAll()
      .where('to_account_id', '=', c_account_id)
      .execute();

    // Fetch transactions where from_account_id matches c_account_id
    const transactionsFromAccount = await db
      .selectFrom('transactions')
      .selectAll()
      .where('from_account_id', '=', c_account_id)
      .execute();

    // Combine both results
    const allTransactionsByChild = [...transactionsToAccount, ...transactionsFromAccount];

    return allTransactionsByChild;
  } catch (error) {
    console.error(`Error fetching transactions for child_id: ${child_id}`);
    console.error(error);
    throw new Error('Unable to fetch transactions');
  }
}

export async function getLoansByChildId(child_id: string): Promise<any[]> {
  try {
    // Fetch the child account's c_account_id
    const childAccount = await db
      .selectFrom('child_accounts')
      .select(['c_account_id'])
      .where('child_id', '=', child_id)
      .execute();

    if (!childAccount.length) {
      console.warn(`No child account found for child_id: ${child_id}`);
      return [];
    }

    const c_account_id = childAccount[0].c_account_id;

    // Fetch loans where borrower_id matches c_account_id
    const loansToAccount = await db
      .selectFrom('loans')
      .selectAll()
      .where('borrower_id', '=', c_account_id)
      .execute();

    // Fetch loans where lender_id matches c_account_id
    const loansFromAccount = await db
      .selectFrom('loans')
      .selectAll()
      .where('lender_id', '=', c_account_id)
      .execute();

    // Combine both results
    const allloansByChild = [...loansToAccount, ...loansFromAccount];

    return allloansByChild;
  } catch (error) {
    console.error(`Error fetching loans for child_id: ${child_id}`);
    console.error(error);
    throw new Error('Unable to fetch loans');
  }
}

export async function getWithholdingBalanceByParentAccount(parent_id: string): Promise<number | null> {
  try {
    const parentWithholdings = await db
      .selectFrom('parent_accounts')
      .select(['parent_accounts.withholding_balance'])
      .where('parent_accounts.parent_id', '=', parent_id)
      .execute();

    return parentWithholdings.length > 0 ? parentWithholdings[0].withholding_balance : null;
  } catch (error) {
    console.error(`Error fetching withholding balance for parent_id: ${parent_id}`);
    console.error(error);
    throw new Error('Unable to fetch withholding balance');
  }  
}

// POST Server Actions
export async function newParentToChildTransfer(parent_id: string, child_id: string, amount: number, withholdings?: number, description?: string) {
  try {
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

    if (withholdings) {
      const withholdings_amount = amount * (withholdings / 100);
      const finalAmount = amount - withholdings_amount;

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

      await updateWithholdingsBalance(parent_account.id, withholdings_amount);
    } else if (!withholdings) {
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
    throw new Error("Failed to complete parent to child transfer");
  }
}

export async function newChildToChildTransfer(from_child_id: string, to_child_id: string, amount: number, description?: string) {
  try {
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

    const parent_account = await prisma.parent_account.findUnique({
      where: {
        parent_id: from_child_user.parent_id,
      },
    });

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
    throw new Error("Failed to complete child to child transfer");
  }
}

export async function newCheckingToSavingsTransfer(child_id: string, amount: number) {
  try {
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

    const parent_account = await prisma.parent_account.findUnique({
      where: {
        parent_id: child_user.parent_id,
      },
    });

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
    throw new Error("Failed to complete checking to savings transfer")
  }
}

export async function transferWithholdings(parent_id: string, amount: number) {
  try {
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
        description: "Savings Transfer",
        p_account_id: parent_account.id
      },
    });

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
    throw new Error("Failed to complete withholdings transfer")
  }
}

export async function updateWithholdingsBalance(parent_account_id: string, withholding_amount: number) {
  try {
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

export async function newParentToChildLoan(lender_id: string, borrower_id: string, loan: LoanDataPayload) {
  try {
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

    const today = new Date();
    const due_date = today.setDate(today.getDate() + loan.days_due);

    await prisma.loan.create({
      data: {
        lender_id: lender.id,
        borrower_id: borrower.id,
        interest_rate: loan.interest_rate,
        current_balance: loan.loan_amount + (loan.loan_amount * (loan.interest_rate / 100)),
        due_date: due_date,
        p_account_id: lender_account.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create parent to child loan");
  }
}

export async function newChildToChildLoan(lender_id: string, borrower_id: string, loan: LoanDataPayload) {
  try {
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

    const today = new Date();
    const due_date = today.setDate(today.getDate() + loan.days_due);

    await prisma.loan.create({
      data: {
        lender_id: lender.id,
        borrower_id: borrower.id,
        interest_rate: loan.interest_rate,
        current_balance: loan.loan_amount + (loan.loan_amount * (loan.interest_rate / 100)),
        due_date: due_date,
        p_account_id: lender_account.parent_id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create child to child loan");
  }
}

export async function newChildToParentLoanPayment(lender_id: string, borrower_id: string, amount: number, description?: string) {
  try {
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

    await prisma.loan.update({
      where: {
        borrower_id: borrower.id,
      },
      data: {
        current_balance: {
          decrement: amount,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to complete child to parent loan payment");
  }
}

export async function newChildToChildLoanPayment(lender_id: string, borrower_id: string, amount: number, description?: string) {
  try {
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

    await prisma.loan.update({
      where: {
        borrower_id: borrower.id,
      },
      data: {
        current_balance: {
          decrement: amount,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to complete child to child loan payment");
  }
}

export async function deleteAccount(parent_id: string) {
  try {
    prisma.parent_user.delete({
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
export async function handleSignupWithCredentials({email, password, name, startingBalance, children}: SignUpPayload) {
  try {
    const hashedPassword = await bcrypt.hash(password!, 10);

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
        balance: startingBalance
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

    for (const child of children) {
      const hashedChildPassword = await bcrypt.hash(child.password, 10);

      const childUser = await prisma.child_user.create({
        data: {
          parent_id: parentUser.id,
          username: child.username,
          name: child.name,
          password: hashedChildPassword,
        },
      });

      await prisma.child_account.create({
        data: {
          child_id: childUser.id,
          parent_id: parentUser.id,
          checking_balance: child.startingBalance,
          savings_balance: 0,
          savings_goal: 0,
        },
      });
    }
  } catch (error) {
    console.error("Failed to Sign Up With Credentials", error);
  }
}

export async function handleSignupWithGoogle({email, name, startingBalance, children}: SignUpPayload) {
  try {
    const parentUser = await prisma.parent_user.create({
      data: {
        email,
        password: "",
        name,
      },
    });

    await prisma.parent_account.create({
      data: {
        parent_id: parentUser.id,
        balance: startingBalance
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

    for (const child of children) {
      const hashedChildPassword = await bcrypt.hash(child.password, 10);

      const childUser = await prisma.child_user.create({
        data: {
          parent_id: parentUser.id,
          username: child.username,
          name: child.name,
          password: hashedChildPassword,
        },
      });

      await prisma.child_account.create({
        data: {
          child_id: childUser.id,
          parent_id: parentUser.id,
          checking_balance: child.startingBalance,
          savings_balance: 0,
          savings_goal: 0,
        },
      });
    }
  } catch (error) {
    console.error("Failed to Sign Up With Google", error);
  }
}
