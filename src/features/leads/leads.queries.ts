"use server";

import { user } from "@/lib/db/auth-schema";
import { db } from "@/lib/db/db";
import { leadNote, leads, leadStageHistory } from "@/lib/db/schema";
import { asc, count, desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { fetchAllUsers } from "../users/users.queries";

export const fetchAllLeads = async () => {
  try {
    const allLeads = await db
      .select({
        id: leads.id,
        name: leads.name,
        company: leads.company,
        email: leads.email,
        interest: leads.interest,
        country: leads.country,
        stage: leads.stage,
        assignedTo: leads.assignedTo,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .orderBy(desc(leads.createdAt));
    return allLeads;
  } catch (e) {
    throw new Error("Error Fetching posts");
  }
};

export const fetchLeadById = async (id: string) => {
  try {
    const [lead] = await db
      .select({
        id: leads.id,
        name: leads.name,
        company: leads.company,
        email: leads.email,
        phone: leads.phone,
        interest: leads.interest,
        country: leads.country,
        stage: leads.stage,
        assignedTo: leads.assignedTo,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .where(eq(leads.id, id));

    return lead;
  } catch (e) {
    notFound();
  }
};

export const fetchNotesByLeadId = async (id: string) => {
  try {
    const notes = await db
      .select({
        id: leadNote.id,
        authorName: user.name,
        authorImage: user.image,
        content: leadNote.note,
        createdAt: leadNote.createdAt,
      })
      .from(leadNote)
      .leftJoin(user, eq(leadNote.userId, user.id))
      .where(eq(leadNote.leadId, id))
      .orderBy(asc(leadNote.createdAt));

    return notes;
  } catch (e) {
    notFound();
  }
};

export const fetchHistoryByLeadId = async (id: string) => {
  try {
    const history = await db
      .select({
        id: leadStageHistory.id,
        activity: leadStageHistory.activity,
        description: leadStageHistory.description,
        oldStage: leadStageHistory.oldStage,
        newStage: leadStageHistory.newStage,
        createdAt: leadStageHistory.createdAt,
      })
      .from(leadStageHistory)
      .leftJoin(user, eq(leadStageHistory.actionBy, user.id))
      .where(eq(leadStageHistory.leadId, id));

    return history;
  } catch (e) {
    notFound();
  }
};

export const fetchLeadDetailsById = async (id: string) => {
  const [lead, notes, history] = await Promise.all([
    fetchLeadById(id),
    fetchNotesByLeadId(id),
    fetchHistoryByLeadId(id),
  ]);
  return { lead, notes, history };
};

export const fetchTotalLeadsCount = async () => {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(leads);

  return Number(result.count);
};

export const fetchNewLeadsCount = async () => {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(leads)
    .where(eq(leads.stage, "new"));

  return Number(result.count);
};

export const fetchContactedLeadsCount = async () => {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(leads)
    .where(eq(leads.stage, "contacted"));

  return Number(result.count);
};

export const fetchQualifiedLeadsCount = async () => {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(leads)
    .where(eq(leads.stage, "qualified"));

  return Number(result.count);
};

export const fetchWonLeadsCount = async () => {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(leads)
    .where(eq(leads.stage, "won"));

  return Number(result.count);
};

export const fetchLostLeads = async () => {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(leads)
    .where(eq(leads.stage, "lost"));

  return Number(result.count);
};

export const fetchDashboardCardStats = async () => {
  const [
    totalLeads,
    newLeads,
    contactedLeads,
    qualifiedLeads,
    wonLeads,
    lostLeads,
  ] = await Promise.all([
    fetchTotalLeadsCount(),
    fetchNewLeadsCount(),
    fetchContactedLeadsCount(),
    fetchQualifiedLeadsCount(),
    fetchWonLeadsCount(),
    fetchLostLeads(),
  ]);
  return {
    totalLeads,
    newLeads,
    contactedLeads,
    qualifiedLeads,
    wonLeads,
    lostLeads,
  };
};

export const fetchLeadToAssignStaffById = async (id: string) => {
  try {
    const [lead] = await db
      .select({
        id: leads.id,
        name: leads.name,
        company: leads.company,
        email: leads.email,
        phone: leads.phone,
        interest: leads.interest,
        country: leads.country,
        stage: leads.stage,
        assignedTo: leads.assignedTo,
        assignedUser: user.name,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .leftJoin(user, eq(leads.assignedTo, user.id))
      .where(eq(leads.id, id));

    return lead;
  } catch (e) {
    notFound();
  }
};

export const fetchLeadByIdAndFetchAllUsers = async (id: string) => {
  const [lead, allUsers] = await Promise.all([
    fetchLeadToAssignStaffById(id),
    fetchAllUsers(),
  ]);

  return { lead, allUsers };
};
