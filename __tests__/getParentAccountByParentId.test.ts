import { prismaMock } from '../__mock__/prisma';
import { getParentAccountByParentId } from '../lib/server-actions';

describe('Parent Service Tests', () => {
  it('should fetch parent details by ID', async () => {
    const mockParentAccountData = [
      {
        id: "cm4eniw0d000008kvblsvhkac",
        parent_id: "cm4eniw0d000008kvblsvhkdb",
        stripe_account_id: "cm4eniw0d000008kvblsvhkop",
        balance: 10000,
        withholding_balance: 10000,
      }
    ];

    prismaMock.parent_account.findMany.mockResolvedValueOnce(mockParentAccountData);
    await expect(getParentAccountByParentId("cm4eniw0d000008kvblsvhkdb")).resolves.toEqual(mockParentAccountData);
    console.log('Mock calls:', prismaMock.parent_account.findMany.mock.calls);
  });

  it('should throw an error if no parent account data is found', async () => {
    const parent_id = 'non-existent-id';
    prismaMock.parent_account.findMany.mockResolvedValueOnce([]);
    await expect(getParentAccountByParentId(parent_id)).rejects.toThrow(Error);
  });

  it('should throw an error if fetching parent account fails due to database error', async () => {
    const parent_id = 'test-parent-id';
    prismaMock.parent_account.findMany.mockRejectedValueOnce(new Error('Database error'));
    await expect(getParentAccountByParentId(parent_id)).rejects.toThrow('Unable to fetch parent account');
  });
});
