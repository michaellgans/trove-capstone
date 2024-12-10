import { prismaMock } from "../__mock__/prisma";
import { newChildToParentTransfer } from "../lib/server-actions";

describe("newChildToParentTransfer", () => {
  const child_id = "child-id";
  const parent_id = "parent-id";

  it("throws an error if parent user or account does not exist", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(null);

    await expect(
      newChildToParentTransfer(child_id, parent_id, 100, "Test transfer")
    ).rejects.toThrow("No parent user found");
  });

  it("throws an error if child user or account does not exist", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce({
      id: parent_id,
      name: "Parent",
      email: "parent@example.com",
      password: "12345",
      avatar_img: null,
    });

    prismaMock.parent_account.findUnique.mockResolvedValueOnce({
      id: "parent-account-id",
      parent_id: parent_id,
      balance: 5000,
      withholding_balance: 0,
      stripe_account_id: null,
    });

    prismaMock.child_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);

    await expect(
      newChildToParentTransfer(child_id, parent_id, 100, "Test transfer")
    ).rejects.toThrow("No child user found");
  });

  it("updates child account balance and increments parent account balance", async () => {
    prismaMock.parent_user.findUnique.mockResolvedValueOnce({
      id: parent_id,
      name: "Parent",
      email: "parent@example.com",
      password: "12345",
      avatar_img: null,
    });

    prismaMock.parent_account.findUnique.mockResolvedValueOnce({
      id: "parent-account-id",
      parent_id: parent_id,
      balance: 5000,
      withholding_balance: 0,
      stripe_account_id: null,
    });

    prismaMock.child_user.findUnique.mockResolvedValueOnce({
      id: child_id,
      parent_id: parent_id,
      name: "Child",
      username: "child-user",
      password: "67890",
      avatar_img: null,
    });

    prismaMock.child_account.findUnique.mockResolvedValueOnce({
      id: "child-account-id",
      parent_id: parent_id,
      child_id: child_id,
      checking_balance: 1000,
      savings_balance: 2000,
      savings_goal: 10000,
    });

    prismaMock.child_account.update.mockResolvedValueOnce({
      id: "child-account-id",
      parent_id: parent_id,
      child_id: child_id,
      checking_balance: 900,
      savings_balance: 2000,
      savings_goal: 10000,
    });

    prismaMock.parent_account.update.mockResolvedValueOnce({
      id: "parent-account-id",
      parent_id: parent_id,
      balance: 5100,
      withholding_balance: 0,
      stripe_account_id: null,
    });

    await newChildToParentTransfer(child_id, parent_id, 100, "Test transfer");

    expect(prismaMock.child_account.update).toHaveBeenCalledWith({
      where: {
        id: "child-account-id",
      },
      data: {
        checking_balance: {
          decrement: 100,
        },
      },
    });

    expect(prismaMock.parent_account.update).toHaveBeenCalledWith({
      where: {
        id: "parent-account-id",
      },
      data: {
        balance: {
          increment: 100,
        },
      },
    });
  });
});