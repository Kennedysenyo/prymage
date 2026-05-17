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
    assignedTo: text("assignedTo").references(() => authTables.user.id),
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
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const leadStageHistory = pgTable("lead_stage_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("leadId")
    .notNull()
    .references(() => leads.id),
  changedBy: text("changedBy")
    .notNull()
    .references(() => authTables.user.id),
  oldStage: text("oldStage").notNull(),
  newStage: text("newStage").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const authSchemas = { ...authTables };
