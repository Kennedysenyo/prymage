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

export const activitTypes = pgEnum("activity_type", [
  "Lead Created",
  "Stage Changed",
  "Note Added",
  "Assigned Staff",
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
    assignedTo: text("assignedTo").references(() => authTables.user.id, {
      onDelete: "set null",
    }),
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
    .references(() => leads.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("userId")
    .references(() => authTables.user.id, { onDelete: "cascade" })
    .notNull(),
  note: text("note").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const leadStageHistory = pgTable(
  "lead_stage_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    leadId: uuid("leadId")
      .notNull()
      .references(() => leads.id),
    changedBy: text("changedBy").references(() => authTables.user.id, {
      onDelete: "set null",
    }),
    activity: activitTypes("activity").notNull(),
    description: text("description").notNull(),
    oldStage: leadStages("oldStage"),
    newStage: leadStages("newStage").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    check(
      "activity_check_constraint",
      sql`${table.activity} IN ('Lead Created', 'Stage Changed', 'Note Added', 'Assigned Staff')`,
    ),
  ],
);

export const authSchemas = { ...authTables };
