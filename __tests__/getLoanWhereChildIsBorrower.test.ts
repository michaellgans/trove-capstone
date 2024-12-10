import { prismaMock } from "../__mock__/prisma";
import { getLoanWhereChildIsBorrower } from "../lib/server-actions";

describe("getLoanWhereChildIsBorrower", () => {
  const mockChildId = "child-id";
  const mockChildAccount = {
    id: "child-account-id",
    child_id: mockChildId,
    parent_id: "parent-id",
    checking_balance: 500,
    savings_balance: 1000,
    savings_goal: 2000,
  };
  const mockLoan = {
    id: "loan-id",
    p_account_id: "p-id",
    lender_id: "lender_id",
    borrower_id: mockChildAccount.id,
    loan_amount: 1000,
    interest_rate: 5,
    current_balance: 500,
    due_date: new Date("2024-11-15T12:00:00Z"),
  };

  it("should return the loan if child account and loan exist", async () => {
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockChildAccount);
    prismaMock.loan.findMany.mockResolvedValueOnce([mockLoan]);
    await expect(getLoanWhereChildIsBorrower(mockChildId)).resolves.toEqual(mockLoan);

    expect(prismaMock.child_account.findUnique).toHaveBeenCalledWith({
      where: { child_id: mockChildId },
    });

    expect(prismaMock.loan.findMany).toHaveBeenCalledWith({
      where: { borrower_id: mockChildAccount.id },
    });
  });

  it("should throw an error if no child account is found", async () => {
    prismaMock.child_account.findUnique.mockResolvedValueOnce(null);
    await expect(getLoanWhereChildIsBorrower(mockChildId)).rejects.toThrow("Unable to fetch loan");

    expect(prismaMock.child_account.findUnique).toHaveBeenCalledWith({
      where: { child_id: mockChildId },
    });

    expect(prismaMock.loan.findMany).not.toHaveBeenCalled();
  });

  it("should throw an error if no loan is found", async () => {
    prismaMock.child_account.findUnique.mockResolvedValueOnce(mockChildAccount);
    prismaMock.loan.findMany.mockResolvedValueOnce([]);
    await expect(getLoanWhereChildIsBorrower(mockChildId)).rejects.toThrow("Unable to fetch loan");

    expect(prismaMock.child_account.findUnique).toHaveBeenCalledWith({
      where: { child_id: mockChildId },
    });

    expect(prismaMock.loan.findMany).toHaveBeenCalledWith({
      where: { borrower_id: mockChildAccount.id },
    });
  });
});
