import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as healthService from "./health.service";

export const getHealth = (req: Request, res: Response) => {
  const health = healthService.getHealth();

  res.status(StatusCodes.OK).json(health);
};

export const getDatabaseHealth = async (req: Request, res: Response) => {
  try {
    const health = await healthService.getDatabaseHealth();

    res.status(StatusCodes.OK).json(health);
  } catch {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      status: "error",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
};
