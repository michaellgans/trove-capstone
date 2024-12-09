import { prismaMock } from '../__mock__/prisma';
import { newParentToChildTransfer } from '../lib/server-actions';

describe('newParentToChildTransfer', () => {
  const amount = 100;
  const withholdings = 10;
  const description = "Test transfer description";

  it('should throw an error if parent user or account is not found', async () => {
    const mockParentAccountData = [
      {
        id: "cm4eniw0d000008kvblsvhkac",
        parent_id: "cm4eniw0d000008kvblsvhkdb",
        stripe_account_id: "cm4eniw0d000008kvblsvhkop",
        balance: 10000,
        withholding_balance: 10000,
      },
    ];
    const mockChildAccountData = [
      {
        id: "cm4eniw0d000008kvblsvhkbd",
        child_id: "cm4eniw0d000008kvblsvhkaa",
        parent_id: "cm4eniw0d000008kvblsvhkac",
        checking_balance: 2000,
        savings_balance: 2000,
        savings_goal: 3000,
      },
    ];

    prismaMock.parent_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(null);

    await expect(newParentToChildTransfer(mockParentAccountData[0].parent_id, mockChildAccountData[0].child_id, amount))
      .rejects
      .toThrow("No parent user found");
  });

  it('should throw an error if child user or account is not found', async () => {
    const mockParentAccountData = [
      {
        id: "cm4eniw0d000008kvblsvhkac",
        parent_id: "cm4eniw0d000008kvblsvhkdb",
        stripe_account_id: "cm4eniw0d000008kvblsvhkop",
        balance: 10000,
        withholding_balance: 10000,
      },
    ];
  
    const mockChildAccountData = [
      {
        id: "cm4eniw0d000008kvblsvhkbd",
        child_id: "cm4eniw0d000008kvblsvhkaa",
        parent_id: "cm4eniw0d000008kvblsvhkac",
        checking_balance: 2000,
        savings_balance: 2000,
        savings_goal: 3000,
      },
    ];

    prismaMock.parent_user.findUnique.mockResolvedValueOnce({
      id: mockParentAccountData[0].parent_id,
      name: "Parent User",
      email: "parent@example.com",
      password: null,
      avatar_img: null,
    });
  
    prismaMock.parent_account.findUnique.mockResolvedValueOnce(mockParentAccountData[0]);
    prismaMock.child_user.findUnique.mockResolvedValueOnce(null);
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);

    await expect(newParentToChildTransfer(mockParentAccountData[0].parent_id, mockChildAccountData[0].child_id, amount))
      .rejects
      .toThrow("No child user found");
  });

  it("should process the transfer with withholdings correctly", async () => {
    const mockParentAccountData = {
      id: "cm4eniw0d000008kvblsvhkac",
      parent_id: "cm4eniw0d000008kvblsvhkdb",
      stripe_account_id: "cm4eniw0d000008kvblsvhkop",
      balance: 10000,
      withholding_balance: 10000,
    };

    const mockChildAccountData = {
      id: "cm4eniw0d000008kvblsvhkbd",
      child_id: "cm4eniw0d000008kvblsvhkaa",
      parent_id: "cm4eniw0d000008kvblsvhkac",
      checking_balance: 2000,
      savings_balance: 2000,
      savings_goal: 3000,
    };

    const mockParentUserData = {
      id: mockParentAccountData.parent_id,
      name: "Parent User",
      email: "parent@example.com",
      password: "parentpassword",
      avatar_img: null,
    };

    const mockChildUserData = {
      id: mockChildAccountData.child_id,
      parent_id: mockChildAccountData.parent_id,
      name: "Child User",
      password: "childpassword",
      avatar_img: null,
      username: "childuser",
    };

    jest.clearAllMocks();
    prismaMock.parent_account.findUnique.mockResolvedValue(mockParentAccountData);
    prismaMock.child_account.findUnique.mockResolvedValue(mockChildAccountData);
    prismaMock.parent_user.findUnique.mockResolvedValue(mockParentUserData);
    prismaMock.child_user.findUnique.mockResolvedValue(mockChildUserData);

    prismaMock.transaction.create.mockResolvedValue({
      id: "mock-transaction-id",
      timestamp: new Date(),
      type: "Deposit / Taxes",
      from_account_id: mockParentAccountData.id,
      from_name: mockParentUserData.name,
      to_account_id: mockChildAccountData.id,
      to_name: mockChildUserData.name,
      to_external_id: null,
      amount: amount - amount * (withholdings / 100),
      withholdings: amount * (withholdings / 100),
      description: description,
      p_account_id: mockParentAccountData.id,
    });

    prismaMock.parent_account.update.mockResolvedValue({
      ...mockParentAccountData,
      withholding_balance: mockParentAccountData.withholding_balance + amount * (withholdings / 100),
    });

    prismaMock.child_account.update.mockResolvedValue({
      ...mockChildAccountData,
      checking_balance: mockChildAccountData.checking_balance + (amount - amount * (withholdings / 100)),
    });

    await newParentToChildTransfer(
      mockParentUserData.id,
      mockChildUserData.id,
      amount,
      withholdings,
      description
    );

    const withholdingsAmount = amount * (withholdings / 100);
    const finalAmount = amount - withholdingsAmount;

    expect(prismaMock.transaction.create).toHaveBeenCalledWith({
      data: {
        type: "Deposit / Taxes",
        from_account_id: mockParentAccountData.id,
        from_name: mockParentUserData.name,
        to_account_id: mockChildAccountData.id,
        to_name: mockChildUserData.name,
        to_external_id: null,
        amount: finalAmount,
        withholdings: withholdingsAmount,
        description: description,
        p_account_id: mockParentAccountData.id,
      },
    });

    expect(prismaMock.parent_account.update).toHaveBeenCalledWith({
      where: {
        id: mockParentAccountData.id,
      },
      data: {
        withholding_balance: {
          increment: withholdingsAmount,
        },
      },
    });

    expect(prismaMock.child_account.update).toHaveBeenCalledWith({
      where: {
        id: mockChildAccountData.id,
      },
      data: {
        checking_balance: {
          increment: finalAmount,
        },
      },
    });
  });

  it("should process the transfer correctly when no withholdings are present", async () => {
    const mockParentAccountData = {
      id: "cm4eniw0d000008kvblsvhkac",
      parent_id: "cm4eniw0d000008kvblsvhkdb",
      stripe_account_id: "cm4eniw0d000008kvblsvhkop",
      balance: 10000,
      withholding_balance: 10000,
    };

    const mockChildAccountData = {
      id: "cm4eniw0d000008kvblsvhkbd",
      child_id: "cm4eniw0d000008kvblsvhkaa",
      parent_id: "cm4eniw0d000008kvblsvhkac",
      checking_balance: 2000,
      savings_balance: 2000,
      savings_goal: 3000,
    };

    const mockParentUserData = {
      id: mockParentAccountData.parent_id,
      name: "Parent User",
      email: "parent@example.com",
      password: "parentpassword",
      avatar_img: null,
    };

    const mockChildUserData = {
      id: mockChildAccountData.child_id,
      parent_id: mockChildAccountData.parent_id,
      name: "Child User",
      password: "childpassword",
      avatar_img: null,
      username: "childuser",
    };

    jest.clearAllMocks();
    prismaMock.parent_account.findUnique.mockResolvedValue(mockParentAccountData);
    prismaMock.child_account.findUnique.mockResolvedValue(mockChildAccountData);
    prismaMock.parent_user.findUnique.mockResolvedValue(mockParentUserData);
    prismaMock.child_user.findUnique.mockResolvedValue(mockChildUserData);

    prismaMock.transaction.create.mockResolvedValue({
      id: "mock-transaction-id",
      timestamp: new Date(),
      type: "Deposit",
      from_account_id: mockParentAccountData.id,
      from_name: mockParentUserData.name,
      to_account_id: mockChildAccountData.id,
      to_name: mockChildUserData.name,
      to_external_id: null,
      amount: amount,
      withholdings: 0,
      description: description,
      p_account_id: mockParentAccountData.id,
    });

    prismaMock.parent_account.update.mockResolvedValue({
      ...mockParentAccountData,
      balance: mockParentAccountData.balance - amount,
    });

    prismaMock.child_account.update.mockResolvedValue({
      ...mockChildAccountData,
      checking_balance: mockChildAccountData.checking_balance + amount,
    });

    await newParentToChildTransfer(
      mockParentUserData.id,
      mockChildUserData.id,
      amount,
      0,
      description
    );

    expect(prismaMock.transaction.create).toHaveBeenCalledWith({
      data: {
        type: "Deposit",
        from_account_id: mockParentAccountData.id,
        from_name: mockParentUserData.name,
        to_account_id: mockChildAccountData.id,
        to_name: mockChildUserData.name,
        to_external_id: null,
        amount: amount,
        withholdings: 0,
        description: description,
        p_account_id: mockParentAccountData.id,
      },
    });

    expect(prismaMock.parent_account.update).toHaveBeenCalledWith({
      where: {
        id: mockParentAccountData.id,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    expect(prismaMock.child_account.update).toHaveBeenCalledWith({
      where: {
        id: mockChildAccountData.id,
      },
      data: {
        checking_balance: {
          increment: amount,
        },
      },
    });
  });
});