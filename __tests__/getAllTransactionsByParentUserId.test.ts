import { prismaMock } from '../__mock__/prisma';
import { getAllTransactionsByParentUserId } from '../lib/server-actions';

describe('getAllTransactionsByParentUserId', () => {
  const mockParentId = "parent-id";
  const mockParentAccount = {
    id: "parent-account-id",
    parent_id: "parent-id",
    stripe_account_id: "stripe-account-id",
    balance: 3000,
    withholding_balance: 500,
    checking_balance: 1000,
    savings_balance: 2000,
  };
  const mockTransactions = [
    {
      id: "transaction-id-1",
      timestamp: new Date("2024-11-15T12:00:00Z"),
      type: "deposit",
      from_account_id: "account-id-1",
      from_name: "John Doe",
      to_account_id: "account-id-2",
      to_name: "Jane Doe",
      to_external_id: null,
      amount: 500,
      withholdings: 0,
      description: "Allowance",
      p_account_id: mockParentAccount.id,
    },
    {
      id: "transaction-id-2",
      timestamp: new Date("2024-11-20T12:00:00Z"),
      type: "withdrawal",
      from_account_id: "account-id-2",
      from_name: "Jane Doe",
      to_account_id: "account-id-1",
      to_name: "John Doe",
      to_external_id: null,
      amount: 300,
      withholdings: 0,
      description: "Refund",
      p_account_id: mockParentAccount.id,
    },
  ];

  it('should fetch all transactions by parent user ID', async () => {
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockParentAccount);
    prismaMock.transaction.findMany.mockResolvedValueOnce(mockTransactions);

    await expect(getAllTransactionsByParentUserId(mockParentId)).resolves.toEqual(mockTransactions);

    expect(prismaMock.parent_account.findUnique).toHaveBeenCalledWith({
      where: { parent_id: mockParentId },
    });

    expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
      where: { p_account_id: mockParentAccount.id },
    });
  });

  it('should throw an error if the parent account does not exist', async () => {
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(null);

    await expect(getAllTransactionsByParentUserId(mockParentId)).rejects.toThrow('Unable to fetch user transactions');

    expect(prismaMock.parent_account.findUnique).toHaveBeenCalledWith({
      where: { parent_id: mockParentId },
    });

    expect(prismaMock.transaction.findMany).not.toHaveBeenCalled();
  });

  it('should throw an error if no transactions are found', async () => {
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockParentAccount);
    prismaMock.transaction.findMany.mockResolvedValueOnce([]);

    await expect(getAllTransactionsByParentUserId(mockParentId)).resolves.toEqual([]);
  });

  it('should throw an error if fetching transactions fails', async () => {
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockParentAccount);
    prismaMock.transaction.findMany.mockRejectedValueOnce(new Error('Database error'));

    await expect(getAllTransactionsByParentUserId(mockParentId)).rejects.toThrow('Unable to fetch user transactions');
  });
});
