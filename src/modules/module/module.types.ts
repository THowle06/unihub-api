import { z } from "zod";

export const createModuleSchema = z.object({
  moduleCode: z
    .string()
    .trim()
    .min(1, "Module code is required")
    .max(20, "Module code must not exceed 20 characters")
    .transform((value) => value.toUpperCase()),

  title: z
    .string()
    .trim()
    .min(1, "Module title is required")
    .max(100, "Module title must not exceed 100 characters"),

  semester: z
    .int("Semsester must be an integer")
    .min(1, "Semester must be at least 1")
    .max(2, "Semester must be at most 2"),

  credits: z.int("Credits must be an integer").positive("Credits must be greater than 0"),
});

export const moduleResponseSchema = z.object({
  id: z.uuid(),

  userId: z.string(),

  moduleCode: z.string(),

  title: z.string(),

  semester: z.number(),

  credits: z.number(),

  createdAt: z.iso.datetime(),

  updatedAt: z.iso.datetime(),
});

export const moduleListResponseSchema = z.array(moduleResponseSchema);

export type CreateModuleRequest = z.infer<typeof createModuleSchema>;

export type ModuleResponse = z.infer<typeof moduleResponseSchema>;

export type ModuleListResponse = z.infer<typeof moduleListResponseSchema>;
