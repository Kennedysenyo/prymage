import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/db";
import { authSchemas } from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema: authSchemas,
    provider: "pg",
  }),
});
