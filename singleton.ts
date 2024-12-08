import { mockReset } from 'jest-mock-extended';
import { prisma } from './prisma';
import { prismaMock } from './__mock__/prisma';

jest.mock('./prisma', () => ({
  prisma: prismaMock,
}));

beforeEach(() => {
  mockReset(prismaMock);
});

afterEach(() => {
  jest.clearAllMocks();
});

// import { PrismaClient } from '@prisma/client';
// import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
// import prisma from './client';

// // Mock the Prisma client, ensuring that findUnique is mocked
// jest.mock('./client', () => ({
//   __esModule: true,
//   default: mockDeep<PrismaClient>(),
// }));

// export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

// // Reset mocks before each test
// beforeEach(() => {
//   mockReset(prismaMock);
// });
