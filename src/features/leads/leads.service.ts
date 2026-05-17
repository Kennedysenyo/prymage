"use server";

import z from "zod";
import { createLeadsSchema, createNoteSchema } from "./leads.schemas";
import {
  CreateLeadsDataType,
  CreateLeadsFormFieldsError,
  CreateLeadsFormResponseType,
  CreateNoteDataType,
  CreateNoteFormFieldErrors,
  CreateNoteFormResponseType,
} from "./leads.types";
import { handleError } from "@/lib/utils";
import { leadNote, leads } from "@/lib/db/schema";
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";

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

const addNote = async (data: CreateNoteDataType): Promise<string | null> => {
  try {
    await db
      .insert(leadNote)
      .values({ ...data })
      .returning();

    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const validateCreateNoteForm = async (
  { userId, leadId }: { userId: string; leadId: string },
  _prevState: CreateNoteFormResponseType,
  formData: FormData,
): Promise<CreateNoteFormResponseType> => {
  const rewInut = Object.fromEntries(formData);

  const result = createNoteSchema.safeParse({ ...rewInut, userId, leadId });

  if (!result.success) {
    let errors: CreateNoteFormFieldErrors = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }
    return { success: false, errors, errorMessage: null };
  }

  const errorMessage = await addNote(result.data);

  if (errorMessage) {
    return { success: false, errors: {}, errorMessage };
  }
  revalidatePath(`/admin/leads/${result.data.leadId}/details`);
  return { success: true, errors: {}, errorMessage: null };
};
