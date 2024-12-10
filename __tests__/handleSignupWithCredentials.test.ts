import { handleSignupWithCredentials } from '../lib/server-actions';
import { prismaMock } from '../__mock__/prisma';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

describe('handleSignupWithCredentials', () => {
  it('creates a new parent user and associated child users and accounts', async () => {
    const payload = {
      email: 'parent@example.com',
      password: 'parentPassword',
      name: 'Parent Name',
      startingBalance: '1000',
      children: [
        {
          childFirstName: 'Child',
          childLastName: 'One',
          username: 'child1',
          password: 'childPassword1',
          startingBalance: '500',
        },
      ],
    };

    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedChildPassword1');

    prismaMock.parent_user.create.mockResolvedValueOnce({
      id: 'parent-id',
      email: payload.email,
      name: payload.name,
      password: 'hashedPassword',
      avatar_img: null,
    });
    prismaMock.parent_account.create.mockResolvedValueOnce({
      id: 'parent-account-id',
      parent_id: 'parent-id',
      stripe_account_id: null,
      balance: 100000,
      withholding_balance: 0,
    });
    prismaMock.lessons_completed.create.mockResolvedValueOnce({
      id: 'lessons-id',
      parent_id: 'parent-id',
      financial_literacy: false,
      savings: false,
      taxes: false,
      loans: false,
      obligations: false,
    });
    prismaMock.child_user.create.mockResolvedValueOnce({
      id: 'child-id',
      parent_id: 'parent-id',
      name: 'Child One',
      username: 'child1',
      password: 'hashedChildPassword1',
      avatar_img: null,
    });
    prismaMock.child_account.create.mockResolvedValueOnce({
      id: 'child-account-id',
      child_id: 'child-id',
      parent_id: 'parent-id',
      checking_balance: 50000,
      savings_balance: 0,
      savings_goal: 0,
    });

    await handleSignupWithCredentials(payload);
    expect(prismaMock.parent_user.create).toHaveBeenCalledWith({
      data: {
        email: payload.email,
        password: 'hashedPassword',
        name: payload.name,
      },
    });

    expect(prismaMock.parent_account.create).toHaveBeenCalledWith({
      data: {
        parent_id: 'parent-id',
        balance: 100000,
        withholding_balance: 0,
      },
    });

    expect(prismaMock.lessons_completed.create).toHaveBeenCalledWith({
      data: {
        parent_id: 'parent-id',
        financial_literacy: false,
        savings: false,
        taxes: false,
        loans: false,
        obligations: false,
      },
    });

    expect(prismaMock.child_user.create).toHaveBeenCalledWith({
      data: {
        parent_id: 'parent-id',
        username: 'child1',
        name: 'Child One',
        password: 'hashedChildPassword1',
      },
    });

    expect(prismaMock.child_account.create).toHaveBeenCalledWith({
      data: {
        child_id: 'child-id',
        parent_id: 'parent-id',
        checking_balance: 50000,
        savings_balance: 0,
        savings_goal: 0,
      },
    });
  });

  it('handles errors gracefully', async () => {
    const payload = {
      email: 'parent@example.com',
      password: 'parentPassword',
      name: 'Parent Name',
      startingBalance: '1000',
      children: [
        {
          childFirstName: 'Child',
          childLastName: 'One',
          username: 'child1',
          password: 'childPassword1',
          startingBalance: '500',
        },
      ],
    };

    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedChildPassword1');
    prismaMock.parent_user.create.mockRejectedValueOnce(new Error('Database error'));

    await handleSignupWithCredentials(payload);
    expect(prismaMock.parent_account.create).not.toHaveBeenCalled();
    expect(prismaMock.child_user.create).not.toHaveBeenCalled();
  });
});