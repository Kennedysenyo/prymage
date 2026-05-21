import z from "zod";
import {
  changePasswordSchema,
  createUserSchema,
  editUserSchema,
  profileInsertSchema,
} from "./users.schemas";
import { fetchUserProfileData } from "./users.queries";
import { fetchUserMonthlyPerformance } from "../leads/leads.queries";

// ---------Create User

export type CreateUserFormType = z.infer<typeof createUserSchema>;

export type CreateUserFormFieldsErrors = Partial<CreateUserFormType>;

export type CreateUserFormResponseType = {
  errors: CreateUserFormFieldsErrors;
  success: boolean;
  errorMessage: string | null;
};

// -----------Edit User

export type EditUserDataType = z.infer<typeof editUserSchema>;

export type EditUserFormFieldErrors = Partial<EditUserDataType>;

export type EditUserFormResponseType = {
  success: boolean;
  errors: EditUserFormFieldErrors;
  errorMessage: string | null;
};

// ------------Profile Data

export type UserProfileData = Awaited<ReturnType<typeof fetchUserProfileData>>;

export type UserMonthlyPerformanceData = Awaited<
  ReturnType<typeof fetchUserMonthlyPerformance>
>;

export type UserProfileUpdateData = z.infer<typeof profileInsertSchema>;

export type UserProfileUpdateFormFieldsError = Partial<UserProfileUpdateData>;

export type UserProfileUpdateFormResponseType = {
  success: boolean;
  errorMessage: string | null;
  errors: UserProfileUpdateFormFieldsError;
};

// --------------- Change Password

export type UserPasswordChangeData = z.infer<typeof changePasswordSchema>;

export type UserPasswordChangeFormFieldsError = Partial<UserPasswordChangeData>;

export type UserPasswordChangeFormResponseType = {
  success: boolean;
  errorMessage: string | null;
  errors: UserPasswordChangeFormFieldsError;
};
