"use server";

import { user } from "@/lib/db/auth-schema";
import { db } from "@/lib/db/db";
import { leads, leadStageHistory } from "@/lib/db/schema";
import { handleError } from "@/lib/utils";
import { count, desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import {
  fetchAssignedLeadsById,
  fetchLeadsLostByUserId,
  fetchLeadsWonByUserId,
  fetchUserActiveLeadsCount,
  fetchUserLeadsStageCountDataById,
  fetchUserPerformanceDataById,
} from "../leads/leads.queries";

export const fetchAllUsersTable = async () => {
  try {
    const usersData = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        leadsAssigned: count(leads.id),
        createdAt: user.createdAt,
      })
      .from(user)
      .leftJoin(leads, eq(leads.assignedTo, user.id))
      .groupBy(user.id, user.name, user.email, user.role, user.createdAt)
      .orderBy(desc(user.createdAt));
    return usersData;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fetchAllUsers = async () => {
  try {
    const users = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        position: user.position,
        leadsAssigned: count(leads.id),
      })
      .from(user)
      .leftJoin(leads, eq(leads.assignedTo, user.id))
      .groupBy(user.id, user.name, user.email, user.role, user.createdAt)
      .orderBy(desc(user.createdAt));
    return users;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fetchUserById = async (id: string) => {
  try {
    const [fetchedUser] = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        position: user.position,
        role: user.role,
        banned: user.banned,
      })
      .from(user)
      .where(eq(user.id, id));
    return fetchedUser;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
export const fetchUserDetailsById = async (id: string) => {
  try {
    const [userDetails] = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        position: user.position,
        leadsCount: count(leads.id),
        createdAt: user.createdAt,
      })
      .from(user)
      .leftJoin(leads, eq(leads.assignedTo, user.id))
      .groupBy(user.id, user.name, user.email, user.role, user.createdAt)
      .where(eq(user.id, id));
    return userDetails;
  } catch (error) {
    notFound();
  }
};

const fetchUserActivitiesById = async (id: string) => {
  try {
    const userActivities = await db
      .select({
        id: leadStageHistory.id,
        activity: leadStageHistory.activity,
        description: leadStageHistory.description,
        createdAt: leadStageHistory.createdAt,
      })
      .from(leadStageHistory)
      .where(eq(leadStageHistory.actionBy, id))
      .orderBy(desc(leadStageHistory.createdAt));
    return userActivities;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fecthUserDetailsData = async (id: string) => {
  const [
    userDetails,
    wonCount,
    lostCount,
    activeLeadsCount,
    userPerformanceData,
    userLeadStageCountData,
    userAssignedLeads,
    userActivities,
  ] = await Promise.all([
    fetchUserDetailsById(id),
    fetchLeadsWonByUserId(id),
    fetchLeadsLostByUserId(id),
    fetchUserActiveLeadsCount(id),
    fetchUserPerformanceDataById(id),
    fetchUserLeadsStageCountDataById(id),
    fetchAssignedLeadsById(id),
    fetchUserActivitiesById(id),
  ]);

  return {
    userDetails,
    wonCount,
    lostCount,
    activeLeadsCount,
    userPerformanceData,
    userLeadStageCountData,
    userAssignedLeads,
    userActivities,
  };
};
