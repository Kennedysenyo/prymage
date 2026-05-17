"use server";

import z from "zod";
import { createUserSchema } from "./users.schemas";
import {
  CreateUserFormFieldsErrors,
  CreateUserFormResponseType,
  CreateUserFormType,
} from "./users.types";
import { handleError } from "@/lib/utils";
import { auth } from "@/lib/better-auth/auth";

const createUser = async (
  userData: Omit<CreateUserFormType, "cnfrmPassword">,
): Promise<string | null> => {
  try {
    const res = await auth.api.createUser({
      body: {
        ...userData,
        data: { emailVerified: true },
      },
    });

    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const validateCreateUserForm = async (
  _prevState: CreateUserFormResponseType,
  formData: FormData,
): Promise<CreateUserFormResponseType> => {
  const rawInput = Object.fromEntries(formData);

  const result = createUserSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: CreateUserFormFieldsErrors = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }

    return { success: false, errors, errorMessage: null };
  }

  const errorMessage = await createUser(result.data);

  if (errorMessage) {
    return { success: false, errors: {}, errorMessage };
  }

  return { success: true, errors: {}, errorMessage: null };
};
