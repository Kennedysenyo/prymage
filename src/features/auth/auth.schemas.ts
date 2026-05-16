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
