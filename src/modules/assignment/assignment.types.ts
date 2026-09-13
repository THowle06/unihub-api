import { z } from "zod";

export const createAssignmentSchema = z.object({
  moduleId: z.uuid(),
  title: z
    .string()
    .trim()
    .min(1, "Assignment title is required")
    .max(100, "Assignment title must not exceed 100 characters"),
  description: z
    .string()
    .trim()
    .max(1000, "Assignment description must not exceed 1000 characters")
    .optional(),
  dueDate: z.iso.datetime("Due date must be a valid ISO datetime"),
  weighting: z
    .number()
    .min(0, "Weighting must be at least 0")
    .max(100, "Weighting must be at most 100"),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "SUBMITTED"]),
});

export const assignmentResponseSchema = z.object({
  id: z.uuid(),
  moduleId: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  dueDate: z.iso.datetime(),
  weighting: z.number(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "SUBMITTED"]),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type CreateAssignmentRequest = z.infer<typeof createAssignmentSchema>;

export type AssignmentResponse = z.infer<typeof assignmentResponseSchema>;
