import { prismaMock } from '../__mock__/prisma';
import { getAllTransactionsByParentAccountId } from '../lib/server-actions';

describe('Children Service Tests', () => {
  it('should fetch child details by ID', async () => {
    const mockChildAccountData = [
      {
        id: "cm4eniw0d000008kvblsvhkbd",
        timestamp: new Date("2024-11-15T12:00:00Z"),
        type: "deposit",
        from_account_id: "cm4eniw0d000008kvblsvhkac",
        from_name: "Dad",
        to_account_id: "cm4eniw0d000008kvblsvhkaa",
        to_name: "Timmy",
        to_external_id: null,
        amount: 2000,
        withholdings: 0,
        description: "allowence",
        p_account_id: "cm4eniw0d000008kvblsvhkac",
      }
    ];

    prismaMock.transaction.findMany.mockResolvedValueOnce(mockChildAccountData);
    await expect(getAllTransactionsByParentAccountId("cm4eniw0d000008kvblsvhkac")).resolves.toEqual(mockChildAccountData);
    console.log('Mock calls:', prismaMock.transaction.findMany.mock.calls);
  });

  it('should throw an error if no child account data is found', async () => {
    const p_account_id  = 'non-existent-id';
    prismaMock.transaction.findMany.mockResolvedValueOnce([]);
    await expect(getAllTransactionsByParentAccountId(p_account_id )).rejects.toThrow(Error);
  });

  it('should throw an error if fetching child account fails due to database error', async () => {
    const p_account_id = 'test-parent-id';
    prismaMock.transaction.findMany.mockRejectedValueOnce(new Error('Database error'));
    await expect(getAllTransactionsByParentAccountId(p_account_id)).rejects.toThrow('Unable to fetch account transactions');
  });
});