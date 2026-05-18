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
  Stage,
} from "./leads.types";
import { handleError } from "@/lib/utils";
import { leadNote, leads, leadStageHistory } from "@/lib/db/schema";
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";
import { user } from "@/lib/db/auth-schema";

const createLead = async (
  data: CreateLeadsDataType,
): Promise<string | null> => {
  try {
    await db.transaction(async (tx) => {
      const [lead] = await tx
        .insert(leads)
        .values({ ...data })
        .returning();
      await tx.insert(leadStageHistory).values({
        leadId: lead.id,
        oldStage: null,
        newStage: "new",
        description: "Lead added to CRM",
        activity: "Lead Created",
      });
    });

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
    await db.transaction(async (tx) => {
      const [history] = await tx
        .select({
          oldStage: leadStageHistory.oldStage,
          newStage: leadStageHistory.newStage,
        })
        .from(leadStageHistory)
        .where(eq(leadStageHistory.leadId, data.leadId))
        .orderBy(desc(leadStageHistory.createdAt))
        .limit(1);
      const [note] = await tx
        .insert(leadNote)
        .values({ ...data })
        .returning();
      await tx.insert(leadStageHistory).values({
        leadId: note.leadId,
        actionBy: note.userId,
        oldStage: history.oldStage,
        newStage: history.newStage,
        description: note.note,
        activity: "Note Added",
      });
    });

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

export const updateStage = async (
  userId: string,
  leadId: string,
  currentStage: Stage,
  newStage: Stage,
): Promise<string | null> => {
  try {
    await db.transaction(async (tx) => {
      const [updatedLead] = await tx
        .update(leads)
        .set({ stage: newStage })
        .where(eq(leads.id, leadId))
        .returning();
      await tx.insert(leadStageHistory).values({
        leadId: leadId,
        actionBy: userId,
        oldStage: currentStage,
        newStage: updatedLead.stage,
        description: `${currentStage} → ${updatedLead.stage}`,
        activity: "Stage Changed",
      });
    });
    revalidatePath(`/admin/leads/${leadId}/details`);
    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const assignStaff = async ({
  leadId,
  staffId,
  actionBy,
}: {
  leadId: string;
  staffId: string;
  actionBy: string;
}): Promise<string | null> => {
  try {
    await db.transaction(async (tx) => {
      const [history] = await tx
        .select({
          oldStage: leadStageHistory.oldStage,
          newStage: leadStageHistory.newStage,
        })
        .from(leadStageHistory)
        .where(eq(leadStageHistory.leadId, leadId))
        .orderBy(desc(leadStageHistory.createdAt))
        .limit(1);
      await tx
        .update(leads)
        .set({ assignedTo: staffId })
        .where(eq(leads.id, leadId));
      const [staff] = await tx
        .select({ name: user.name })
        .from(user)
        .where(eq(user.id, staffId));
      await tx.insert(leadStageHistory).values({
        leadId: leadId,
        actionBy: actionBy,
        oldStage: history.oldStage,
        newStage: history.newStage,
        description: staff.name,
        activity: "Assigned Staff",
      });
    });

    revalidatePath(`/admin/leads/${leadId}/assign-staff`);
    return null;
  } catch (error) {
    return handleError(error);
  }
};
