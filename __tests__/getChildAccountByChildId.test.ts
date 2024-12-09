import { prismaMock } from '../__mock__/prisma';
import { getChildAccountByChildId } from '../lib/server-actions';

describe('Children Service Tests', () => {
  it('should fetch child details by ID', async () => {
    const mockChildAccountData = [
      {
        id: "cm4eniw0d000008kvblsvhkbd",
        child_id: "cm4eniw0d000008kvblsvhkaa",
        parent_id: "cm4eniw0d000008kvblsvhkac",
        checking_balance: 2000,
        savings_balance: 2000,
        savings_goal: 3000,
      }
    ];

    prismaMock.child_account.findMany.mockResolvedValueOnce(mockChildAccountData);
    await expect(getChildAccountByChildId("cm4eniw0d000008kvblsvhkac")).resolves.toEqual(mockChildAccountData);
    console.log('Mock calls:', prismaMock.child_account.findMany.mock.calls);
  });

  it('should throw an error if no child account data is found', async () => {
    const child_id = 'non-existent-id';
    prismaMock.child_account.findMany.mockResolvedValueOnce([]);
    await expect(getChildAccountByChildId(child_id)).rejects.toThrow(Error);
  });

  it('should throw an error if fetching child account fails due to database error', async () => {
    const child_id = 'test-child-id';
    prismaMock.child_account.findMany.mockRejectedValueOnce(new Error('Database error'));
    await expect(getChildAccountByChildId(child_id)).rejects.toThrow('Unable to fetch child account');
  });
});
