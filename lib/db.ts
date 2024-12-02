import { Generated } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";

export interface Database {
  parents: ParentTable;
  children: ChildTable;
  parent_accounts: ParentAccountTable;
  child_accounts: ChildAccountTable;
  transactions: TransactionTable;
  loans: LoanTable;
  lessons_completed: LessonsCompletedTable;
  settings: SettingsTable;
}

// Parent Table
export interface ParentTable {
  parent_id: Generated<string>;
  name: string;
  email: string;
  password: string;
  avatar_img: string;
}

// Child Table
export interface ChildTable {
  child_id: Generated<string>;
  name: string;
  username: string;
  password: string;
  avatar_img: string;
  parent_id: string;
}

// Parent Account Table
export interface ParentAccountTable {
  p_account_id: Generated<string>;
  stripe_acct_id: string;
  balance: number;
  withholding_balance: number;
  parent_id: string;
}

// Child Account Table
export interface ChildAccountTable {
  c_account_id: Generated<string>;
  checking_balance: number;
  savings_balance?: number;
  savings_goal?: number;
  child_id: string;
  p_account_id: string;
}

// Transactions Table
export interface TransactionTable {
  transaction_id: Generated<string>;
  timestamp: string;
  type: string;
  description: string;
  to_external_id?: string | null;
  amount: number;
  withholdings?: string | null;
  to_name: string;
  from_name: string;
  to_account_id?: string | null;
  from_account_id: string;
  p_account_id: string;
}

// Loans Table
export interface LoanTable {
  loan_id: Generated<string>;
  loan_amount: number;
  interest_rate: number;
  due_date: Date;
  current_amount: number;
  lender_id: string;
  borrower_id: string;
}

// Lessons Completed Table
export interface LessonsCompletedTable {
  savings: boolean;
  taxes: boolean;
  obligations: boolean;
  financial_literacy: boolean;
  loans: boolean;
  parent_id: string;
}

// Settings Table
export interface SettingsTable {
  setting_id: Generated<string>;
  parent_id: string;
}

export const db = createKysely<Database>();