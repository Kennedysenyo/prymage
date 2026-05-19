"use server";

import z from "zod";
import {
  forgotPasswordSchema,
  setNewPasswordSchema,
  userSignInSchema,
  verifyOTPSchema,
} from "./auth.schemas";
import {
  ForgotPasswordDataType,
  ForgotPasswordFormFieldErrors,
  ForgotPasswordFormResponseType,
  SetNewPasswordDataType,
  SetNewPasswordFormFieldsErrors,
  SetNewPasswordFormResponseType,
  SignInFormFieldsErrorType,
  SignInFormResponseType,
  UserSignInDataType,
  VerifyOTPData,
  VerifyOTPFormFieldErrors,
  VerifyOTPFormResponseType,
} from "./auth.types";
import { handleError } from "@/lib/utils";
import { auth } from "@/lib/better-auth/auth";
import { cookies, headers } from "next/headers";

const signIn = async (user: UserSignInDataType): Promise<string | null> => {
  try {
    await auth.api.signInEmail({ body: user, headers: await headers() });
    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const validateSignInForm = async (
  _prevState: SignInFormResponseType,
  formData: FormData,
): Promise<SignInFormResponseType> => {
  const rawInput = Object.fromEntries(formData);

  const result = userSignInSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: SignInFormFieldsErrorType = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }

    return { success: false, errors, errorMessage: null };
  }

  const errorMessage = await signIn(result.data);
  if (errorMessage) {
    return { success: false, errors: {}, errorMessage };
  }

  return { success: true, errors: {}, errorMessage: null };
};

// --------Forgot Password

const sendOtp = async (
  data: ForgotPasswordDataType,
): Promise<string | null> => {
  try {
    await auth.api.sendVerificationOTP({
      body: {
        ...data,
        type: "forget-password",
      },
      headers: await headers(),
    });
    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const validateForgotPasswordForm = async (
  _prevState: ForgotPasswordFormResponseType,
  formData: FormData,
): Promise<ForgotPasswordFormResponseType> => {
  const rawInput = Object.fromEntries(formData);

  const result = forgotPasswordSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: ForgotPasswordFormFieldErrors = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [k, v] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [k]: v[0] };
    }

    return { success: false, errors, errorMessage: null };
  }

  const errorMessage = await sendOtp(result.data);
  if (errorMessage) {
    return { success: false, errors: {}, errorMessage };
  }

  // TODO: Clean up flow to avoid saving emails as cookies.

  const cookiesStore = await cookies();

  cookiesStore.set("reset-email", result.data.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });

  return { success: true, errors: {}, errorMessage: null };
};

// -------Verify OTP

const verifyOTP = async (data: VerifyOTPData): Promise<string | null> => {
  try {
    await auth.api.checkVerificationOTP({
      body: { ...data, type: "forget-password" },
    });

    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const validateVerifyOTPForm = async (
  { email, type }: { email: string; type: string },
  _prevState: VerifyOTPFormResponseType,
  formData: FormData,
): Promise<VerifyOTPFormResponseType> => {
  const otp = (formData.get("otp") as string).trim();

  const result = verifyOTPSchema.safeParse({ email, otp, type });

  if (!result.success) {
    let errors: VerifyOTPFormFieldErrors = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }

    return { success: false, errors, errorMessage: null };
  }

  const errorMessage = await verifyOTP(result.data);
  if (errorMessage) {
    return { success: false, errors: {}, errorMessage };
  }

  const cookiesStore = await cookies();

  cookiesStore.set("reset-email", result.data.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });

  cookiesStore.set("reset-code", result.data.otp, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });

  return { success: true, errors: {}, errorMessage: null };
};

// ------------- Set New Password

const setNewPassword = async (
  data: Omit<SetNewPasswordDataType, "cnfrmPassword">,
): Promise<string | null> => {
  try {
    await auth.api.resetPasswordEmailOTP({ body: data });

    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const validateSetNewPasswordForm = async (
  { email, otp }: { email: string; otp: string },
  _prevState: SetNewPasswordFormResponseType,
  formData: FormData,
): Promise<SetNewPasswordFormResponseType> => {
  const rawInput = Object.fromEntries(formData);

  const result = setNewPasswordSchema.safeParse({ ...rawInput, email, otp });

  if (!result.success) {
    let errors: SetNewPasswordFormFieldsErrors = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }

    return { success: false, errors, errorMessage: null };
  }

  const errorMessage = await setNewPassword(result.data);
  if (errorMessage) {
    return { success: false, errors: {}, errorMessage };
  }

  return { success: true, errors: {}, errorMessage: null };
};

export const logOut = async (): Promise<string | null> => {
  try {
    await auth.api.signOut({ headers: await headers() });
    return null;
  } catch (error) {
    return handleError(error);
  }
};
