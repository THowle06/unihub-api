import { z } from "zod";

export const healthResponseSchema = z.object({
  status: z.enum(["ok", "error"]),
  timestamp: z.string(),
});

export const apiHealthResponseSchema = healthResponseSchema.extend({
  status: z.literal("ok"),
  uptime: z.number(),
});

export const databaseHealthResponseSchema = healthResponseSchema.extend({
  database: z.enum(["connected", "disconnected"]),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export type ApiHealthResponse = z.infer<typeof apiHealthResponseSchema>;

export type DatabaseHealthResponse = z.infer<typeof databaseHealthResponseSchema>;
