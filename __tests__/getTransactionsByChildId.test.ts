import { prismaMock } from '../__mock__/prisma';
import { getTransactionsByChildId } from '../lib/server-actions';

describe('getTransactionsByChildId Tests', () => {
  it('should fetch all transactions for a valid child account', async () => {
    const mockChildAccount = {
      id: "cm4eniw0d000008kvblsvhkbd",
      child_id: "cm4eniw0d000008kvblsvhkaa",
      parent_id: "cm4eniw0d000008kvblsvhkac",
      checking_balance: 2000,
      savings_balance: 2000,
      savings_goal: 3000,
    };

    const mockTransactionsToAccount = [
      {
        id: "cm4eniw0d000008kvblsvhkzy",
        timestamp: new Date("2024-11-15T12:00:00Z"),
        type: "deposit",
        from_account_id: "cm4eniw0d000008kvblsvhkac",
        from_name: "Dad",
        to_account_id: "cm4eniw0d000008kvblsvhkaa",
        to_name: "Timmy",
        to_external_id: null,
        amount: 2000,
        withholdings: null,
        description: "allowance",
        p_account_id: "cm4eniw0d000008kvblsvhkbd",
      },
    ];
    const mockTransactionsFromAccount = [
      {
        id: "cm4eniw0d000008kvblsvhkzz",
        timestamp: new Date("2024-11-16T12:00:00Z"),
        type: "withdrawal",
        from_account_id: "cm4eniw0d000008kvblsvhkaa",
        from_name: "Timmy",
        to_account_id: "cm4eniw0d000008kvblsvhkac",
        to_name: "Dad",
        to_external_id: null,
        amount: 500,
        withholdings: null,
        description: "repayment",
        p_account_id: "cm4eniw0d000008kvblsvhkbd",
      },
    ];

    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockChildAccount);
    prismaMock.transaction.findMany
      .mockResolvedValueOnce(mockTransactionsToAccount)
      .mockResolvedValueOnce(mockTransactionsFromAccount);

    const result = await getTransactionsByChildId("cm4eniw0d000008kvblsvhkaa");
    expect(result).toEqual([...mockTransactionsToAccount, ...mockTransactionsFromAccount]);
  });

  it('should return an empty array if no child account is found', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);
  
    const result = await getTransactionsByChildId("non-existent-child-id");

    expect(result).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith("No child account found for child_id: non-existent-child-id");
    warnSpy.mockRestore();
  });

  it('should throw an error if fetching transactions fails', async () => {
    const mockChildAccount = {
      id: "cm4eniw0d000008kvblsvhkbd",
      child_id: "cm4eniw0d000008kvblsvhkaa",
      parent_id: "cm4eniw0d000008kvblsvhkac",
      checking_balance: 2000,
      savings_balance: 2000,
      savings_goal: 3000,
    };

    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockChildAccount);
    prismaMock.transaction.findMany.mockRejectedValueOnce(new Error('Database error'));
    await expect(getTransactionsByChildId("cm4eniw0d000008kvblsvhkbb")).rejects.toThrow('Unable to fetch transactions');
  });
});
