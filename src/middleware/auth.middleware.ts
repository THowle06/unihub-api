import type { Request, Response, NextFunction } from "express";

import { auth } from "../modules/auth/auth";
import { StatusCodes } from "http-status-codes";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      headers.append(key, Array.isArray(value) ? value.join(",") : value);
    }
  }

  const session = await auth.api.getSession({
    headers,
  });

  if (!session) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized",
    });
  }

  req.user = session.user;
  req.authSession = session.session;

  next();
}
