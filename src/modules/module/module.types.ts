import { z } from "zod";

export const createModuleSchema = z.object({
  moduleCode: z
    .string()
    .trim()
    .min(1)
    .max(20)
    .transform((value) => value.toUpperCase()),

  title: z.string().trim().min(1).max(100),

  semester: z.number().int().min(1).max(2),

  credits: z.number().int().positive(),
});

export const moduleResponseSchema = z.object({
  id: z.uuid(),

  userId: z.string(),

  moduleCode: z.string(),

  title: z.string(),

  semester: z.number(),

  credits: z.number(),

  createdAt: z.string(),

  updatedAt: z.string(),
});

export type CreateModuleRequest = z.infer<typeof createModuleSchema>;

export type ModuleResponse = z.infer<typeof moduleResponseSchema>;
