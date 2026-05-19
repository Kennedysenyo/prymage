import z from "zod";
import { createUserSchema, editUserSchema } from "./users.schemas";

export type CreateUserFormType = z.infer<typeof createUserSchema>;

export type CreateUserFormFieldsErrors = Partial<CreateUserFormType>;

export type CreateUserFormResponseType = {
  errors: CreateUserFormFieldsErrors;
  success: boolean;
  errorMessage: string | null;
};

export type EditUserDataType = z.infer<typeof editUserSchema>;

export type EditUserFormFieldErrors = Partial<EditUserDataType>;

export type EditUserFormResponseType = {
  success: boolean;
  errors: EditUserFormFieldErrors;
  errorMessage: string | null;
};
