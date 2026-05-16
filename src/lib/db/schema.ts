import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  check,
} from "drizzle-orm/pg-core";
import * as authTables from "./auth-schema";
import { sql } from "drizzle-orm";

export const leadStages = pgEnum("stages", [
  "new",
  "contacted",
  "qualified",
  "won",
  "lost",
]);

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    company: text("company").notNull(),
    interest: text("interest").notNull(),
    country: text("country").notNull(),
    message: text("message").notNull(),
    stage: leadStages("stage").notNull().default("new"),
    assignTo: text("assignTo").references(() => authTables.user.id),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => [
    check(
      "stage_check_constraint",
      sql`${table.stage} IN ('new', 'contacted', 'qualified', 'won', 'lost')`,
    ),
  ],
);

export const leadNote = pgTable("lead_notes", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  leadId: uuid("leadId")
    .references(() => leads.id)
    .notNull(),
  userId: text("userId")
    .references(() => authTables.user.id)
    .notNull(),
  note: text("note").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const authSchemas = { ...authTables };
