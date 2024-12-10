import { prismaMock } from "../__mock__/prisma";
import { newChildToChildLoan } from "../lib/server-actions";

describe("newChildToChildLoan", () => {
  const lender_id = "lender-id";
  const borrower_id = "borrower-id";
  const loan = {
    interest_rate: 5,
    days_due: 30,
    loan_amount: 1000,
    description: "Loan between two child users",
  };

  const mockLenderUser = {
    id: lender_id,
    parent_id: "parent-id",
    name: "Lender Child User",
    email: "lender@example.com",
    password: "password123",
    avatar_img: null,
    username: "lenderchilduser",
  };

  const mockLenderAccount = {
    id: "lender-account-id",
    parent_id: "parent-id",
    child_id: lender_id,
    checking_balance: 5000,
    savings_balance: 1000,
    savings_goal: 2000,
  };

  const mockBorrowerUser = {
    id: borrower_id,
    parent_id: "parent-id",
    name: "Borrower Child User",
    email: "borrower@example.com",
    password: "password123",
    avatar_img: null,
    username: "borrowerchilduser",
  };

  const mockBorrowerAccount = {
    id: "borrower-account-id",
    parent_id: "parent-id",
    child_id: borrower_id,
    checking_balance: 1000,
    savings_balance: 500,
    savings_goal: 1500,
  };

  it("throws an error if lender or lender account does not exist", async () => {
    prismaMock.child_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);

    await expect(newChildToChildLoan(lender_id, borrower_id, loan)).rejects.toThrow("Child lender not found");
  });

  it("throws an error if borrower or borrower account does not exist", async () => {
    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockLenderUser);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockLenderAccount);
    prismaMock.child_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);

    await expect(newChildToChildLoan(lender_id, borrower_id, loan)).rejects.toThrow("Child borrower not found");
  });

  it("creates a transaction and updates balances correctly", async () => {
    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockLenderUser);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockLenderAccount);
    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockBorrowerUser);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockBorrowerAccount);

    prismaMock.transaction.create.mockResolvedValueOnce({
      id: "transaction-id",
      timestamp: new Date(),
      type: "Loan",
      from_account_id: mockLenderAccount.id,
      from_name: mockLenderUser.name,
      to_account_id: mockBorrowerAccount.id,
      to_name: mockBorrowerUser.name,
      to_external_id: null,
      amount: loan.loan_amount,
      withholdings: 0,
      description: loan.description,
      p_account_id: mockLenderAccount.parent_id,
    });

    prismaMock.child_account.update.mockResolvedValueOnce({
      ...mockLenderAccount,
      checking_balance: mockLenderAccount.checking_balance - loan.loan_amount,
    });

    prismaMock.child_account.update.mockResolvedValueOnce({
      ...mockBorrowerAccount,
      checking_balance: mockBorrowerAccount.checking_balance + loan.loan_amount,
    });

    prismaMock.loan.create.mockResolvedValueOnce({
      id: "loan-id",
      lender_id: mockLenderAccount.id,
      borrower_id: mockBorrowerAccount.id,
      interest_rate: loan.interest_rate,
      loan_amount: loan.loan_amount,
      current_balance: loan.loan_amount + (loan.loan_amount * loan.interest_rate / 100),
      due_date: new Date(),
      p_account_id: mockLenderAccount.parent_id,
    });

    await newChildToChildLoan(lender_id, borrower_id, loan);

    expect(prismaMock.transaction.create).toHaveBeenCalledWith({
      data: {
        type: "Loan",
        from_account_id: mockLenderAccount.id,
        from_name: mockLenderUser.name,
        to_account_id: mockBorrowerAccount.id,
        to_name: mockBorrowerUser.name,
        to_external_id: null,
        amount: loan.loan_amount,
        withholdings: 0,
        description: loan.description,
        p_account_id: mockLenderAccount.parent_id,
      },
    });

    expect(prismaMock.child_account.update).toHaveBeenCalledWith({
      where: { id: mockLenderAccount.id },
      data: {
        checking_balance: {
          decrement: loan.loan_amount,
        },
      },
    });

    expect(prismaMock.child_account.update).toHaveBeenCalledWith({
      where: { id: mockBorrowerAccount.id },
      data: {
        checking_balance: {
          increment: loan.loan_amount,
        },
      },
    });

    expect(prismaMock.loan.create).toHaveBeenCalledWith({
      data: {
        lender_id: mockLenderAccount.id,
        borrower_id: mockBorrowerAccount.id,
        interest_rate: loan.interest_rate,
        loan_amount: loan.loan_amount,
        current_balance: loan.loan_amount + (loan.loan_amount * loan.interest_rate / 100),
        due_date: expect.any(Date),
        p_account_id: mockLenderAccount.parent_id,
      },
    });
  });
});
