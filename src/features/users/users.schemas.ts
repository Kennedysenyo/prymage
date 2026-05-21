import { user } from "@/lib/db/auth-schema";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

const dbUserSchema = createInsertSchema(user);

export const createUserSchema = dbUserSchema
  .pick({
    name: true,
    email: true,
    role: true,
    position: true,
  })
  .extend({
    name: z.string().min(5, {
      error: (iss) =>
        iss.input?.length !== 0 ? "Name must be > 5 chars long." : "Enter name",
    }),
    email: z.email(),
    role: z.enum(["admin", "staff"]),
    position: z.string().min(2, {
      error: (iss) =>
        iss.input?.length !== 0
          ? "Position must be >= 2 chars long."
          : "Enter position",
    }),
    password: z.string().min(8, {
      error: (iss) =>
        iss.input?.length !== 0
          ? "Passwords must at least 8 chars long."
          : "Enter password",
    }),
    cnfrmPassword: z.string().min(8, {
      error: (iss) =>
        iss.input?.length !== 0
          ? "Password must be at least 8 chars long."
          : "Enter password",
    }),
  })
  .refine((data) => data.password === data.cnfrmPassword, {
    message: "Passwords do not match",
    path: ["cnfrmPassword"],
  });

export const editUserSchema = dbUserSchema
  .pick({
    name: true,
    email: true,
    role: true,
    position: true,
  })
  .extend({
    name: z.string().min(5, {
      error: (iss) =>
        iss.input?.length !== 0 ? "Name must be > 5 chars long." : "Enter name",
    }),
    email: z.email(),
    role: z.enum(["admin", "staff"]),
    position: z.string().min(2, {
      error: (iss) =>
        iss.input?.length !== 0
          ? "Position must be >= 2 chars long."
          : "Enter position",
    }),
    password: z.string().nullable(),
  });

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^[+]?[0-9\s\-()]+$/, "Invalid phone number format")
  .min(10, "Phone number is too short")
  .max(15, "Phone number is too long")
  .nullable()
  .optional();

export const profileInsertSchema = dbUserSchema
  .pick({
    name: true,
    phone: true,
  })
  .extend({
    name: z.string().min(5, {
      error: (iss) =>
        iss.input?.length !== 0 ? "Name must be > 5 chars long." : "Enter name",
    }),
    phone: z.string().nullable(),
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { error: "Enter password" }),
    newPassword: z
      .string()
      .min(8, { error: "Password must be >= 8 chars long." }),
    cnfrmNewPassword: z
      .string()
      .min(8, { error: "Password must be >= 8 chars long." }),
  })
  .refine((data) => data.newPassword === data.cnfrmNewPassword, {
    message: "Passwords do not match",
    path: ["cnfrmNewPassword"],
  });
