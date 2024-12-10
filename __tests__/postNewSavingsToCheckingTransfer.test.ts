import { prismaMock } from "../__mock__/prisma";
import { newSavingsToCheckingTransfer } from "../lib/server-actions";

describe("newSavingsToCheckingTransfer", () => {
  const child_id = "child-id";
  const parent_id = "parent-id";
  const amount = 100;

  const mockParentAccount = {
    id: "parent-account-id",
    parent_id: parent_id,
    balance: 5000,
    withholding_balance: 0,
    stripe_account_id: null,
  };

  const mockChildUser = {
    id: child_id,
    parent_id: parent_id,
    name: "Child",
    username: "child-user",
    password: "67890",
    avatar_img: null,
  };

  const mockChildAccount = {
    id: "child-account-id",
    parent_id: parent_id,
    child_id: child_id,
    checking_balance: 1000,
    savings_balance: 2000,
    savings_goal: 10000,
  };

  it("throws an error if parent account does not exist", async () => {
    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockChildUser);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockChildAccount);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(null);

    await expect(newSavingsToCheckingTransfer(child_id, amount)).rejects.toThrow("No parent account found");
  });

  it("throws an error if child user or account does not exist", async () => {
    prismaMock.child_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);

    await expect(newSavingsToCheckingTransfer(child_id, amount)).rejects.toThrow("No child user found");
  });

  it("creates a transaction and updates child account balances correctly", async () => {
    prismaMock.child_user.findUnique.mockResolvedValueOnce(mockChildUser);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockChildAccount);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockParentAccount);

    prismaMock.transaction.create.mockResolvedValueOnce({
      id: "transaction-id",
      timestamp: new Date(),
      type: "Transfer",
      from_account_id: mockChildAccount.id,
      from_name: mockChildUser.name,
      to_account_id: mockChildAccount.id,
      to_name: mockChildUser.name,
      to_external_id: null,
      amount: amount,
      withholdings: 0,
      description: "Savings Transfer",
      p_account_id: mockParentAccount.id,
    });

    prismaMock.child_account.update.mockResolvedValueOnce({
      ...mockChildAccount,
      savings_balance: mockChildAccount.savings_balance - amount,
      checking_balance: mockChildAccount.checking_balance + amount,
    });

    await newSavingsToCheckingTransfer(child_id, amount);

    expect(prismaMock.transaction.create).toHaveBeenCalledWith({
      data: {
        type: "Transfer",
        from_account_id: mockChildAccount.id,
        from_name: mockChildUser.name,
        to_account_id: mockChildAccount.id,
        to_name: mockChildUser.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: "Savings Transfer",
        p_account_id: mockParentAccount.id,
      },
    });

    expect(prismaMock.child_account.update).toHaveBeenCalledWith({
      where: {
        child_id: child_id,
      },
      data: {
        savings_balance: {
          decrement: amount,
        },
        checking_balance: {
          increment: amount,
        },
      },
    });
  });
});
