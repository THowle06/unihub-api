import request from "supertest";
import { describe, expect, it, vi } from "vitest";

import app from "../src/app";

import {
  apiHealthResponseSchema,
  databaseHealthErrorSchema,
  databaseHealthResponseSchema,
} from "../src/modules/health/health.types";

describe("Health API", () => {
  describe("GET /health", () => {
    it("returns API health status", async () => {
      const response = await request(app).get("/health");

      expect(response.status).toBe(200);

      const body = apiHealthResponseSchema.parse(response.body);

      expect(body.status).toBe("ok");
      expect(body.timestamp).toEqual(expect.any(String));
      expect(body.uptime).toBeGreaterThanOrEqual(0);
    });
  });

  describe("GET /health/database", () => {
    it("returns database connection status", async () => {
      const response = await request(app).get("/health/database");

      expect(response.status).toBe(200);

      const body = databaseHealthResponseSchema.parse(response.body);

      expect(body.status).toBe("ok");
      expect(body.database).toBe("connected");
      expect(body.timestamp).toEqual(expect.any(String));
    });

    it("returns 503 when database connection fails", async () => {
      vi.resetModules();

      vi.doMock("../src/lib/prisma", () => ({
        default: {
          $queryRaw: vi.fn().mockRejectedValue(new Error("Database unavailable")),
        },
      }));

      const { default: testApp } = await import("../src/app");

      const response = await request(testApp).get("/health/database");

      expect(response.status).toBe(503);

      const body = databaseHealthErrorSchema.parse(response.body);

      expect(body.status).toBe("error");
      expect(body.database).toBe("disconnected");
      expect(body.timestamp).toEqual(expect.any(String));
    });
  });
});
