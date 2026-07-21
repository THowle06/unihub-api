import type { User } from "better-auth";
import type { Session } from "better-auth";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      authSession?: Session;
    }
  }
}

export {};
