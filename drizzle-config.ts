import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
config({ path: ".env.local" });

export default defineConfig({
  out: "./src/lib/db/schema-output",
  schema: "./src/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
