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
