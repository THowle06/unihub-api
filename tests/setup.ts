import { beforeAll, afterAll } from "vitest";

import prisma from "../src/lib/prisma";

async function cleanDatabase() {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Database cleanup only allowed during tests");
  }

  console.log("Cleaning test database...");

  await prisma.module.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.user.deleteMany();

  console.log("Test database cleaned");
}

beforeAll(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await cleanDatabase();

  await prisma.$disconnect();
});
