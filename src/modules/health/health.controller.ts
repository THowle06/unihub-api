import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../../lib/prisma";

export const getHealth = async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(StatusCodes.OK).json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
};
