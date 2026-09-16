import { describe, expect, it } from "vitest";

import request from "supertest";
import app from "../src/app";
import { assignmentResponseSchema } from "../src/modules/assignment/assignment.types";
import { moduleResponseSchema } from "../src/modules/module/module.types";
import { createAuthenticatedAgent } from "./helpers/auth";

describe("Assignment API", () => {
  describe("POST /api/assignments", () => {
    it("creates an assignment successfully", async () => {
      const { agent } = await createAuthenticatedAgent();

      const moduleResponse = await agent.post("/api/modules").send({
        moduleCode: "COMP3010",
        title: "Software Engineering",
        semester: 1,
        credits: 20,
      });

      expect(moduleResponse.status).toBe(201);

      const moduleId = moduleResponseSchema.parse(moduleResponse.body).id;

      const response = await agent.post("/api/assignments").send({
        moduleId,
        title: "Coursework 1",
        description: "First coursework assignment",
        dueDate: "2026-01-01T12:00:00.000Z",
        weighting: 30,
        status: "NOT_STARTED",
      });

      expect(response.status).toBe(201);

      const body = assignmentResponseSchema.parse(response.body);

      expect(body.moduleId).toBe(moduleId);
      expect(body.title).toBe("Coursework 1");
      expect(body.description).toBe("First coursework assignment");
      expect(body.weighting).toBe(30);
      expect(body.status).toBe("NOT_STARTED");
    });

    it("rejects invalid assignment data", async () => {
      const { agent } = await createAuthenticatedAgent();

      const response = await agent.post("/api/assignments").send({
        moduleId: "not-a-uuid",
        title: "",
        dueDate: "not-a-date",
        weighting: 150,
        status: "INVALID_STATUS",
      });

      expect(response.status).toBe(400);
    });

    it("prevents users from creating an assignment in another user's module", async () => {
      const { agent: ownerAgent } = await createAuthenticatedAgent();
      const { agent: otherAgent } = await createAuthenticatedAgent();

      const moduleResponse = await ownerAgent.post("/api/modules").send({
        moduleCode: "COMP3011",
        title: "Databases",
        semester: 1,
        credits: 20,
      });

      expect(moduleResponse.status).toBe(201);

      const moduleId = moduleResponseSchema.parse(moduleResponse.body).id;

      const response = await otherAgent.post("/api/assignments").send({
        moduleId,
        title: "Unauthorized Assignment",
        dueDate: "2026-12-01T12:00:00.000Z",
        weighting: 30,
        status: "NOT_STARTED",
      });

      expect(response.status).toBe(404);
    });

    it("returns 404 when the module does not exist", async () => {
      const { agent } = await createAuthenticatedAgent();

      const response = await agent.post("/api/assignments").send({
        moduleId: "00000000-0000-0000-0000-000000000000",
        title: "Missing Module Assignment",
        dueDate: "2026-12-01T12:00:00Z",
        weighting: 30,
        status: "NOT_STARTED",
      });

      expect(response.status).toBe(404);
    });

    it("rejects unauthenticated requests", async () => {
      const response = await request(app).post("/api/assignments").send({
        moduleId: "00000000-0000-0000-0000-000000000000",
        title: "Unauthenticated Assignment",
        dueDate: "2026-12-01T12:00:00.000Z",
        weighting: 30,
        status: "NOT_STARTED",
      });

      expect(response.status).toBe(401);
    });
  });
});
