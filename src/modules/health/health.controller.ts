import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../../lib/prisma";

export const getHealth = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};

export const getDatabaseHealth = async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(StatusCodes.OK).json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      status: "error",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
};
