"use server";

import { user } from "@/lib/db/auth-schema";
import { db } from "@/lib/db/db";
import { leads } from "@/lib/db/schema";
import { handleError } from "@/lib/utils";
import { count, desc, eq } from "drizzle-orm";

export const fetchAllUsers = async () => {
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
