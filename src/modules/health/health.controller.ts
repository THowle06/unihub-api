import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getHealth = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
