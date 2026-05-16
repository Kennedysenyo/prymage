import z from "zod";
import { userSignInSchema } from "./auth.schemas";

export type UserSignInDataType = z.infer<typeof userSignInSchema>;

export interface SignInFormFieldsErrorType extends Partial<UserSignInDataType> {}

export type SignInFormResponseType = {
  errors: SignInFormFieldsErrorType;
  success: boolean;
  errorMessage: string | null;
};
