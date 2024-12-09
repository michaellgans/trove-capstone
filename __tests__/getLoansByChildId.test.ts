import { prismaMock } from '../__mock__/prisma';
import { getLoansByChildId } from '../lib/server-actions';

describe('getLoansByChildId Tests', () => {
  it('should fetch all loans for a valid child account', async () => {
    const mockChildAccount = {
      id: "cm4eniw0d000008kvblsvhkbd",
      child_id: "cm4eniw0d000008kvblsvhkaa",
      parent_id: "cm4eniw0d000008kvblsvhkac",
      checking_balance: 2000,
      savings_balance: 2000,
      savings_goal: 3000,
    };

    const mockLoansToAccount = [
      {
        id: "cm4eniw0d000008kvblsvhkl1",
        borrower_id: "cm4eniw0d000008kvblsvhkaa",
        lender_id: "cm4eniw0d000008kvblsvhkac",
        interest_rate: 5,
        loan_amount: 1000,
        current_balance: 500,
        due_date: new Date("2025-01-01T00:00:00Z"),
        p_account_id: "cm4eniw0d000008kvblsvhkbd",
      },
    ];

    const mockLoansFromAccount = [
      {
        id: "cm4eniw0d000008kvblsvhkl2",
        borrower_id: "cm4eniw0d000008kvblsvhkac",
        lender_id: "cm4eniw0d000008kvblsvhkaa",
        interest_rate: 5,
        loan_amount: 500,
        current_balance: 250,
        due_date: new Date("2025-02-01T00:00:00Z"),
        p_account_id: "cm4eniw0d000008kvblsvhkbd",
      },
    ];

    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockChildAccount);
    prismaMock.loan.findMany
      .mockResolvedValueOnce(mockLoansToAccount)
      .mockResolvedValueOnce(mockLoansFromAccount);

    const result = await getLoansByChildId("cm4eniw0d000008kvblsvhkaa");
    expect(result).toEqual([...mockLoansToAccount, ...mockLoansFromAccount]);
  });

  it('should return an empty array if no child account is found', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);

    const result = await getLoansByChildId("non-existent-child-id");

    expect(result).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith("No child account found for child_id: non-existent-child-id");
    warnSpy.mockRestore();
  });

  it('should throw an error if fetching loans fails', async () => {
    const mockChildAccount = {
      id: "cm4eniw0d000008kvblsvhkbd",
      child_id: "cm4eniw0d000008kvblsvhkaa",
      parent_id: "cm4eniw0d000008kvblsvhkac",
      checking_balance: 2000,
      savings_balance: 2000,
      savings_goal: 3000,
    };

    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockChildAccount);
    prismaMock.loan.findMany.mockRejectedValueOnce(new Error('Database error'));
    await expect(getLoansByChildId("cm4eniw0d000008kvblsvhkzz")).rejects.toThrow('Unable to fetch loans');
  });
});
