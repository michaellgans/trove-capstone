import { prismaMock } from '../__mock__/prisma';
import { getChildrenByParent } from '../lib/server-actions';

describe('Children Service Tests', () => {
  it('should fetch child details by ID', async () => {
    const mockChildData = [
      {
        id: "cm4eniw0d000008kvblsvhkbd",
        parent_id: "cm4eniw0d000008kvblsvhkac",
        name: "James Garfield",
        username: "Garfield_the_Cat",
        password: expect.any(String),
        avatar_img: "/images/james.png",
      }
    ];

    prismaMock.child_user.findMany.mockResolvedValueOnce(mockChildData);
    await expect(getChildrenByParent("cm4eniw0d000008kvblsvhkac")).resolves.toEqual(mockChildData);
    console.log('Mock calls:', prismaMock.child_user.findMany.mock.calls);
  });

  it('should throw an error if no child data is found', async () => {
    const parent_id = 'non-existent-id';
    prismaMock.child_user.findMany.mockResolvedValueOnce([]);
    await expect(getChildrenByParent(parent_id)).rejects.toThrow(Error);
  });

  it('should throw an error if fetching child fails due to database error', async () => {
    const parent_id = 'test-parent-id';
    prismaMock.child_user.findMany.mockRejectedValueOnce(new Error('Database error'));
    await expect(getChildrenByParent(parent_id)).rejects.toThrow('Unable to fetch children');
  });
});
