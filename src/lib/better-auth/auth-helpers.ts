"use server";

import { headers } from "next/headers";
import { auth } from "./auth";

export const getSession = async () => {
  const res = await auth.api.getSession({
    headers: await headers(),
  });
  return res;
};
