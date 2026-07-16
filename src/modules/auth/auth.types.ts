import { z } from "zod";

export const authUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const signUpResponseSchema = z.object({
  token: z.string(),
  user: authUserSchema,
});

export const signInResponseSchema = z.object({
  token: z.string(),
  user: authUserSchema,
});

export type AuthUser = z.infer<typeof authUserSchema>;

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;

export type SignInResponse = z.infer<typeof signInResponseSchema>;
