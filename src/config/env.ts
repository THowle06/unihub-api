import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),

  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  DATABASE_URL: z.url().optional(),
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

const env = result.data;

if (env.NODE_ENV !== "test" && !env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required in non-test environments");
}

export { env };
