import { prismaMock } from "../__mock__/prisma";
import { transferWithholdings } from "../lib/server-actions";

describe("transferWithholdings", () => {
  const parent_id = "parent-id";
  const amount = 100;

  const mockParentUser = {
    id: parent_id,
    name: "Parent User",
    email: "parent@example.com",
    password: "password123",
    avatar_img: null,
  };

  const mockParentAccount = {
    id: "parent-account-id",
    parent_id: parent_id,
    balance: 5000,
    withholding_balance: 200,
    stripe_account_id: null,
  };

  it("throws an error if parent user or account does not exist", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(null);

    await expect(transferWithholdings(parent_id, amount)).rejects.toThrow("No parent user found");
  });

  it("creates a transaction and updates parent account balances correctly", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce(mockParentUser);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockParentAccount);
    prismaMock.transaction.create.mockResolvedValueOnce({
      id: "transaction-id",
      timestamp: new Date(),
      type: "Transfer",
      from_account_id: mockParentAccount.id,
      from_name: mockParentUser.name,
      to_account_id: mockParentAccount.id,
      to_name: mockParentUser.name,
      to_external_id: null,
      amount: amount,
      withholdings: 0,
      description: "Withholdings Transfer",
      p_account_id: mockParentAccount.id,
    });

    prismaMock.parent_account.update.mockResolvedValueOnce({
      ...mockParentAccount,
      withholding_balance: mockParentAccount.withholding_balance - amount,
      balance: mockParentAccount.balance + amount,
    });

    await transferWithholdings(parent_id, amount);

    expect(prismaMock.transaction.create).toHaveBeenCalledWith({
      data: {
        type: "Transfer",
        from_account_id: mockParentAccount.id,
        from_name: mockParentUser.name,
        to_account_id: mockParentAccount.id,
        to_name: mockParentUser.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: "Withholdings Transfer",
        p_account_id: mockParentAccount.id,
      },
    });

    expect(prismaMock.parent_account.update).toHaveBeenCalledWith({
      where: {
        parent_id: parent_id,
      },
      data: {
        withholding_balance: {
          decrement: amount,
        },
        balance: {
          increment: amount,
        },
      },
    });
  });
});
