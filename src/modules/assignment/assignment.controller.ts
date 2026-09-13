import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createAssignmentSchema } from "./assignment.types";
import * as assigmmentServive from "./assignment.service";

export async function createAssignment(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
    }

    const result = createAssignmentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid assignment data",
        errors: result.error.issues,
      });
    }

    const assignment = await assigmmentServive.createAssignment(req.user.id, result.data);

    if (!assignment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Module not found",
      });
    }

    return res.status(StatusCodes.CREATED).json(assignment);
  } catch (error) {
    console.error(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}
