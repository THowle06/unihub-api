import prisma from "../../lib/prisma";
import { ApiHealthResponse, DatabaseHealthResponse } from "./health.types";

export const getHealth = (): ApiHealthResponse => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
};

export const getDatabaseHealth = async (): Promise<DatabaseHealthResponse> => {
  await prisma.$queryRaw`SELECT 1`;

  return {
    status: "ok",
    database: "connected",
    timestamp: new Date().toISOString(),
  };
};
