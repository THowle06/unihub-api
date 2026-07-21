import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../src/app";
import prisma from "../src/lib/prisma";

import {
  signUpResponseSchema,
  signInResponseSchema,
  sessionResponseSchema,
} from "../src/modules/auth/auth.types";

import { createAuthenticatedAgent, createTestUser } from "./helpers/auth";

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

  describe("POST /api/auth/sign-in/email", () => {
    it("logs in an existing user successfully", async () => {
      const user = await createTestUser();

      const response = await request(app).post("/api/auth/sign-in/email").send({
        email: user.email,
        password: user.password,
      });

      expect(response.status).toBe(200);

      const body = signInResponseSchema.parse(response.body);

      expect(body.user).toMatchObject({
        name: user.name,
        email: user.email,
        emailVerified: false,
      });

      expect(body.token).toEqual(expect.any(String));

      expect(response.headers["set-cookie"]).toBeDefined();

      const session = await prisma.session.findFirst({
        where: {
          user: {
            email: user.email,
          },
        },
      });

      expect(session).not.toBeNull();
    });

    it("rejects invalid passwords", async () => {
      const user = await createTestUser();

      const response = await request(app).post("/api/auth/sign-in/email").send({
        email: user.email,
        password: "WrongPassword123!",
      });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it("rejects unknown users", async () => {
      const response = await request(app).post("/api/auth/sign-in/email").send({
        email: "unknown@example.com",
        password: "Password123!",
      });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe("POST /api/auth/sign-out", () => {
    it("logs out an authenticated user successfully", async () => {
      const { agent } = await createAuthenticatedAgent();

      const response = await agent.post("/api/auth/sign-out");

      expect(response.status).toBe(200);

      const cookies = response.headers["set-cookie"];

      expect(Array.isArray(cookies)).toBe(true);

      if (!Array.isArray(cookies)) {
        throw new Error("Expected 'set-cookie' header to be an array.");
      }

      expect(cookies).toHaveLength(3);

      expect(cookies[0]).toContain("better-auth.session_token=");
      expect(cookies[0]).toContain("Max-Age=0");

      expect(cookies[1]).toContain("better-auth.session_data=");
      expect(cookies[1]).toContain("Max-Age=0");

      expect(cookies[2]).toContain("better-auth.dont_remember=");
      expect(cookies[2]).toContain("Max-Age=0");

      const sessionResponse = await agent.get("/api/auth/get-session");

      expect(sessionResponse.status).toBe(200);
      expect(sessionResponse.body).toBeNull();
    });

    it("returns success when no authenticated session exists", async () => {
      const response = await request(app).post("/api/auth/sign-out");

      expect(response.status).toBe(200);

      const cookies = response.headers["set-cookie"];

      expect(Array.isArray(cookies)).toBe(true);

      if (!Array.isArray(cookies)) {
        throw new Error("Expected 'set-cookie' header to be an array.");
      }

      expect(cookies).toHaveLength(3);

      expect(cookies[0]).toContain("better-auth.session_token=");
      expect(cookies[0]).toContain("Max-Age=0");

      expect(cookies[1]).toContain("better-auth.session_data=");
      expect(cookies[1]).toContain("Max-Age=0");

      expect(cookies[2]).toContain("better-auth.dont_remember=");
      expect(cookies[2]).toContain("Max-Age=0");
    });
  });

  describe("GET /api/auth/get-session", () => {
    it("returns the authenticated user's session", async () => {
      const { agent, email, name } = await createAuthenticatedAgent();

      const response = await agent.get("/api/auth/get-session");

      expect(response.status).toBe(200);

      const body = sessionResponseSchema.parse(response.body);

      expect(body.user).toMatchObject({
        email,
        name,
      });

      expect(body.session.id).toEqual(expect.any(String));
      expect(body.session.expiresAt).toEqual(expect.any(String));
    });

    it("rejects unauthenticated requests", async () => {
      const response = await request(app).get("/api/auth/get-session");

      expect(response.status).toBe(200);
      expect(response.body).toBeNull();
    });
  });
});
