import { user } from "@/lib/db/auth-schema";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

const dbUserSchema = createInsertSchema(user);

// Sign In

export const userSignInSchema = dbUserSchema
  .pick({
    email: true,
  })
  .extend({
    email: z.email(),
    password: z.string().min(1, { error: "Enter password" }),
  });

// Forgot Password

export const forgotPasswordSchema = dbUserSchema
  .pick({
    email: true,
  })
  .extend({
    email: z.email(),
  });

export const verifyOTPSchema = z.object({
  email: z.email(),
  otp: z.string().length(6, {
    error: (iss) =>
      iss.input?.length === 0 ? "Enter OTP" : "OTP should be 6 digits",
  }),
  type: z.string().min(1),
});

// --------------- Set New Password

export const setNewPasswordSchema = dbUserSchema
  .pick({
    email: true,
  })
  .extend({
    email: z.email(),
    otp: z.string().length(6, {
      error: (iss) =>
        iss.input?.length === 0 ? "Missing OTP" : "OTP should be 6 digits",
    }),
    password: z.string().min(8, { error: "Password must be >= 8 chars long." }),
    cnfrmPassword: z
      .string()
      .min(8, { error: "Password must be >= 8 chars long." }),
  })
  .refine((data) => data.password === data.cnfrmPassword, {
    message: "Passwords do not match",
    path: ["cnfrmPassword"],
  });
