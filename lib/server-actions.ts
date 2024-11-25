import { db } from "./db";
import { Child, Child_Account, Parent_Account, Transactions } from "./definitions";

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
