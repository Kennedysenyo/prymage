"use server";

import { user } from "@/lib/db/auth-schema";
import { db } from "@/lib/db/db";
import { leads, leadStageHistory } from "@/lib/db/schema";
import { handleError } from "@/lib/utils";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import {
  fetchAssignedLeadsById,
  fetchLeadsLostByUserId,
  fetchLeadsWonByUserId,
  fetchUserActiveLeadsCount,
  fetchUserLeadsStageCountDataById,
  fetchUserMonthlyPerformance,
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
        phone: user.phone,
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

export const fetchAdminEmails = async () => {
  try {
    const res = await db
      .select({ email: user.email })
      .from(user)
      .where(eq(user.role, "admin"));
    const emails = res.map((email) => email.email);
    return emails;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fetchUserProfileData = async (id: string) => {
  try {
    const [data] = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        image: user.image,
        createdAt: user.createdAt,
        totalLeads: count(leads.id),
        totalWonLeads: sql<number>`
          COUNT(
            CASE
              WHEN ${leads.stage} = 'won'
              THEN 1
            END
          )
        `,
      })
      .from(user)
      .leftJoin(leads, eq(leads.assignedTo, user.id))
      .where(eq(user.id, id))
      .groupBy(user.id);

    return data;
  } catch (error) {
    notFound();
  }
};

export const fetchUserAndPerformanceDetails = async (id: string) => {
  const [userDetails, userPerformanceData] = await Promise.all([
    fetchUserProfileData(id),
    fetchUserMonthlyPerformance(id),
  ]);
  return {
    userDetails,
    userPerformanceData,
  };
};
