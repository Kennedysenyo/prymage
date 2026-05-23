"use server";

import {
  changePasswordSchema,
  createUserSchema,
  editUserSchema,
  profileInsertSchema,
} from "./users.schemas";
import {
  CreateUserFormFieldsErrors,
  CreateUserFormResponseType,
  CreateUserFormType,
  EditUserDataType,
  EditUserFormFieldErrors,
  EditUserFormResponseType,
  UserPasswordChangeData,
  UserPasswordChangeFormFieldsError,
  UserPasswordChangeFormResponseType,
  UserProfileUpdateData,
  UserProfileUpdateFormFieldsError,
  UserProfileUpdateFormResponseType,
} from "./users.types";
import { handleError } from "@/lib/utils";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { requirePermission } from "../auth/auth.authorize";
import { sendEmail } from "../emails/emails.service";
import z from "zod";
import { logOut } from "../auth/auth.service";

const createUser = async (
  userData: Omit<CreateUserFormType, "cnfrmPassword">,
): Promise<string | null> => {
  try {
    await requirePermission({ user: ["create"] });

    await auth.api.createUser({
      body: {
        ...userData,
        data: { emailVerified: true, position: userData.position },
      },
    });
    const domain = process.env.BETTER_AUTH_URL;
    if (!domain) {
      console.error("BETTER_AUTH_URL is required to send Email");
    }
    const loginUrl = `${domain}/sign-in`;

    await sendEmail(
      {
        type: "Welcome",
        name: userData.name,
        temporaryPassword: userData.password,
        loginUrl,
      },
      userData.email,
    );

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
    await requirePermission({ user: ["delete"] });

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
    await requirePermission({ user: ["update:any"] });

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
      await requirePermission({ user: ["set-password"] });
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

    return { success: false, errors, errorMessage: null };
  }
  console.log("Success");
  const errorMessage = await updateUserById(userId, result.data);
  if (errorMessage) {
    return { success: false, errors: {}, errorMessage };
  }

  return { success: true, errors: {}, errorMessage: null };
};

export const toggleUserBan = async (userId: string, isBanned: boolean) => {
  try {
    await requirePermission({ user: ["ban"] });
    if (isBanned) {
      await auth.api.unbanUser({ body: { userId }, headers: await headers() });
    } else {
      await auth.api.banUser({
        body: {
          userId,
          banReason: "Admin Decision",
        },
        headers: await headers(),
      });
    }
    revalidatePath(`/admin/users/${userId}/edit`);

    return null;
  } catch (error) {
    return handleError(error);
  }
};

const updateProfile = async (
  data: UserProfileUpdateData,
): Promise<string | null> => {
  try {
    await auth.api.updateUser({
      body: {
        name: data.name,
        phone: data?.phone?.trim() || null,
      },
      headers: await headers(),
    });

    return null;
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
};

export const validateProfileForm = async (
  _prevState: UserProfileUpdateFormResponseType,
  formData: FormData,
): Promise<UserProfileUpdateFormResponseType> => {
  const rawInput = Object.fromEntries(formData);

  const result = profileInsertSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: UserProfileUpdateFormFieldsError = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }

    return { success: false, errors, errorMessage: null };
  }

  const errorMessage = await updateProfile(result.data);
  if (errorMessage) {
    return { success: false, errors: {}, errorMessage };
  }

  return { success: true, errors: {}, errorMessage: null };
};

const changePassword = async (
  data: UserPasswordChangeData,
): Promise<string | null> => {
  try {
    await auth.api.changePassword({
      body: {
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
        revokeOtherSessions: true,
      },
      headers: await headers(),
    });

    await logOut();
    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const validateChangePasswordForm = async (
  _prevState: UserPasswordChangeFormResponseType,
  formData: FormData,
): Promise<UserPasswordChangeFormResponseType> => {
  const rawInput = Object.fromEntries(formData);

  const result = changePasswordSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: UserPasswordChangeFormFieldsError = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [k, v] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [k]: v[0] };
    }

    return { success: false, errors, errorMessage: null };
  }

  const errorMessage = await changePassword(result.data);

  if (errorMessage) {
    return { success: false, errors: {}, errorMessage };
  }

  return { success: true, errors: {}, errorMessage: null };
};
