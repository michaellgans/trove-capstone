import { prismaMock } from '../__mock__/prisma';
import { getParentById } from '../lib/server-actions';

describe('Parent Service Tests', () => {
  it('should fetch parent details by ID', async () => {
    const mockParentData = {
        id: "cm4eniw0d000008kvblsvhkac",
        name: "Chris Stephens",
        email: "chrisstephens@test.com",
        password: expect.any(String),
        avatar_img: "/images/chris.png",
      };

    prismaMock.parent_user.findUnique.mockResolvedValueOnce(mockParentData);
    await expect(getParentById("cm4eniw0d000008kvblsvhkac")).resolves.toEqual(mockParentData);
    console.log('Mock calls:', prismaMock.parent_user.findUnique.mock.calls);
  });

  it('should throw an error if no parent data is found', async () => {
    const parent_id = 'non-existent-id';
    prismaMock.parent_user.findMany.mockResolvedValueOnce([]);
    await expect(getParentById(parent_id)).rejects.toThrow(Error);
  });

  it('should throw an error if fetching parent fails due to database error', async () => {
    const parent_id = 'test-parent-id';
    prismaMock.parent_user.findMany.mockRejectedValueOnce(new Error('Database error'));
    await expect(getParentById(parent_id)).rejects.toThrow('Unable to fetch parent');
  });
});
