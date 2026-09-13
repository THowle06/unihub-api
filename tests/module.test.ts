import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../src/app";
import prisma from "../src/lib/prisma";
import { moduleListResponseSchema, moduleResponseSchema } from "../src/modules/module/module.types";
import { createAuthenticatedAgent } from "./helpers/auth";

describe("Module API", () => {
  describe("POST /api/modules", () => {
    it("creates a module successfully", async () => {
      const { agent } = await createAuthenticatedAgent();

      const response = await agent.post("/api/modules").send({
        moduleCode: "COMP3010",
        title: "Software Engineering",
        semester: 1,
        credits: 20,
      });

      expect(response.status).toBe(201);

      const body = moduleResponseSchema.parse(response.body);

      expect(body.moduleCode).toBe("COMP3010");
      expect(body.title).toBe("Software Engineering");
      expect(body.semester).toBe(1);
      expect(body.credits).toBe(20);

      const module = await prisma.module.findUnique({
        where: {
          userId_moduleCode: {
            userId: body.userId,
            moduleCode: "COMP3010",
          },
        },
      });

      expect(module).not.toBeNull();
    });

    it("rejects duplicate module codes for the same user", async () => {
      const { agent } = await createAuthenticatedAgent();

      const module = {
        moduleCode: "COMP3010",
        title: "Software Engineering",
        semester: 1,
        credits: 20,
      };

      const firstResponse = await agent.post("/api/modules").send(module);

      expect(firstResponse.status).toBe(201);

      const secondResponse = await agent.post("/api/modules").send(module);

      expect(secondResponse.status).toBe(409);
    });

    it("rejects invalid module data", async () => {
      const { agent } = await createAuthenticatedAgent();

      const response = await agent.post("/api/modules").send({
        moduleCode: "COMP3010",
        semester: 1,
        credits: 20,
      });

      expect(response.status).toBe(400);
    });

    it("rejects unauthenticated requests", async () => {
      const response = await request(app).post("/api/modules").send({
        moduleCode: "COMP3010",
        title: "Software Engineering",
        semester: 1,
        credits: 20,
      });

      expect(response.status).toBe(401);
    });

    it("allows different users to create the same module code", async () => {
      const { agent: firstUser } = await createAuthenticatedAgent();
      const { agent: secondUser } = await createAuthenticatedAgent();

      const module = {
        moduleCode: "COMP3010",
        title: "Software Engineering",
        semester: 1,
        credits: 20,
      };

      const firstResponse = await firstUser.post("/api/modules").send(module);

      const secondResponse = await secondUser.post("/api/modules").send(module);

      expect(firstResponse.status).toBe(201);
      expect(secondResponse.status).toBe(201);
    });
  });

  describe("GET /api/modules", () => {
    it("returns all modules for the authenticated user", async () => {
      const { agent } = await createAuthenticatedAgent();

      await agent.post("/api/modules").send({
        moduleCode: "COMP3010",
        title: "Software Engineering",
        semester: 1,
        credits: 20,
      });

      await agent.post("/api/modules").send({
        moduleCode: "COMP3020",
        title: "Distributed Systems",
        semester: 2,
        credits: 20,
      });

      const response = await agent.get("/api/modules");

      expect(response.status).toBe(200);

      const modules = moduleListResponseSchema.parse(response.body);

      expect(modules).toHaveLength(2);

      expect(modules[0].userId).toBe(modules[1].userId);

      expect(modules.map((m) => m.moduleCode)).toEqual(
        expect.arrayContaining(["COMP3010", "COMP3020"]),
      );

      expect(modules.map((m) => m.title)).toEqual(
        expect.arrayContaining(["Software Engineering", "Distributed Systems"]),
      );
    });
  });

  describe("GET /api/modules/:id", () => {
    it("returns a module by id", async () => {
      const { agent } = await createAuthenticatedAgent();

      const createResponse = await agent.post("/api/modules").send({
        moduleCode: "COMP3010",
        title: "Software Engineering",
        semester: 1,
        credits: 20,
      });

      expect(createResponse.status).toBe(201);

      const createdModule = moduleResponseSchema.parse(createResponse.body);

      const response = await agent.get(`/api/modules/${createdModule.id}`);

      expect(response.status).toBe(200);

      const module = moduleResponseSchema.parse(response.body);

      expect(module.id).toBe(createdModule.id);
      expect(module.moduleCode).toBe("COMP3010");
      expect(module.title).toBe("Software Engineering");
    });

    it("returns 404 for an unknown module", async () => {
      const { agent } = await createAuthenticatedAgent();

      const response = await agent.get("/api/modules/00000000-0000-0000-0000-000000000000");

      expect(response.status).toBe(404);
    });

    it("does not allow access to another user's module", async () => {
      const { agent: firstUser } = await createAuthenticatedAgent();
      const { agent: secondUser } = await createAuthenticatedAgent();

      const createResponse = await firstUser.post("/api/modules").send({
        moduleCode: "COMP3010",
        title: "Software Engineering",
        semester: 1,
        credits: 20,
      });

      expect(createResponse.status).toBe(201);

      const createdModule = moduleResponseSchema.parse(createResponse.body);

      const response = await secondUser.get(`/api/modules/${createdModule.id}`);

      expect(response.status).toBe(404);
    });

    it("rejects unauthenticated requests", async () => {
      const response = await request(app).get("/api/modules/00000000-0000-0000-0000-000000000000");

      expect(response.status).toBe(401);
    });
  });

  describe("PATCH /api/modules/:id", () => {
    it("updates a module successfully", async () => {
      const { agent } = await createAuthenticatedAgent();

      const createResponse = await agent.post("/api/modules").send({
        moduleCode: "COMP3010",
        title: "Software Engineering",
        semester: 1,
        credits: 20,
      });

      const createdModule = moduleResponseSchema.parse(createResponse.body);

      const response = await agent.patch(`/api/modules/${createdModule.id}`).send({
        title: "Advanced Software Engineering",
        credits: 30,
      });

      expect(response.status).toBe(200);

      const updatedModule = moduleResponseSchema.parse(response.body);

      expect(updatedModule.id).toBe(createdModule.id);
      expect(updatedModule.moduleCode).toBe("COMP3010");
      expect(updatedModule.title).toBe("Advanced Software Engineering");
      expect(updatedModule.credits).toBe(30);
    });

    it("rejects invalid module updates", async () => {
      const { agent } = await createAuthenticatedAgent();

      const createResponse = await agent.post("/api/modules").send({
        moduleCode: "COMP3010",
        title: "Software Engineering",
        semester: 1,
        credits: 20,
      });

      const createdModule = moduleResponseSchema.parse(createResponse.body);

      const response = await agent.patch(`/api/modules/${createdModule.id}`).send({ credits: -10 });

      expect(response.status).toBe(400);
    });

    it("prevents users updating another user's module", async () => {
      const { agent: firstUser } = await createAuthenticatedAgent();
      const { agent: secondUser } = await createAuthenticatedAgent();

      const createResponse = await firstUser.post("/api/modules").send({
        moduleCode: "COMP3010",
        title: "Software Engineering",
        semester: 1,
        credits: 20,
      });

      const module = moduleResponseSchema.parse(createResponse.body);

      const response = await secondUser.patch(`/api/modules/${module.id}`).send({
        title: "Modified By Another User",
      });

      expect(response.status).toBe(404);
    });

    it("returns 404 when updating a non-existent module", async () => {
      const { agent } = await createAuthenticatedAgent();

      const response = await agent.patch("/api/modules/00000000-0000-0000-0000-000000000000").send({
        title: "Does Not Exist",
      });

      expect(response.status).toBe(404);
    });

    it("rejects unauthenticated requests", async () => {
      const response = await request(app).patch("/api/modules/some-id").send({
        title: "Updated Title",
      });

      expect(response.status).toBe(401);
    });
  });
});
