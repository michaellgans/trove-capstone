import { prismaMock } from "../__mock__/prisma";
import { newParentToChildLoan } from "../lib/server-actions";

describe("newParentToChildLoan", () => {
  const lender_id = "lender-id";
  const borrower_id = "borrower-id";
  const loan = {
    interest_rate: 5,
    days_due: 30,
    loan_amount: 1000,
    description: "Loan for education",
  };

  const mockLenderUser = {
    id: lender_id,
    parent_id: lender_id,
    name: "Parent User",
    email: "parent@example.com",
    password: "password123",
    avatar_img: null,
    username: "parentuser",
  };
  
  const mockLenderAccount = {
    id: "lender-account-id",
    parent_id: lender_id,
    balance: 5000,
    withholding_balance: 200,
    stripe_account_id: null,
  };
  
  const mockBorrowerUser = {
    id: borrower_id,
    parent_id: lender_id,
    name: "Child User",
    email: "child@example.com",
    password: "password123",
    avatar_img: null,
    username: "childuser",
  };
  
  const mockBorrowerAccount = {
    id: "borrower-account-id",
    parent_id: lender_id,
    child_id: borrower_id,
    checking_balance: 1000,
    savings_balance: 0,
    savings_goal: 0,
  };

  it("throws an error if parent user or account does not exist", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(null);

    await expect(newParentToChildLoan(lender_id, borrower_id, loan)).rejects.toThrow("No parent user found");
  });

  it("throws an error if child user or account does not exist", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce(mockLenderUser);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockLenderAccount);
    prismaMock.child_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);

    await expect(newParentToChildLoan(lender_id, borrower_id, loan)).rejects.toThrow("No child user found");
  });

  it("creates a transaction and updates parent and child account balances correctly", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce(mockLenderUser);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockLenderAccount);
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
      p_account_id: mockLenderAccount.id,
    });

    prismaMock.parent_account.update.mockResolvedValueOnce({
      ...mockLenderAccount,
      balance: mockLenderAccount.balance - loan.loan_amount,
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
      p_account_id: mockLenderAccount.id,
    });

    await newParentToChildLoan(lender_id, borrower_id, loan);

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
        p_account_id: mockLenderAccount.id,
      },
    });

    expect(prismaMock.parent_account.update).toHaveBeenCalledWith({
      where: { id: mockLenderAccount.id },
      data: {
        balance: {
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
        p_account_id: mockLenderAccount.id,
      },
    });
  });
});
