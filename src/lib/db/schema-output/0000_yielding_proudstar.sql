CREATE TYPE "public"."stages" AS ENUM('new', 'contacted', 'qualified', 'won', 'lost');--> statement-breakpoint
CREATE TABLE "lead_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"leadId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"note" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"company" text NOT NULL,
	"interest" text NOT NULL,
	"country" text NOT NULL,
	"message" text NOT NULL,
	"stage" "stages" DEFAULT 'new' NOT NULL,
	"assignTo" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "stage_check_constraint" CHECK ("leads"."stage" IN ('new', 'contacted', 'qualified', 'won', 'lost'))
);
--> statement-breakpoint
ALTER TABLE "lead_notes" ADD CONSTRAINT "lead_notes_leadId_leads_id_fk" FOREIGN KEY ("leadId") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_notes" ADD CONSTRAINT "lead_notes_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_assignTo_user_id_fk" FOREIGN KEY ("assignTo") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;