import z from "zod";
import {
  forgotPasswordSchema,
  setNewPasswordSchema,
  userSignInSchema,
  verifyOTPSchema,
} from "./auth.schemas";

export type UserSignInDataType = z.infer<typeof userSignInSchema>;

export interface SignInFormFieldsErrorType extends Partial<UserSignInDataType> {}

export type SignInFormResponseType = {
  errors: SignInFormFieldsErrorType;
  success: boolean;
  errorMessage: string | null;
};

// Forgot Password

export type ForgotPasswordDataType = z.infer<typeof forgotPasswordSchema>;

export type ForgotPasswordFormFieldErrors = Partial<ForgotPasswordDataType>;

export type ForgotPasswordFormResponseType = {
  success: boolean;
  errors: ForgotPasswordFormFieldErrors;
  errorMessage: string | null;
};

// Verify OTP

export type VerifyOTPData = z.infer<typeof verifyOTPSchema>;

export type VerifyOTPFormFieldErrors = Partial<VerifyOTPData>;

export type VerifyOTPFormResponseType = {
  success: boolean;
  errors: VerifyOTPFormFieldErrors;
  errorMessage: string | null;
};

// Set New Password

export type SetNewPasswordDataType = z.infer<typeof setNewPasswordSchema>;

export type SetNewPasswordFormFieldsErrors = Partial<SetNewPasswordDataType>;

export type SetNewPasswordFormResponseType = {
  success: boolean;
  errors: SetNewPasswordFormFieldsErrors;
  errorMessage: string | null;
};
