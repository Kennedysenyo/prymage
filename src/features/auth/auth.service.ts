"use server";

import z from "zod";
import { userSignInSchema } from "./auth.schemas";
import {
  SignInFormFieldsErrorType,
  SignInFormResponseType,
} from "./auth.types";

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

  console.log(result.data);

  return { success: true, errors: {}, errorMessage: null };
};
