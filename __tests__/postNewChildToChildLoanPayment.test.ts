import { prismaMock } from "../__mock__/prisma";
import { newChildToChildLoanPayment } from "../lib/server-actions";

describe('newChildToChildLoanPayment', () => {
  it('creates a transaction, updates balances, and updates loan record', async () => {
    const lender_id = 'lender-id';
    const borrower_id = 'borrower-id';
    const amount = 500;
    const description = 'Loan payment description';

    const mockLender = {
      id: 'lender_id',
      parent_id: 'parent-id',
      name: 'Child Name',
      username: 'childuser',
      password: 'password123',
      avatar_img: null,
    };
    const mockBorrower = {
      id: 'borrower-id',
      parent_id: 'parent-id2',
      name: 'Child Name2',
      username: 'childuser2',
      password: 'password124',
      avatar_img: null,
    };
    const mockLenderAccount = {
      id: 'lender-account-id',
      parent_id: 'parent-id',
      child_id: 'lender_id',
      checking_balance: 500,
      savings_balance: 100,
      savings_goal: 200,
    };
    const mockBorrowerAccount = {
      id: 'borrower-account-id',
      parent_id: 'parent-id2',
      child_id: 'borrower_id',
      checking_balance: 500,
      savings_balance: 100,
      savings_goal: 200,
    };
    const mockLoan = {
      id: 'loan-id',
      p_account_id: 'parent-account-id',
      lender_id: 'lender-id',
      borrower_id: 'borrower-id',
      interest_rate: 5,
      loan_amount: 1000,
      current_balance: 500,
      due_date: new Date('2025-01-01'),
    };

    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockLender);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockLenderAccount);
    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockBorrower);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockBorrowerAccount);
    prismaMock.loan.findFirst.mockResolvedValueOnce(mockLoan);

    prismaMock.transaction.create.mockResolvedValueOnce({
      id: 'transaction-id',
      timestamp: new Date(),
      type: 'Loan',
      from_account_id: mockBorrowerAccount.id,
      from_name: mockBorrower.name,
      to_account_id: mockLenderAccount.id,
      to_name: mockLender.name,
      to_external_id: null,
      amount: amount,
      withholdings: 0,
      description: description,
      p_account_id: mockLenderAccount.parent_id,
    });

    prismaMock.child_account.update.mockResolvedValueOnce({
      ...mockBorrowerAccount,
      checking_balance: mockBorrowerAccount.checking_balance - amount,
    });

    prismaMock.child_account.update.mockResolvedValueOnce({
      ...mockLenderAccount,
      checking_balance: mockLenderAccount.checking_balance + amount,
    });

    prismaMock.loan.update.mockResolvedValueOnce({
      ...mockLoan,
      current_balance: mockLoan.current_balance - amount,
    });

    prismaMock.loan.delete.mockResolvedValueOnce(mockLoan);

    await newChildToChildLoanPayment(lender_id, borrower_id, amount, description);

    expect(prismaMock.transaction.create).toHaveBeenCalledWith({
      data: {
        type: 'Loan',
        from_account_id: mockBorrowerAccount.id,
        from_name: mockBorrower.name,
        to_account_id: mockLenderAccount.id,
        to_name: mockLender.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: description,
        p_account_id: mockLenderAccount.parent_id,
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

    expect(prismaMock.child_account.update).toHaveBeenCalledWith({
      where: { id: mockLenderAccount.id },
      data: {
        checking_balance: {
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

    expect(prismaMock.loan.delete).toHaveBeenCalledWith({
      where: { id: mockLoan.id },
    });
  });

  it('throws an error if loan is not found for borrower', async () => {
    const lender_id = 'lender-id';
    const borrower_id = 'borrower-id';
    const amount = 100;

    const mockLender = {
      id: 'lender_id',
      parent_id: 'parent-id',
      name: 'Child Name',
      username: 'childuser',
      password: 'password123',
      avatar_img: null,
    };
    const mockBorrower = {
      id: 'borrower-id',
      parent_id: 'parent-id2',
      name: 'Child Name2',
      username: 'childuser2',
      password: 'password124',
      avatar_img: null,
    };
    const mockLenderAccount = {
      id: 'lender-account-id',
      parent_id: 'parent-id',
      child_id: 'lender_id',
      checking_balance: 500,
      savings_balance: 100,
      savings_goal: 200,
    };
    const mockBorrowerAccount = {
      id: 'borrower-account-id',
      parent_id: 'parent-id2',
      child_id: 'borrower_id',
      checking_balance: 500,
      savings_balance: 100,
      savings_goal: 200,
    };

    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockLender);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockLenderAccount);
    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockBorrower);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockBorrowerAccount);

    prismaMock.loan.findFirst.mockResolvedValueOnce(null);

    await expect(newChildToChildLoanPayment(lender_id, borrower_id, amount)).rejects.toThrowError(
      'Loan not found for borrower'
    );
  });

  it('throws an error if lender or lender account is not found', async () => {
    const lender_id = 'lender-id';
    const borrower_id = 'borrower-id';
    const amount = 100;
    const description = 'Loan payment description';

    const mockBorrower = {
      id: 'borrower-id',
      parent_id: 'parent-id2',
      name: 'Child Name2',
      username: 'childuser2',
      password: 'password124',
      avatar_img: null,
    };
    const mockBorrowerAccount = {
      id: 'borrower-account-id',
      parent_id: 'parent-id2',
      child_id: 'borrower_id',
      checking_balance: 500,
      savings_balance: 100,
      savings_goal: 200,
    };

    prismaMock.child_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);
  
    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockBorrower);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockBorrowerAccount);

    await expect(newChildToChildLoanPayment(lender_id, borrower_id, amount, description)).rejects.toThrowError(
      'Child lender not found'
    );
  });

  it('throws an error if borrower or borrower account is not found', async () => {
    const lender_id = 'lender-id';
    const borrower_id = 'borrower-id';
    const amount = 100;
    const description = 'Loan payment description';

    const mockLender = {
      id: 'lender_id',
      parent_id: 'parent-id',
      name: 'Child Name',
      username: 'childuser',
      password: 'password123',
      avatar_img: null,
    };
    const mockLenderAccount = {
      id: 'lender-account-id',
      parent_id: 'parent-id',
      child_id: 'lender_id',
      checking_balance: 500,
      savings_balance: 100,
      savings_goal: 200,
    };

    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockLender);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockLenderAccount);
  
    prismaMock.child_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);
    await expect(newChildToChildLoanPayment(lender_id, borrower_id, amount, description)).rejects.toThrowError(
      'Child borrower not found'
    );
  });
  
});
