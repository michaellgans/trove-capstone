import { db } from "@vercel/postgres";
import { parents } from "@/seed/parents";
import { children } from "@/seed/children";
import { p_account } from "@/seed/p_accounts";
import { c_account } from "@/seed/c_accounts";
import { loans } from "@/seed/loans";
import { transactions } from "@/seed/transactions";
import { lessons } from "@/seed/lessons_completed";
import { settings } from "@/seed/settings";

const client = await db.connect();

export function begin() {
  client.sql`BEGIN`;
}

export function commit() {
  client.sql`COMMIT`;
}

export function rollback() {
  client.sql`ROLLBACK`;
}

// Insert Parents
export async function seedParentTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS parents (
      parent_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      avatar_img VARCHAR(255)
    );
  `;

  const insertedParents = await Promise.all(
    parents.map((parent) => {
      try {
        return client.sql`
          INSERT INTO parents (parent_id, name, email, password, avatar_img)
          VALUES (
            ${parent.parent_id},
            ${parent.name},
            ${parent.email},
            ${parent.password},
            ${parent.avatar_img}
          )
          ON CONFLICT (parent_id) DO NOTHING;
        `;
      } catch (error) {
        console.error("Error inserting parent:", parent.parent_id);
        console.error(error);
      }
    })
  );

  return (insertedParents);
}

// Insert Children
export async function seedChildTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS children (
      child_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      parent_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      avatar_img VARCHAR(255),
      FOREIGN KEY (parent_id) REFERENCES parents(parent_id) ON DELETE CASCADE
    );
  `;

  const insertedChildren = await Promise.all(
    children.map((child) => {
      try {
        return client.sql`
          INSERT INTO children (
            child_id, parent_id, name, username, password, avatar_img
          ) VALUES (
            ${child.child_id}, 
            ${child.parent_id}, 
            ${child.name}, 
            ${child.username}, 
            ${child.password}, 
            ${child.avatar_img}
          ) ON CONFLICT (child_id) DO NOTHING;
        `;
      } catch (error) {
        console.error("Error inserting child:", child.child_id);
        console.error(error);
      }
    })
  );

  return (insertedChildren);
}

// Insert Parent_Account
export async function seedParentAccountTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS parent_accounts (
      p_account_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      stripe_acct_id UUID NOT NULL,
      balance NUMERIC NOT NULL,
      parent_id UUID NOT NULL,
      FOREIGN KEY (parent_id) REFERENCES parents(parent_id) ON DELETE CASCADE
    );
  `;

  const insertedParentAccounts = await Promise.all(
    p_account.map((account) => {
      try {
        return client.sql`
          INSERT INTO parent_accounts (
            p_account_id, stripe_acct_id, balance, parent_id
          ) VALUES (
            ${account.p_account_id}, 
            ${account.stripe_acct_id}, 
            ${account.balance}, 
            ${account.parent_id}
          ) ON CONFLICT (p_account_id) DO NOTHING;
        `;
      } catch (error) {
        console.error("Error inserting parent account:", account.p_account_id);
        console.error("Detailed error:", error);
      }
    })
  );

  return (insertedParentAccounts);
}

// Insert Child_Account
export async function seedChildAccountTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS child_accounts (
      c_account_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      checking_balance NUMERIC NOT NULL,
      savings_balance NUMERIC,
      savings_goal NUMERIC,
      child_id UUID NOT NULL,
      p_account_id UUID NOT NULL,
      FOREIGN KEY (child_id) REFERENCES children(child_id) ON DELETE CASCADE,
      FOREIGN KEY (p_account_id) REFERENCES parent_accounts(p_account_id) ON DELETE CASCADE
    );
  `;

  const insertedChildAccounts = await Promise.all(
    c_account.map((account) => {
      try {
        return client.sql`
          INSERT INTO child_accounts (
            c_account_id, checking_balance, savings_balance, savings_goal, child_id, p_account_id
          ) VALUES (
            ${account.c_account_id}, 
            ${account.checking_balance}, 
            ${account.savings_balance ?? null}, 
            ${account.savings_goal ?? null}, 
            ${account.child_id}, 
            ${account.p_account_id}
          ) ON CONFLICT (c_account_id) DO NOTHING;
        `;
      } catch (error) {
        console.error("Error inserting child account:", account.c_account_id);
        console.error(error);
      }
    })
  );

  return (insertedChildAccounts);
}

