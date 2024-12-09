import { prismaMock } from '../__mock__/prisma';
import { getWithholdingBalanceByParentAccount } from '../lib/server-actions';

describe('getWithholdingBalanceByParentAccount Tests', () => {
  it('should fetch the withholding balance for a valid parent account', async () => {
    const mockParentAccount = {
      id: "cm4eniw0d000008kvblsvhkbd",
      parent_id: "cm4eniw0d000008kvblsvhkac",
      stripe_account_id: "cm4eniw0d000008kvblsvhkst",
      balance: 5000,
      withholding_balance: 1000,
    };

    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockParentAccount);
    const result = await getWithholdingBalanceByParentAccount("cm4eniw0d000008kvblsvhkbd");
    expect(result).toEqual(1000);
  });

  it('should return null if no parent account is found', async () => {
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(null);
    const result = await getWithholdingBalanceByParentAccount("non-existent-parent-id");
    expect(result).toBeNull();
  });

  it('should throw an error if there is an issue fetching the parent account', async () => {
    prismaMock.parent_account.findUnique.mockRejectedValueOnce(new Error('Database error'));
    await expect(getWithholdingBalanceByParentAccount("cm4eniw0d000008kvblsvhkaa")).rejects.toThrow('Unable to fetch withholding balance');
  });
});
