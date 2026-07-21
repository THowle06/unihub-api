import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../src/app";
import { createAuthenticatedAgent } from "./helpers/auth";
import { protectedResponseSchema } from "../src/modules/auth/auth.types";

describe("Authentication Middleware", () => {
  it("rejects unauthenticated requests", async () => {
    const response = await request(app).get("/api/protected");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      error: "Unauthorized",
    });
  });

  it("allows authenticated requests", async () => {
    const { agent, email } = await createAuthenticatedAgent();

    const response = await agent.get("/api/protected");

    expect(response.status).toBe(200);

    const body = protectedResponseSchema.parse(response.body);

    expect(body.user.email).toBe(email);
  });
});
