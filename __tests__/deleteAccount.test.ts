import { prismaMock } from '../__mock__/prisma';
import { deleteAccount } from '../lib/server-actions';

describe('deleteAccount', () => {
  it('deletes a parent account successfully', async () => {
    const parent_id = 'parent-id';

    prismaMock.parent_user.delete.mockResolvedValueOnce({
      id: parent_id,
      name: 'Parent Name',
      email: 'parent@example.com',
      password: null,
      avatar_img: null,
    });

    await deleteAccount(parent_id);
    expect(prismaMock.parent_user.delete).toHaveBeenCalledWith({
      where: { id: parent_id },
    });
  });

  it('throws an error when deletion fails', async () => {
    const parent_id = 'parent-id';

    prismaMock.parent_user.delete.mockRejectedValueOnce(new Error('Database error'));
    await expect(deleteAccount(parent_id)).rejects.toThrowError('Failed to delete account');
    expect(prismaMock.parent_user.delete).toHaveBeenCalledWith({
      where: { id: parent_id },
    });
  });
});
