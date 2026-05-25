import z from "zod";
import { createLeadsSchema, createNoteSchema } from "./leads.schemas";
import {
  fetchDashboardCardStats,
  fetchDashboardChartsData,
  fetchHistoryByLeadId,
  fetchLeadById,
  fetchLeadToAssignStaffById,
  fetchNotesByLeadId,
} from "./leads.queries";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export type CreateLeadsDataType = z.infer<typeof createLeadsSchema>;

export type CreateLeadsFormFieldsError = Partial<CreateLeadsDataType>;

export type CreateLeadsFormResponseType = {
  success: boolean;
  errors: CreateLeadsFormFieldsError;
  errorMessage: string | null;
};

// export type LeadsTable = z.infer<typeof selectAllLeadsTableSchema>;
export type LeadsTable = {
  id: string;
  name: string;
  company: string;
  email: string;
  interest: string;
  country: string;
  stage: "new" | "contacted" | "qualified" | "won" | "lost";
  assignedTo: string | null;
  assignedUser: string | null;
  createdAt: Date;
};
// export type LeadDetails = z.infer<typeof selectLeadDetailsSchema>;
export type LeadDetails = Awaited<ReturnType<typeof fetchLeadById>>;

export type History = Awaited<ReturnType<typeof fetchHistoryByLeadId>>;

export type SingleHistory = History[number];

// ============== Notes
export type Notes = Awaited<ReturnType<typeof fetchNotesByLeadId>>;
export type CreateNoteDataType = z.infer<typeof createNoteSchema>;

export type CreateNoteFormFieldErrors = Partial<CreateNoteDataType>;

export type CreateNoteFormResponseType = {
  success: boolean;
  errors: CreateNoteFormFieldErrors;
  errorMessage: string | null;
};

export type Stage = "new" | "contacted" | "qualified" | "won" | "lost";

export type AssignStaffLead = Awaited<
  ReturnType<typeof fetchLeadToAssignStaffById>
>;

export type CardsData = Awaited<ReturnType<typeof fetchDashboardCardStats>>;
export type ChartsData = Awaited<ReturnType<typeof fetchDashboardChartsData>>;
