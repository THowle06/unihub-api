import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),

  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  DATABASE_URL: z.string().startsWith("postgresql://", {
    message: "DATABASE_URL must be a valid PostgreSQL connection URL.",
  }),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const issues = result.error.issues
    .map((issue) => {
      return `- ${issue.path.join(".")}: ${issue.message}`;
    })
    .join("\n");

  throw new Error(`Invalid environment configuration:\n\n${issues}\n`);
}

export const env = result.data;
