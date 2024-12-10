import { prismaMock } from '../__mock__/prisma';
import { newChildToChildTransfer } from '../lib/server-actions';

describe("newChildToChildTransfer", () => {
  const from_child_id = "from-child-id";
  const to_child_id = "to-child-id";

  it("throws an error if 'from' user or account does not exist", async () => {
    prismaMock.child_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);

    await expect(
      newChildToChildTransfer(from_child_id, to_child_id, 100, "Test transfer")
    ).rejects.toThrow("No child user found");
  });

  it("throws an error if 'to' user or account does not exist", async () => {
    prismaMock.child_user.findUnique.mockResolvedValueOnce({
      id: from_child_id,
      parent_id: "parent-id",
      name: "Sender",
      username: "Slim",
      password: "12345",
      avatar_img: null,
    });
    prismaMock.child_account.findUnique.mockResolvedValueOnce({
      id: "from-account-id",
      parent_id: "Mom",
      child_id: from_child_id,
      checking_balance: 1000,
      savings_balance: 2000,
      savings_goal: 10000,
    });

    prismaMock.child_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);

    await expect(
      newChildToChildTransfer(from_child_id, to_child_id, 100, "Test transfer")
    ).rejects.toThrow("No child user found");
  });

  it("throws an error if parent account does not exist", async () => {
    prismaMock.child_user.findUnique.mockResolvedValueOnce({
      id: from_child_id,
      parent_id: "parent-id",
      name: "Sender",
      username: "Slim",
      password: "12345",
      avatar_img: null,
    });
    prismaMock.child_account.findUnique.mockResolvedValueOnce({
      id: "from-account-id",
      parent_id: "Mom",
      child_id: from_child_id,
      checking_balance: 1000,
      savings_balance: 2000,
      savings_goal: 10000,
    });

    prismaMock.child_user.findUnique.mockResolvedValueOnce({
      id: to_child_id,
      parent_id: "parent-id",
      name: "Receiver",
      username: "Bob",
      password: "67890",
      avatar_img: null,
    });
    prismaMock.child_account.findUnique.mockResolvedValueOnce({
      id: "to-account-id",
      parent_id: "Dad",
      child_id: to_child_id,
      checking_balance: 500,
      savings_balance: 1000,
      savings_goal: 5000,
    });

    prismaMock.parent_account.findUnique.mockResolvedValueOnce(null);

    await expect(
      newChildToChildTransfer(from_child_id, to_child_id, 100, "Test transfer")
    ).rejects.toThrow("No parent account found");
  });

  it("creates a new transaction with correct data", async () => {
    prismaMock.child_user.findUnique.mockResolvedValueOnce({
      id: from_child_id,
      parent_id: "parent-id",
      name: "Sender",
      username: "Slim",
      password: "12345",
      avatar_img: null,
    });
    prismaMock.child_account.findUnique.mockResolvedValueOnce({
      id: "from-account-id",
      parent_id: "Mom",
      child_id: from_child_id,
      checking_balance: 1000,
      savings_balance: 2000,
      savings_goal: 10000,
    });
    prismaMock.child_user.findUnique.mockResolvedValueOnce({
      id: to_child_id,
      parent_id: "parent-id",
      name: "Receiver",
      username: "Bob",
      password: "67890",
      avatar_img: null,
    });
    prismaMock.child_account.findUnique.mockResolvedValueOnce({
      id: "to-account-id",
      parent_id: "Dad",
      child_id: to_child_id,
      checking_balance: 500,
      savings_balance: 1000,
      savings_goal: 5000,
    });
    prismaMock.parent_account.findUnique.mockResolvedValueOnce({
      id: "parent-account-id",
      parent_id: "parent-id",
      stripe_account_id: null,
      balance: 5000,
      withholding_balance: 5000,
    });

    const mockTransaction = {
      id: "transaction-id",
      timestamp: new Date(),
      type: "Transfer",
      from_account_id: "from-account-id",
      from_name: "Sender",
      to_account_id: "to-account-id",
      to_name: "Receiver",
      to_external_id: null,
      amount: 100,
      withholdings: 0,
      description: "Test transfer",
      p_account_id: "parent-account-id",
    };

    prismaMock.transaction.create.mockResolvedValueOnce(mockTransaction);

    await newChildToChildTransfer(from_child_id, to_child_id, 100, "Test transfer");

    expect(prismaMock.transaction.create).toHaveBeenCalledWith({
      data: {
        type: "Transfer",
        from_account_id: "from-account-id",
        from_name: "Sender",
        to_account_id: "to-account-id",
        to_name: "Receiver",
        to_external_id: null,
        amount: 100,
        withholdings: 0,
        description: "Test transfer",
        p_account_id: "parent-account-id",
      },
    });
  });
});
