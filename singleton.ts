// for testing
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
