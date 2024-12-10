import { prismaMock } from "../__mock__/prisma";
import { newChildToParentLoanPayment } from "../lib/server-actions";

describe("newChildToParentLoanPayment", () => {
  const lender_id = "parent-id";
  const borrower_id = "child-id";
  const amount = 500;
  const description = "Loan repayment from child to parent";

  const mockLender = {
    id: lender_id,
    name: "Parent User",
    email: "parent@example.com",
    password: "password123",
    avatar_img: null,
    parent_id: "parent-id",
    username: "parentusername",
  };

  const mockLenderAccount = {
    id: "parent-account-id",
    parent_id: lender_id,
    stripe_account_id: null,
    balance: 2000,
    withholding_balance: 0,
  };

  const mockBorrower = {
    id: borrower_id,
    name: "Child User",
    email: "child@example.com",
    password: "password123",
    avatar_img: null,
    parent_id: "parent-id",
    username: "childusername",
  };

  const mockBorrowerAccount = {
    id: "child-account-id",
    parent_id: "parent-id",
    child_id: borrower_id,
    checking_balance: 1000,
    savings_balance: 500,
    savings_goal: 1000,
  };

  const mockLoan = {
    id: "loan-id",
    borrower_id: mockBorrowerAccount.id,
    lender_id: mockLenderAccount.id,
    current_balance: 1000,
    loan_amount: 1000,
    interest_rate: 5,
    due_date: new Date(),
    p_account_id: mockLenderAccount.parent_id,
  };

  it("throws an error if parent lender or parent account does not exist", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(null);

    await expect(newChildToParentLoanPayment(lender_id, borrower_id, amount, description)).rejects.toThrow("Parent lender not found");
  });

  it("throws an error if child borrower or child account does not exist", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce(mockLender);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockLenderAccount);
    prismaMock.child_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);

    await expect(newChildToParentLoanPayment(lender_id, borrower_id, amount, description)).rejects.toThrow("Child borrower not found");
  });

  it("throws an error if loan record for borrower does not exist", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce(mockLender);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockLenderAccount);
    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockBorrower);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockBorrowerAccount);
    prismaMock.loan.findFirst.mockResolvedValueOnce(null);

    await expect(newChildToParentLoanPayment(lender_id, borrower_id, amount, description)).rejects.toThrow("Loan not found for borrower");
  });

  it("creates a transaction, updates balances, and updates loan record", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce(mockLender);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockLenderAccount);
    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockBorrower);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockBorrowerAccount);
    prismaMock.loan.findFirst.mockResolvedValueOnce(mockLoan);
  
    prismaMock.transaction.create.mockResolvedValueOnce({
      id: "transaction-id",
      timestamp: new Date(),
      type: "Loan",
      from_account_id: mockBorrowerAccount.id,
      from_name: mockBorrower.name,
      to_account_id: mockLenderAccount.id,
      to_name: mockLender.name,
      to_external_id: null,
      amount: amount,
      withholdings: 0,
      description: description,
      p_account_id: mockLenderAccount.id,
    });
  
    prismaMock.child_account.update.mockResolvedValueOnce({
      ...mockBorrowerAccount,
      checking_balance: mockBorrowerAccount.checking_balance - amount,
    });
  
    prismaMock.parent_account.update.mockResolvedValueOnce({
      ...mockLenderAccount,
      balance: mockLenderAccount.balance + amount,
    });

    prismaMock.loan.update.mockResolvedValueOnce({
      ...mockLoan,
      current_balance: mockLoan.current_balance - amount,
    });

    prismaMock.loan.delete.mockResolvedValueOnce({
      ...mockLoan,
    });
  
    await newChildToParentLoanPayment(lender_id, borrower_id, amount, description);

    expect(prismaMock.transaction.create).toHaveBeenCalledWith({
      data: {
        type: "Loan",
        from_account_id: mockBorrowerAccount.id,
        from_name: mockBorrower.name,
        to_account_id: mockLenderAccount.id,
        to_name: mockLender.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: description,
        p_account_id: mockLenderAccount.id,
      },
    });

    expect(prismaMock.child_account.update).toHaveBeenCalledWith({
      where: { id: mockBorrowerAccount.id },
      data: {
        checking_balance: {
          decrement: amount,
        },
      },
    });

    expect(prismaMock.parent_account.update).toHaveBeenCalledWith({
      where: { id: mockLenderAccount.id },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    expect(prismaMock.loan.update).toHaveBeenCalledWith({
      where: { id: mockLoan.id },
      data: {
        current_balance: {
          decrement: amount,
        },
      },
    });
  });

  it("deletes loan if current balance is 0 after payment", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce(mockLender);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockLenderAccount);
    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockBorrower);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockBorrowerAccount);
    prismaMock.loan.findFirst.mockResolvedValueOnce(mockLoan);
  
    prismaMock.transaction.create.mockResolvedValueOnce({
      id: "transaction-id",
      timestamp: new Date(),
      type: "Loan",
      from_account_id: mockBorrowerAccount.id,
      from_name: mockBorrower.name,
      to_account_id: mockLenderAccount.id,
      to_name: mockLender.name,
      to_external_id: null,
      amount: amount,
      withholdings: 0,
      description: description,
      p_account_id: mockLenderAccount.id,
    });
  
    prismaMock.child_account.update.mockResolvedValueOnce({
      ...mockBorrowerAccount,
      checking_balance: mockBorrowerAccount.checking_balance - amount,
    });
  
    prismaMock.parent_account.update.mockResolvedValueOnce({
      ...mockLenderAccount,
      balance: mockLenderAccount.balance + amount,
    });

    prismaMock.loan.update.mockResolvedValueOnce({
      ...mockLoan,
      current_balance: 0,
    });

    prismaMock.loan.delete.mockResolvedValueOnce({
      ...mockLoan,
    });

    await newChildToParentLoanPayment(lender_id, borrower_id, amount, description);

    expect(prismaMock.loan.delete).toHaveBeenCalledWith({
      where: { id: mockLoan.id },
    });

    expect(prismaMock.loan.update).toHaveBeenCalledWith({
      where: { id: mockLoan.id },
      data: {
        current_balance: {
          decrement: amount,
        },
      },
    });
  });
});
