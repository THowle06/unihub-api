import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../src/app";

import {
  apiHealthResponseSchema,
  databaseHealthResponseSchema,
} from "../src/modules/health/health.types";

describe("Health API", () => {
  describe("GET /health", () => {
    it("returns API health status", async () => {
      const response = await request(app).get("/health");

      expect(response.status).toBe(200);

      const body = apiHealthResponseSchema.parse(response.body);

      expect(body.status).toBe("ok");
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
    });
  });
});
