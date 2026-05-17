import { leads } from "@/lib/db/schema";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

const dbLeadsSchema = createInsertSchema(leads);

export const createLeadsSchema = dbLeadsSchema
  .pick({
    name: true,
    email: true,
    company: true,
    phone: true,
    interest: true,
    country: true,
    message: true,
  })
  .extend({
    name: z.string().min(3, {
      error: (iss) =>
        iss.input?.length === 0
          ? "Enter name"
          : "Name must be at least 3 chars long.",
    }),
    email: z.email(),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s\-()]+$/, "Please enter a valid phone number")
      .min(7, "Phone number is too short")
      .max(20, "Phone number is too long"),
    interest: z.string().min(1, { error: "Select interest" }),
    country: z.string().min(1, { error: "Select country" }),
    message: z.string().min(10, {
      error: (iss) =>
        iss.input?.length === 0
          ? "Enter message"
          : "Message must be at least 10 chars long.",
    }),
  });
