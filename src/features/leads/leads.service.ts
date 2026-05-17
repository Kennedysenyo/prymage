"use server";

import z from "zod";
import { createLeadsSchema } from "./leads.schemas";
import {
  CreateLeadsDataType,
  CreateLeadsFormFieldsError,
  CreateLeadsFormResponseType,
} from "./leads.types";
import { handleError } from "@/lib/utils";
import { leads } from "@/lib/db/schema";
import { db } from "@/lib/db/db";

const createLead = async (
  data: CreateLeadsDataType,
): Promise<string | null> => {
  try {
    await db.insert(leads).values({ ...data });
    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const validateLeadsForm = async (
  _prevState: CreateLeadsFormResponseType,
  formData: FormData,
): Promise<CreateLeadsFormResponseType> => {
  const rawInput = Object.fromEntries(formData);

  const result = createLeadsSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: CreateLeadsFormFieldsError = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = {
        ...errors,
        [key]: value[0],
      };
    }

    return {
      success: false,
      errors,
      errorMessage: null,
    };
  }

  const errorMessage = await createLead(result.data);
  if (errorMessage) {
    return { success: false, errors: {}, errorMessage };
  }

  return {
    success: true,
    errors: {},
    errorMessage: null,
  };
};
