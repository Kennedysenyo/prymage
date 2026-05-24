"use server";

import { user } from "@/lib/db/auth-schema";
import { db } from "@/lib/db/db";
import { leadNote, leads, leadStageHistory } from "@/lib/db/schema";
import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  isNotNull,
  lte,
  ne,
  sql,
} from "drizzle-orm";
import { notFound } from "next/navigation";
import { fetchAllUsers } from "../users/users.queries";
import { handleError } from "@/lib/utils";

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
        assignedUser: user.name,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .leftJoin(user, eq(leads.assignedTo, user.id))
      .orderBy(desc(leads.createdAt));
    return allLeads;
  } catch (e) {
    console.error(e);
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
        message: leads.message,
        stage: leads.stage,
        assignedUser: user.name,
        assignedTo: leads.assignedTo,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .leftJoin(user, eq(leads.assignedTo, user.id))
      .where(eq(leads.id, id));

    return lead;
  } catch (e) {
    console.error(e);
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
    console.error(e);
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
    console.error(e);
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

export async function fetchDashboardStats() {
  const [result] = await db
    .select({
      totalLeads: count(),

      newLeads: sql<number>`
        count(case when ${leads.stage} = 'new' then 1 end)
      `,

      contactedLeads: sql<number>`
        count(case when ${leads.stage} = 'contacted' then 1 end)
      `,

      qualifiedLeads: sql<number>`
        count(case when ${leads.stage} = 'qualified' then 1 end)
      `,

      wonLeads: sql<number>`
        count(case when ${leads.stage} = 'won' then 1 end)
      `,

      lostLeads: sql<number>`
        count(case when ${leads.stage} = 'lost' then 1 end)
      `,
    })
    .from(leads);

  return result;
}

export async function getLeadStats(startDate: Date, endDate: Date) {
  const result = await db
    .select({
      totalLeads: sql<number>`count(*)`,

      newLeads: sql<number>`
        count(case when ${leads.stage} = 'new' then 1 end)
      `,

      contactedLeads: sql<number>`
        count(case when ${leads.stage} = 'contacted' then 1 end)
      `,

      qualifiedLeads: sql<number>`
        count(case when ${leads.stage} = 'qualified' then 1 end)
      `,

      wonLeads: sql<number>`
        count(case when ${leads.stage} = 'won' then 1 end)
      `,

      lostLeads: sql<number>`
        count(case when ${leads.stage} = 'lost' then 1 end)
      `,
    })
    .from(leads)
    .where(and(gte(leads.createdAt, startDate), lte(leads.createdAt, endDate)));

  return result[0];
}

const calculateDelta = (
  current: number,
  previous: number,
): { change: string; trend: "up" | "down" } => {
  if (previous == 0) {
    return { change: "0%", trend: "up" };
  }

  const percentage = ((current - previous) / previous) * 100;

  return {
    change: `${percentage > 0 ? "+" : ""}${percentage.toFixed(1)}%`,
    trend: percentage >= 0 ? "up" : "down",
  };
};

export const fetchDashboardCardStats = async () => {
  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  const [cardsStats, currentMonthStats, previousMonthStats] = await Promise.all(
    [
      fetchDashboardStats(),
      getLeadStats(currentMonthStart, now),
      getLeadStats(previousMonthStart, previousMonthEnd),
    ],
  );

  const keys = Object.keys(cardsStats) as Array<keyof typeof cardsStats>;

  const finalData = keys.reduce(
    (acc, key) => {
      acc[key] = {
        value: cardsStats[key],
        ...calculateDelta(currentMonthStats[key], previousMonthStats[key]),
      };

      return acc;
    },
    {} as Record<
      keyof typeof cardsStats,
      {
        value: number;
        change: string;
        trend: "up" | "down";
      }
    >,
  );

  return finalData;
};

const fetchLeadsStageData = async () => {
  try {
    const [result] = await db
      .select({
        new: sql<number>`
        COUNT(*) FILTER (
          WHERE ${leads.stage} = 'new'
        )
      `,

        contacted: sql<number>`
        COUNT(*) FILTER (
          WHERE ${leads.stage} = 'contacted'
        )
      `,

        qualified: sql<number>`
        COUNT(*) FILTER (
          WHERE ${leads.stage} = 'qualified'
        )
      `,

        won: sql<number>`
        COUNT(*) FILTER (
          WHERE ${leads.stage} = 'won'
        )
      `,

        lost: sql<number>`
        COUNT(*) FILTER (
          WHERE ${leads.stage} = 'lost'
        )
      `,
      })

      .from(leads);

    return [
      {
        name: "New",
        value: Number(result.new),
      },

      {
        name: "Contacted",
        value: Number(result.contacted),
      },

      {
        name: "Qualified",
        value: Number(result.qualified),
      },

      {
        name: "Won",
        value: Number(result.won),
      },

      {
        name: "Lost",
        value: Number(result.lost),
      },
    ];
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const fetchLeadsByCountryData = async () => {
  try {
    const leadsByCountryData = await db
      .select({
        name: leads.country,
        leads: sql<number>`count(${leads.id})`,
      })
      .from(leads)
      .where(isNotNull(leads.country))
      .groupBy(leads.country);
    return leadsByCountryData;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const fetchMonthlyGrowthData = async () => {
  try {
    const monthlyGrowthData = await db
      .select({
        month: sql<string>`to_char(date_trunc('month', ${leads.createdAt}), 'Mon')`,
        leads: sql<number>`count(${leads.id})`,
      })
      .from(leads)
      .groupBy(sql`date_trunc('month', ${leads.createdAt})`)
      .orderBy(sql`date_trunc('month', ${leads.createdAt})`);
    return monthlyGrowthData;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const fetchStaffAssignmentsData = async () => {
  try {
    const staffAssignmentsData = await db
      .select({
        name: user.name,
        leads: sql<number>`count(${leads.id})`,
      })
      .from(leads)
      .innerJoin(user, sql`${leads.assignedTo} = ${user.id}`)
      .groupBy(user.name)
      .orderBy(sql`count(${leads.id}) desc`);
    return staffAssignmentsData;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const fetchConversionRate = async () => {
  const convrsionRate = await db
    .select({
      total: sql<number>`count(*)`,
      converted: sql<number>`count(case when ${leads.stage} = 'won' then 1 end)`,
    })
    .from(leads);

  const total = Number(convrsionRate[0]?.total ?? 0);
  const converted = Number(convrsionRate[0]?.converted ?? 0);

  const rate = total > 0 ? (converted / total) * 100 : 0;

  // return {
  //   total,
  //   converted,
  //   rate: Number(rate.toFixed(2)),
  // };
  return Number(rate.toFixed(2));
};

export const fetchDashboardChartsData = async () => {
  const [
    leadStageData,
    leadsByCountryData,
    monthlyGrowthData,
    staffAssignmentsData,
    convrsionRate,
  ] = await Promise.all([
    fetchLeadsStageData(),
    fetchLeadsByCountryData(),
    fetchMonthlyGrowthData(),
    fetchStaffAssignmentsData(),
    fetchConversionRate(),
  ]);
  return {
    leadStageData,
    leadsByCountryData,
    monthlyGrowthData,
    staffAssignmentsData,
    convrsionRate,
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
    console.error(e);
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

export const fetchLeadsWonByUserId = async (id: string) => {
  try {
    const [wonCount] = await db
      .select({ count: count(leads.id) })
      .from(leads)
      .where(and(eq(leads.stage, "won"), eq(leads.assignedTo, id)));
    return wonCount.count;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
export const fetchLeadsLostByUserId = async (id: string) => {
  try {
    const [lostCount] = await db
      .select({ count: count(leads.id) })
      .from(leads)
      .where(and(eq(leads.stage, "lost"), eq(leads.assignedTo, id)));
    return lostCount.count;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
export const fetchUserActiveLeadsCount = async (id: string) => {
  try {
    const [activeLeadsCount] = await db
      .select({ count: count(leads.id) })
      .from(leads)
      .where(
        and(
          and(ne(leads.stage, "won"), ne(leads.stage, "lost")),
          eq(leads.assignedTo, id),
        ),
      );
    return activeLeadsCount.count;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fetchUserPerformanceDataById = async (id: string) => {
  try {
    const performanceData = await db
      .select({
        month: sql<string>`
      TO_CHAR(${leads.createdAt}, 'Mon')
    `,

        won: sql<number>`
      COUNT(*) FILTER (
        WHERE ${leads.stage} = 'won'
      )
    `,

        lost: sql<number>`
      COUNT(*) FILTER (
        WHERE ${leads.stage} = 'lost'
      )
    `,
      })
      .from(leads)
      .where(eq(leads.assignedTo, id))
      .groupBy(
        sql`TO_CHAR(${leads.createdAt}, 'Mon')`,
        sql`DATE_PART('month', ${leads.createdAt})`,
      )
      .orderBy(sql`DATE_PART('month', ${leads.createdAt})`);
    return performanceData;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fetchUserLeadsStageCountDataById = async (id: string) => {
  try {
    const [result] = await db
      .select({
        new: sql<number>`
        COUNT(*) FILTER (
          WHERE ${leads.stage} = 'new'
        )
      `,

        contacted: sql<number>`
        COUNT(*) FILTER (
          WHERE ${leads.stage} = 'contacted'
        )
      `,

        qualified: sql<number>`
        COUNT(*) FILTER (
          WHERE ${leads.stage} = 'qualified'
        )
      `,

        won: sql<number>`
        COUNT(*) FILTER (
          WHERE ${leads.stage} = 'won'
        )
      `,

        lost: sql<number>`
        COUNT(*) FILTER (
          WHERE ${leads.stage} = 'lost'
        )
      `,
      })

      .from(leads)
      .where(eq(leads.assignedTo, id));

    return [
      {
        name: "New",
        value: Number(result.new),
      },

      {
        name: "Contacted",
        value: Number(result.contacted),
      },

      {
        name: "Qualified",
        value: Number(result.qualified),
      },

      {
        name: "Won",
        value: Number(result.won),
      },

      {
        name: "Lost",
        value: Number(result.lost),
      },
    ];
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fetchAssignedLeadsById = async (id: string) => {
  try {
    const assignedLeads = await db
      .select({
        id: leads.id,
        name: leads.name,
        company: leads.company,
        stage: leads.stage,
        updatedAt: leads.updatedAt,
      })
      .from(leads)
      .where(eq(leads.assignedTo, id))
      .orderBy(desc(leads.updatedAt));
    return assignedLeads;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fetchUserMonthlyPerformance = async (id: string) => {
  try {
    const data = await db
      .select({
        monthDate: sql<string>`DATE_TRUNC('month', ${leads.createdAt})`.as(
          "month_date",
        ),
        leads: sql<number>`COUNT(${leads.id})`.as("leads"),
      })
      .from(leads)
      .where(
        and(
          eq(leads.assignedTo, id),
          sql`EXTRACT(YEAR FROM ${leads.createdAt}) = EXTRACT(YEAR FROM NOW())`,
        ),
      )

      .groupBy(sql`DATE_TRUNC('month', ${leads.createdAt})`)
      .orderBy(sql`DATE_TRUNC('month', ${leads.createdAt})`);

    return data.map((row) => {
      const date = new Date(row.monthDate);
      return {
        month: date.toLocaleString("en-US", { month: "short" }),
        leads: Number(row.leads),
      };
    });
  } catch (error) {
    throw new Error(handleError(error));
  }
};
