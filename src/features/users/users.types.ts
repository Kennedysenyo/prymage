import z from "zod";
import { createUserSchema } from "./users.schemas";

export type CreateUserFormType = z.infer<typeof createUserSchema>;

export type CreateUserFormFieldsErrors = Partial<CreateUserFormType>;

export type CreateUserFormResponseType = {
  errors: CreateUserFormFieldsErrors;
  success: boolean;
  errorMessage: string | null;
};
