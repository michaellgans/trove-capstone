import { prismaMock } from '../__mock__/prisma';
import { updateWithholdingsBalance } from '../lib/server-actions';

describe('updateWithholdingsBalance', () => {
  it('should update the withholding balance successfully', async () => {
    const withholdingAmount = 100;
    const parentAccountId = "cm4eniw0d000008kvblsvhkac";
    const mockParentAccountData = {
        id: "cm4eniw0d000008kvblsvhkac",
        parent_id: "cm4eniw0d000008kvblsvhkdb",
        stripe_account_id: "cm4eniw0d000008kvblsvhkop",
        balance: 10000,
        withholding_balance: 10000,
    };

    prismaMock.parent_account.update.mockResolvedValueOnce(mockParentAccountData);
    await updateWithholdingsBalance(parentAccountId, withholdingAmount);
    expect(prismaMock.parent_account.update).toHaveBeenCalledWith({
      where: { id: parentAccountId },
      data: { withholding_balance: { increment: withholdingAmount } },
    });
  });

  it('should throw an error if updating the withholding balance fails', async () => {
    const parentAccountId = 'test-parent-id';
    const withholdingAmount = 100;

    prismaMock.parent_account.update.mockRejectedValueOnce(new Error('Failed to update balance'));
    await expect(updateWithholdingsBalance(parentAccountId, withholdingAmount)).rejects.toThrow('Failed to update withholdings balance');
  });
});
