import z from "zod";
import { createLeadsSchema } from "./leads.schemas";

export type CreateLeadsDataType = z.infer<typeof createLeadsSchema>;

export type CreateLeadsFormFieldsError = Partial<CreateLeadsDataType>;

export type CreateLeadsFormResponseType = {
  success: boolean;
  errors: CreateLeadsFormFieldsError;
  errorMessage: string | null;
};
