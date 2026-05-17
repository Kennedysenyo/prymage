import z from "zod";
import {
  createLeadsSchema,
  createNoteSchema,
  selectAllLeadsTableSchema,
  selectLeadDetailsSchema,
} from "./leads.schemas";

export type CreateLeadsDataType = z.infer<typeof createLeadsSchema>;

export type CreateLeadsFormFieldsError = Partial<CreateLeadsDataType>;

export type CreateLeadsFormResponseType = {
  success: boolean;
  errors: CreateLeadsFormFieldsError;
  errorMessage: string | null;
};

export type LeadsTable = z.infer<typeof selectAllLeadsTableSchema>;
export type LeadDetails = z.infer<typeof selectLeadDetailsSchema>;

// ============== Notes

export type CreateNoteDataType = z.infer<typeof createNoteSchema>;

export type CreateNoteFormFieldErrors = Partial<CreateNoteDataType>;

export type CreateNoteFormResponseType = {
  success: boolean;
  errors: CreateNoteFormFieldErrors;
  errorMessage: string | null;
};
