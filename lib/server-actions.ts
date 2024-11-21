'use server'

import { db } from "./db";
import { sql } from "@vercel/postgres";

/**
 * Data Retrieval Functions
 */

export async function fetchChildUsersByParentID(parent_id: string) {
  /**
   * parent_id: string(UUID)
   * 
   * returns: Array of Child Objects
   *  [
   *    {
   *      "id": "c-0000",
   *      "parent_id": "0000",
   *      "name": "Chris Stephens",
   *      "username": "Chris",
   *      "avatar_img": "/image/image.png",
   *      "checking_balance": [1000],
   *      "savings_balance": [2500],
   *      "pin": 1234,
   *      "savings_goal": 10000,
   *      "loan_total": 1000,
   *      "current_loan_total": 500
   *    }
   *  ]
   */
}

export async function fetchAllTransactionHistory(parent_id: string) {
  /**
   * parent_id: string(UUID)
   * 
   * returns: Array of Transaction Objects
   *  [
   *    {
   *      "timestamp": "2024-11-15T10:00:00Z",
   *      "type": "deposit",
   *      "sent_to": "c-0003",
   *      "sent_from": "0001",
   *      "description": "Weekly Allowance",
   *      "interest": "0%",
   *      "withholdings": "N/A",
   *      "amount": 1000
   *    }
   *  ]
   */
}

export async function fetchChildTransactionHistory(child_id: string) {
  /**
   * child_id: string(UUID)
   * 
   * returns: Array of Transaction Objects
   *  [
   *    {
   *      "timestamp": "2024-11-15T10:00:00Z",
   *      "type": "deposit",
   *      "sent_to": "c-0003",
   *      "sent_from": "c-0002",
   *      "description": "Loan Payment",
   *      "interest": "0%",
   *      "withholdings": "N/A",
   *      "amount": 1500
   *    }
   *  ]
   */
}

export async function fetchUserSettings(user_id: string) {
  /**
   * user_id: string(UUID) Either Child or Parent User
   * 
   * returns: Settings Object
   *  {
   *    "allow_loan_as_bills": "true",
   *    "allow_loans": "true",
   *    "allow_interest": "true",
   *    "max_loan": "N/A",
   *    "max_interest": "N/A",
   *    "allow_multi_checking": "true",
   *    "allow_savings": "true",
   *    "allow_transfer_tax": "true",
   *    "max_taxes": "N/A"
   *  }
   */
}

export async function fetchLoanInfo(user_id: string) {
  /**
   * user_id: string(UUID) Either Child or Parent User
   * 
   * returns: Loan Object
   *  {
   *    "lender_id": "0000",
   *    "borrower_id": "c-0000",
   *    "interest_rate": "0.1",
   *    "due_date": "2024-12-01T10:00:00Z",
   *    "initial_balance": "1000",
   *    "current_balance": "500",
   *    "last_payment_date": "2024-11-25T10:00:00Z"
   *  }
   */
}

/**
 * Data Insertion Functions
 */

interface Child {
  firstname: string;
  lastname: string;
  username: string;
  pinNumber: number;
  startingBalance: number;
}

interface RegisterUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  numChildren: number;
  children: [Child];
}

export async function registerParentUser({firstname, lastname, email , password, numChildren, children}: RegisterUser) {
  /**
   * Collects data from registration form, builds a user object, builds child objects, then inserts into database
   */
}

export async function addChildUser(parent_id: string, {firstname, lastname, username, pinNumber, startingBalance}: Child) {
  /**
   * Collects data from add child form, builds a child object, then inserts into database
   */
}

interface Transaction {
  sent_to: string; // UUID
  sent_from: string; // UUID
  amount: number; // cents
  withholdings: number;
  loan_id: string; // UUID
}

export async function newTransaction({sent_to, sent_from, amount, withholdings, loan_id}: Transaction) {
  /**
   * Collects data from transaction form, builds transaction object, updates account balances/loan balances, inserts into database
   */
}

interface Loan {
  lender_id: string; // UUID
  borrower_id: string; // UUID
  interest_rate: number;
  initial_balance: number;
  due_date: string;
}

export async function newLoan({lender_id, borrower_id, interest_rate, initial_balance, due_date}: Loan) {
  /**
   * Collects data from loan form, builds loan object, updates account/loan balances, inserts into database
   */
}

/**
 * Data Update Functions
 */

export async function updateParentSettings(parent_id: string) {
  /**
   * Collect data from settings form, fetch settings object by parent id, update settings object in database
   */
}

/**
 * Data Deletion Functions
 */

export async function deleteParentUser(parent_id: string) {
  /**
   * Deletes parent user and all associated children users
   */
}

export async function deleteLoan(loan_id: string) {
  /**
   * Deletes loan from database, used on loan completion or parent removing loan
   */
}