// Insert Loans
export async function seedLoanTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS loans (
      loan_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      loan_amount NUMERIC NOT NULL,
      interest_rate NUMERIC NOT NULL,
      due_date TIMESTAMP NOT NULL,
      current_amount NUMERIC NOT NULL,
      lender_id UUID NOT NULL,
      borrower_id UUID NOT NULL,
      FOREIGN KEY (borrower_id) REFERENCES child_accounts(c_account_id) ON DELETE CASCADE
    );
  `;

  const insertedLoans = await Promise.all(
    loans.map((loan) => {
      try {
        return client.sql`
          INSERT INTO loans (
            loan_id, loan_amount, interest_rate, due_date, current_amount, lender_id, borrower_id
          ) VALUES (
            ${loan.loan_id}, 
            ${loan.loan_amount}, 
            ${loan.interest_rate}, 
            ${loan.due_date.toISOString()}, 
            ${loan.current_amount}, 
            ${loan.lender_id}, 
            ${loan.borrower_id}
          ) ON CONFLICT (loan_id) DO NOTHING;
        `;
      } catch (error) {
        console.error("Error inserting loan:", loan.loan_id);
        console.error(error);
      }
    })
  );

  return (insertedLoans);
}

// Insert Transactions
export async function seedTransactionsTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      timestamp TIMESTAMP NOT NULL,
      type VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      to_external_id VARCHAR(255),
      amount NUMERIC NOT NULL,
      withholdings TEXT,
      to_name VARCHAR(255) NOT NULL,
      from_name VARCHAR(255) NOT NULL,
      to_account_id UUID,
      from_account_id UUID NOT NULL,
      p_account_id UUID NOT NULL,
      FOREIGN KEY (p_account_id) REFERENCES parent_accounts(p_account_id) ON DELETE CASCADE
    );
  `;

  const insertedTransactions = await Promise.all(
    transactions.map((transaction) => {
      try {
        return client.sql`
          INSERT INTO transactions (
            transaction_id, timestamp, type, description, to_external_id, amount, withholdings, 
            to_name, from_name, to_account_id, from_account_id, p_account_id
          ) VALUES (
            ${transaction.transaction_id}, 
            ${transaction.timestamp}, 
            ${transaction.type}, 
            ${transaction.description}, 
            ${transaction.to_external_id || null}, 
            ${transaction.amount}, 
            ${transaction.withholdings || null}, 
            ${transaction.to_name}, 
            ${transaction.from_name}, 
            ${transaction.to_account_id ? transaction.to_account_id : null}, 
            ${transaction.from_account_id}, 
            ${transaction.p_account_id}
          ) ON CONFLICT (transaction_id) DO NOTHING;
        `;
      } catch (error) {
        console.error("Error inserting transaction:", transaction.transaction_id);
        console.error(error);
      }
    })
  );

  return insertedTransactions;
}

// Misc Tables

// Inserts Lessons
export async function seedLessonsCompletedTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS lessons_completed (
      savings BOOLEAN NOT NULL DEFAULT false,
      taxes BOOLEAN NOT NULL DEFAULT false,
      obligations BOOLEAN NOT NULL DEFAULT false,
      financial_literacy BOOLEAN NOT NULL DEFAULT false,
      loans BOOLEAN NOT NULL DEFAULT false,
      parent_id UUID NOT NULL,
      CONSTRAINT fk_parent_id FOREIGN KEY (parent_id) REFERENCES parents(parent_id) ON DELETE CASCADE,
      CONSTRAINT unique_parent_id UNIQUE (parent_id) -- Make parent_id unique
    );
  `;

  const insertedLessons = await Promise.all(
    lessons.map((lesson) => {
      try {
        return client.sql`
          INSERT INTO lessons_completed (
            savings, taxes, obligations, financial_literacy, loans, parent_id
          ) VALUES (
            ${lesson.savings}, 
            ${lesson.taxes}, 
            ${lesson.obligations}, 
            ${lesson.financial_literacy}, 
            ${lesson.loans}, 
            ${lesson.parent_id}
          ) ON CONFLICT (parent_id) DO NOTHING;
        `;
      } catch (error) {
        console.error("Error inserting lesson:", lesson.parent_id);
        console.error(error);
      }
    })
  );

  return (insertedLessons);
}

// Insert Settings
export async function seedSettingsTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS settings (
      setting_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      parent_id UUID NOT NULL,
      FOREIGN KEY (parent_id) REFERENCES parents(parent_id) ON DELETE CASCADE
    );
  `;

  const insertedSettings = await Promise.all(
    settings.map((setting) => {
      try {
        return client.sql`
          INSERT INTO settings (
            setting_id, parent_id
          ) VALUES (
            ${setting.setting_id}, 
            ${setting.parent_id}
          ) ON CONFLICT (setting_id) DO NOTHING;
        `;
      } catch (error) {
        console.error("Error inserting setting:", setting.setting_id);
        console.error(error);
      }
    })
  );

  return (insertedSettings);
}