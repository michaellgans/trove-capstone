import { db } from "@vercel/postgres";
import { parents } from "@/seed/parents";
import { children } from "@/seed/children";
import { transactions } from "@/seed/transactions";

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
      avatar_img VARCHAR(255),
      strip_account_id TEXT[],
      balance NUMERIC[]
    );
  `;

  const insertedParents = await Promise.all(
    parents.map((parent) => {
      try {
        return client.sql`
          INSERT INTO parents (parent_id, name, email, password, avatar_img, strip_account_id, balance)
          VALUES (
            ${parent.parent_id}, 
            ${parent.name}, 
            ${parent.email}, 
            ${parent.password}, 
            ${parent.avatar_img}, 
            ${parent.strip_account_id.length > 0 ? `{${parent.strip_account_id.join(",")}}` : null},
            ${parent.balance.length > 0 ? `{${parent.balance.join(",")}}` : null}
          ) 
          ON CONFLICT (parent_id) DO NOTHING;
        `;
      } catch (error) {
        console.log("Error inserting parent:", parent.parent_id);
        console.log(error);
      }
    })
  );

  return insertedParents;
}

// Insert Children
export async function seedChildTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS children (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      parent_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      avatar_img VARCHAR(255),
      checking_balance NUMERIC[],
      savings_balance NUMERIC[],
      pin INT NOT NULL,
      savings_goal NUMERIC NOT NULL,
      loan_total NUMERIC NOT NULL,
      current_loan_total NUMERIC NOT NULL,
      FOREIGN KEY (parent_id) REFERENCES parents(parent_id) ON DELETE CASCADE
    );
  `;

  const insertedChildren = await Promise.all(
    children.map((child) => {
      try {
        return client.sql`
          INSERT INTO children (
            id, parent_id, name, username, avatar_img, checking_balance, savings_balance, pin, savings_goal, loan_total, current_loan_total
          ) VALUES (
            ${child.id}, 
            ${child.parent_id}, 
            ${child.name}, 
            ${child.username}, 
            ${child.avatar_img}, 
            ${child.checking_balance.length > 0 ? `{${child.checking_balance.join(",")}}` : null},
            ${child.savings_balance && child.savings_balance.length > 0 ? `{${child.savings_balance.join(",")}}` : null},
            ${child.pin}, 
            ${child.savings_goal}, 
            ${child.loan_total}, 
            ${child.current_loan_total}
          ) ON CONFLICT (id) DO NOTHING;
        `;
      } catch (error) {
        console.log("Error inserting child:", child.id);
        console.log(error);
      }
    })
  );

  return insertedChildren;
}

// Insert transactions
export async function seedTransactionTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      timestamp TIMESTAMP DEFAULT NOW(),
      type VARCHAR(50) NOT NULL,
      sent_to UUID NOT NULL,
      sent_from UUID NOT NULL,
      description TEXT,
      interest VARCHAR(50),
      withholdings VARCHAR(50),
      amount NUMERIC NOT NULL
    );
  `;

  const insertedTransactions = await Promise.all(
    transactions.map((transaction) => {
      try {
        return client.sql`
          INSERT INTO transactions (id, timestamp, type, sent_to, sent_from, description, interest, withholdings, amount)
          VALUES (
            ${transaction.id}, 
            ${transaction.timestamp}, 
            ${transaction.type}, 
            ${transaction.sent_to}, 
            ${transaction.sent_from}, 
            ${transaction.description}, 
            ${transaction.interest}, 
            ${transaction.withholdings}, 
            ${transaction.amount}
          )
          ON CONFLICT (id) DO NOTHING;
        `;
      } catch (error) {
        console.log("Error inserting transaction:", transaction.id);
        console.log(error);
      }
    })
  );

  return insertedTransactions;
}