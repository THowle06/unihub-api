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

  describe("GET /api/assignments", () => {
    it("returns the user's assignments", async () => {
      const { agent } = await createAuthenticatedAgent();

      const moduleResponse = await agent.post("/api/modules").send({
        moduleCode: "COMP3012",
        title: "Operating Systems",
        semester: 1,
        credits: 20,
      });

      expect(moduleResponse.status).toBe(201);

      const moduleId = moduleResponseSchema.parse(moduleResponse.body).id;

      const assignmentResponse = await agent.post("/api/assignments").send({
        moduleId,
        title: "Coursework 1",
        dueDate: "2026-12-01T12:00:00.000Z",
        weighting: 30,
        status: "NOT_STARTED",
      });

      expect(assignmentResponse.status).toBe(201);

      const response = await agent.get("/api/assignments");

      expect(response.status).toBe(200);

      const body = assignmentResponseSchema.array().parse(response.body);

      expect(body).toHaveLength(1);
      expect(body[0].title).toBe("Coursework 1");
      expect(body[0].moduleId).toBe(moduleId);
    });

    it("does not return assignments belonging to another user", async () => {
      const { agent: ownerAgent } = await createAuthenticatedAgent();
      const { agent: otherAgent } = await createAuthenticatedAgent();

      const moduleResponse = await ownerAgent.post("/api/modules").send({
        moduleCode: "COMP3014",
        title: "Algorithms",
        semester: 1,
        credits: 20,
      });

      expect(moduleResponse.status).toBe(201);

      const moduleId = moduleResponseSchema.parse(moduleResponse.body).id;

      const assignmentResponse = await ownerAgent.post("/api/assignments").send({
        moduleId,
        title: "Private Asssignment",
        dueDate: "2026-12-20T12:00:00.000Z",
        weighting: 20,
        status: "NOT_STARTED",
      });

      expect(assignmentResponse.status).toBe(201);

      const response = await otherAgent.get("/api/assignments");

      expect(response.status).toBe(200);

      const body = assignmentResponseSchema.array().parse(response.body);

      expect(body).toHaveLength(0);
    });

    it("rejects unauthenticated requests", async () => {
      const response = await request(app).get("/api/assignments");

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/assignments/:id", () => {
    it("returns an assignment by ID", async () => {
      const { agent } = await createAuthenticatedAgent();

      const moduleResponse = await agent.post("/api/modules").send({
        moduleCode: "COMP3013",
        title: "Computer Networks",
        semester: 1,
        credits: 20,
      });

      expect(moduleResponse.status).toBe(201);

      const moduleId = moduleResponseSchema.parse(moduleResponse.body).id;

      const assignmentResponse = await agent.post("/api/assignments").send({
        moduleId,
        title: "Network Design",
        dueDate: "2026-12-15T12:00:00.000Z",
        weighting: 40,
        status: "IN_PROGRESS",
      });

      expect(assignmentResponse.status).toBe(201);

      const assignmentId = assignmentResponseSchema.parse(assignmentResponse.body).id;

      const response = await agent.get(`/api/assignments/${assignmentId}`);

      expect(response.status).toBe(200);

      const body = assignmentResponseSchema.parse(response.body);

      expect(body.id).toBe(assignmentId);
      expect(body.moduleId).toBe(moduleId);
      expect(body.title).toBe("Network Design");
      expect(body.status).toBe("IN_PROGRESS");
    });

    it("returns 404 when the assignment does not exist", async () => {
      const { agent } = await createAuthenticatedAgent();

      const response = await agent.get("/api/assignments/00000000-0000-0000-0000-000000000000");

      expect(response.status).toBe(404);
    });
  });

  describe("PATCH /api/assignments/:id", () => {
    it("updates an assignment successfully", async () => {
      const { agent } = await createAuthenticatedAgent();

      const moduleResponse = await agent.post("/api/modules").send({
        moduleCode: "COMP3015",
        title: "Software Architecture",
        semester: 1,
        credits: 20,
      });

      expect(moduleResponse.status).toBe(201);

      const moduleId = moduleResponseSchema.parse(moduleResponse.body).id;

      const assignmentResponse = await agent.post("/api/assignments").send({
        moduleId,
        title: "Initial Coursework",
        dueDate: "2026-12-01T12:00:00.000Z",
        weighting: 30,
        status: "NOT_STARTED",
      });

      expect(assignmentResponse.status).toBe(201);

      const assignmentId = assignmentResponseSchema.parse(assignmentResponse.body).id;

      const response = await agent.patch(`/api/assignments/${assignmentId}`).send({
        title: "Updated Coursework",
        weighting: 40,
        status: "IN_PROGRESS",
      });

      console.log("PATCH response:", JSON.stringify(response.body, null, 2));

      expect(response.status).toBe(200);

      const body = assignmentResponseSchema.parse(response.body);

      expect(body.id).toBe(assignmentId);
      expect(body.moduleId).toBe(moduleId);
      expect(body.title).toBe("Updated Coursework");
      expect(body.weighting).toBe(40);
      expect(body.status).toBe("IN_PROGRESS");
    });

    it("allows partial updates", async () => {
      const { agent } = await createAuthenticatedAgent();

      const moduleResponse = await agent.post("/api/modules").send({
        moduleCode: "COMP3016",
        title: "Databases",
        semester: 1,
        credits: 20,
      });

      expect(moduleResponse.status).toBe(201);

      const moduleId = moduleResponseSchema.parse(moduleResponse.body).id;

      const assignmentResponse = await agent.post("/api/assignments").send({
        moduleId,
        title: "Database Coursework",
        dueDate: "2026-12-10T12:00:00.000Z",
        weighting: 25,
        status: "NOT_STARTED",
      });

      expect(assignmentResponse.status).toBe(201);

      const assignmentId = assignmentResponseSchema.parse(assignmentResponse.body).id;

      const response = await agent.patch(`/api/assignments/${assignmentId}`).send({
        status: "COMPLETED",
      });

      expect(response.status).toBe(200);

      const body = assignmentResponseSchema.parse(response.body);

      expect(body.title).toBe("Database Coursework");
      expect(body.weighting).toBe(25);
      expect(body.status).toBe("COMPLETED");
    });

    it("prevents users from updating another user's assignment", async () => {
      const { agent: ownerAgent } = await createAuthenticatedAgent();
      const { agent: otherAgent } = await createAuthenticatedAgent();

      const moduleResponse = await ownerAgent.post("/api/modules").send({
        moduleCode: "COMP3017",
        title: "Algorithms",
        semester: 1,
        credits: 20,
      });

      expect(moduleResponse.status).toBe(201);

      const moduleId = moduleResponseSchema.parse(moduleResponse.body).id;

      const assignmentResponse = await ownerAgent.post("/api/assignments").send({
        moduleId,
        title: "Private Assignment",
        dueDate: "2026-12-15T12:00:00.000Z",
        weighting: 30,
        status: "NOT_STARTED",
      });

      expect(assignmentResponse.status).toBe(201);

      const assignmentId = assignmentResponseSchema.parse(assignmentResponse.body).id;

      const response = await otherAgent.patch(`/api/assignments/${assignmentId}`).send({
        title: "Unauthorized Update",
      });

      expect(response.status).toBe(404);
    });

    it("returns 404 when the assignment does not exist", async () => {
      const { agent } = await createAuthenticatedAgent();

      const response = await agent
        .patch("/api/assignments/00000000-0000-0000-0000-000000000000/")
        .send({
          title: "Updated Assignment",
        });

      expect(response.status).toBe(404);
    });

    it("rejects unauthenticated requests", async () => {
      const response = await request(app)
        .patch("/api/assignments/00000000-0000-0000-0000-000000000000")
        .send({
          title: "Unauthorized Update",
        });

      expect(response.status).toBe(401);
    });
  });
});
