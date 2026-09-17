import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  assignmentResponseSchema,
  createAssignmentSchema,
  updateAssignmentSchema,
} from "./assignment.types";
import * as assigmmentServive from "./assignment.service";
import { ZodError } from "zod";

type AssignmentParams = {
  id: string;
};

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

export async function getAssignments(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
    }

    const assignments = await assigmmentServive.getAssignments(req.user.id);

    const response = assignments.map((assignment) =>
      assignmentResponseSchema.parse({
        ...assignment,
        dueDate: assignment.dueDate.toISOString(),
        createdAt: assignment.createdAt.toISOString(),
        updatedAt: assignment.updatedAt.toISOString(),
      }),
    );

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
}

export async function getAssignmentById(req: Request<AssignmentParams>, res: Response) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
    }

    const assignment = await assigmmentServive.getAssignmentById(req.user.id, req.params.id);

    if (!assignment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Assignment not found",
      });
    }

    const response = assignmentResponseSchema.parse({
      ...assignment,
      dueDate: assignment.dueDate.toISOString(),
      createdAt: assignment.createdAt.toISOString(),
      updatedAt: assignment.updatedAt.toISOString(),
    });

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
}

export async function updateAssignment(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
    }

    console.log("PATCH assignment ID:", req.params.id);
    console.log("PATCH user ID:", req.user.id);

    const body = updateAssignmentSchema.parse(req.body);

    const assignmentId = req.params.id;

    if (Array.isArray(assignmentId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid assignment ID",
      });
    }

    const assignment = await assigmmentServive.updateAssignment(req.user.id, assignmentId, body);

    if (!assignment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Assignment not found",
      });
    }

    const response = assignmentResponseSchema.parse({
      ...assignment,
      dueDate: assignment.dueDate.toISOString(),
      createdAt: assignment.createdAt.toISOString(),
      updatedAt: assignment.updatedAt.toISOString(),
    });

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Validation failed",
        errors: error.issues,
      });
    }

    console.error(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
}
