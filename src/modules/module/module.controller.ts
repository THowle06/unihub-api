import type { Request, Response } from "express";
import { ZodError } from "zod";

import * as moduleService from "./module.service";
import { createModuleSchema, moduleResponseSchema } from "./module.types";
import { StatusCodes } from "http-status-codes";

type ModuleParams = {
  id: string;
};

export async function createModule(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
    }

    const body = createModuleSchema.parse(req.body);

    const module = await moduleService.createModule(req.user.id, body);

    const response = moduleResponseSchema.parse({
      ...module,
      createdAt: module.createdAt.toISOString(),
      updatedAt: module.updatedAt.toISOString(),
    });

    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Validation failed",
        errors: error.issues,
      });
    }

    if (error instanceof Error && error.message === "Module already exists") {
      return res.status(StatusCodes.CONFLICT).json({
        message: error.message,
      });
    }

    console.error(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}

export async function getModules(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
    }

    const modules = await moduleService.getModules(req.user.id);

    const response = modules.map((module) =>
      moduleResponseSchema.parse({
        ...module,
        createdAt: module.createdAt.toISOString(),
        updatedAt: module.updatedAt.toISOString(),
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

export async function getModuleById(req: Request<ModuleParams>, res: Response) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
    }

    const module = await moduleService.getModuleById(req.user.id, req.params.id);

    if (!module) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Module not found",
      });
    }

    const response = moduleResponseSchema.parse({
      ...module,
      createdAt: module.createdAt.toISOString(),
      updatedAt: module.updatedAt.toISOString(),
    });

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
}
