import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../src/app";
import prisma from "../src/lib/prisma";
import { moduleResponseSchema } from "../src/modules/module/module.types";
import { createAuthenticatedAgent } from "./helpers/auth";
// import { clearDatabase } from "./helpers/database";

describe("Module API", () => {
  // afterEach(async () => {
  //   await clearDatabase();
  // });

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
});
