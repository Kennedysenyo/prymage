import { leadNote, leads } from "@/lib/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
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
    company: z.string().min(1, { error: "Enter company name" }),
    interest: z.string().min(1, { error: "Select interest" }),
    country: z.string().min(1, { error: "Select country" }),
    message: z.string().min(10, {
      error: (iss) =>
        iss.input?.length === 0
          ? "Enter message"
          : "Message must be at least 10 chars long.",
    }),
  });

const dbSelectLeadsSchema = createSelectSchema(leads);

export const selectAllLeadsTableSchema = dbSelectLeadsSchema.pick({
  id: true,
  name: true,
  company: true,
  email: true,
  interest: true,
  country: true,
  stage: true,
  assignedTo: true,
  createdAt: true,
});

export const selectLeadDetailsSchema = dbSelectLeadsSchema.pick({
  id: true,
  name: true,
  company: true,
  email: true,
  phone: true,
  interest: true,
  country: true,
  stage: true,
  assignedTo: true,
  createdAt: true,
});

// =------------- Notes

const dbCreateNoteSchema = createInsertSchema(leadNote);

export const createNoteSchema = dbCreateNoteSchema
  .pick({
    leadId: true,
    userId: true,
    note: true,
  })
  .extend({
    leadId: z.uuid(),
    userId: z.string().min(1),
    note: z.string().min(10, {
      error: (iss) =>
        iss.input?.length === 0 ? "Add note" : "Note must be >= 10 chars long.",
    }),
  });
