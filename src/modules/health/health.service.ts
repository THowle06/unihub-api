import prisma from "../../lib/prisma";

export const getHealth = () => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
};

export const getDatabaseHealth = async () => {
  await prisma.$queryRaw`SELECT 1`;

  return {
    status: "ok",
    database: "connected",
    timestamp: new Date().toISOString(),
  };
};
