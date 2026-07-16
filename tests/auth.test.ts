import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../src/app";
import prisma from "../src/lib/prisma";
import { signUpResponseSchema } from "../src/modules/auth/auth.types";

describe("Authentication API", () => {
  describe("POST /api/auth/sign-up/email", () => {
    it("registers a new user successfully", async () => {
      const email = `test-${Date.now()}@example.com`;

      const response = await request(app).post("/api/auth/sign-up/email").send({
        name: "Test User",
        email,
        password: "Password123",
      });

      expect(response.status).toBe(200);

      const body = signUpResponseSchema.parse(response.body);

      expect(body.user).toMatchObject({
        name: "Test User",
        email,
        emailVerified: false,
      });

      expect(body.token).toEqual(expect.any(String));

      expect(response.headers["set-cookie"]).toBeDefined();

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      expect(user).not.toBeNull();
      expect(user?.email).toBe(email);
      expect(user?.name).toBe("Test User");
    });

    it("rejects duplicate email addresses", async () => {
      const email = `duplicate-${Date.now()}@example.com`;

      await request(app).post("/api/auth/sign-up/email").send({
        name: "Test User",
        email,
        password: "Password123!",
      });

      const response = await request(app).post("/api/auth/sign-up/email").send({
        name: "Test User",
        email,
        password: "Password123!",
      });

      expect(response.status).not.toBe(200);
    });

    it("rejects a missing password", async () => {
      const response = await request(app)
        .post("/api/auth/sign-up/email")
        .send({
          name: "Test User",
          email: `missing-${Date.now()}@example.com`,
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it("rejects a missing name", async () => {
      const response = await request(app)
        .post("/api/auth/sign-up/email")
        .send({
          email: `missing-name-${Date.now()}@example.com`,
          password: "Password123!",
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });
});
