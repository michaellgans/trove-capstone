// This file contains type definitions for data.
// It describes the shape of the data, and what data type each property should accept.

// Parent Data Type
export type ParentDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// Child Data Type
export type ChildDataType = {
  childFirstName: string;
  childLastName: string;
  username: string;
  pin: string;
  confirmPin: string;
  startingBalance: string;
  currency: string;
};

export type Parent = {
  id: string;
  name: string;
  email: string;
  password?: string | null;
  avatar_img?: string | null;
};

export type Child = {
  id: string;
  name: string;
  username: string;
  password: string;
  avatar_img?: string | null;
  parent_id: string;
};

export type Parent_Account = {
  id: string;
  stripe_acct_id?: string | null;
  balance: number;
  withholding_balance: number;
  parent_id: string;
};

export type Child_Account = {
  c_account_id: string;
  checking_balance: number;
  savings_balance?: number;
  savings_goal?: number;
  child_id: string;
  parent_id: string;
};

export type Transactions = {
  id: string;
  timestamp: string;
  type: string;
  description?: string | null;
  to_external_id?: string | null;
  amount: number;
  withholdings?: number | null;
  to_name: string;
  from_name: string;
  to_account_id?: string | null;
  from_account_id: string;
  p_account_id: string;
};

export type Loans = {
  id: string;
  loan_amount: number;
  interest_rate: number;
  due_date: Date;
  current_balance: number;
  lender_id: string;
  borrower_id: string;
};

export type Lessons_Completed = {
  id: string;
  savings: boolean;
  taxes: boolean;
  obligations: boolean;
  financial_literacy: boolean;
  loans: boolean;
  parent_id: string;
};

export type Settings = {
  setting_id: string;
  parent_id: string;
};

export type SignUpPayload = {
  email: string;
  password?: string;
  name: string;
  startingBalance: number;
  children: [ChildSignUpPayload];
}

export type GoogleSignUpPayload = {
  parent_id: string;
  startingBalance: number;
  children: [ChildSignUpPayload];
}

export type ChildSignUpPayload = {
  name: string;
  username: string;
  password: string;
  startingBalance: number;
}

export type LoanDataPayload = {
  interest_rate: number;
  days_due: number;
  loan_amount: number;
  description: string;
}
