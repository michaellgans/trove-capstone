// This file contains type definitions for data.
// It describes the shape of the data, and what data type each property should accept.

export type Parent = {
  parent_id: string;
  name: string;
  email: string;
  password: string;
  avatar_img: string;
  strip_account_id: string[];
  balance: number[];
};

export type Child = {
  id: string;
  parent_id: string;
  name: string;
  username: string;
  avatar_img: string;
  checking_balance: number[];
  savings_balance: number[];
  pin: number;
  savings_goal: number;
  loan_total: number;
  current_loan_total: number;
};

export type Transactions = {
  timestamp: string;
  type: string;
  sent_to: string;
  sent_from: string;
  description: string;
  interest?: string;
  withholdings?: string;
  amount: number;
};