"use server";

import z, { email } from "zod";
import { createUserSchema, editUserSchema } from "./users.schemas";
import {
  CreateUserFormFieldsErrors,
  CreateUserFormResponseType,
  CreateUserFormType,
  EditUserDataType,
  EditUserFormFieldErrors,
  EditUserFormResponseType,
} from "./users.types";
import { handleError } from "@/lib/utils";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const createUser = async (
  userData: Omit<CreateUserFormType, "cnfrmPassword">,
): Promise<string | null> => {
  try {
    console.log("The data", userData);
    const res = await auth.api.createUser({
      body: {
        ...userData,
        data: { emailVerified: true, position: userData.position },
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

export const deleteUserById = async (id: string): Promise<string | null> => {
  try {
    await auth.api.removeUser({
      body: {
        userId: id,
      },
      headers: await headers(),
    });
    revalidatePath("/admins/users");
    return null;
  } catch (error) {
    return handleError(error);
  }
};

const updateUserById = async (
  userId: string,
  data: EditUserDataType,
): Promise<string | null> => {
  try {
    await auth.api.adminUpdateUser({
      body: {
        userId,
        data: {
          name: data.name,
          email: data.email,
          role: data.role,
          position: data.position,
        },
      },
      headers: await headers(),
    });

    if (data.password) {
      await auth.api.setUserPassword({
        body: {
          userId,
          newPassword: data.password,
        },
        headers: await headers(),
      });
    }
    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const validateEditUserForm = async (
  userId: string,
  _prevState: EditUserFormResponseType,
  formData: FormData,
): Promise<EditUserFormResponseType> => {
  const rawInput = Object.fromEntries(formData);

  const result = editUserSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: EditUserFormFieldErrors = {};
    const flattenedErrors = z.flattenError(result.error).fieldErrors;
    for (const [k, v] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [k]: v[0] };
    }
    console.log("Errors", errors);
    return { success: false, errors, errorMessage: null };
  }
  console.log("Success");
  const errorMessage = await updateUserById(userId, result.data);
  if (errorMessage) {
    return { success: false, errors: {}, errorMessage };
  }

  return { success: true, errors: {}, errorMessage: null };
};
