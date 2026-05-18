import { authClient } from "@/lib/better-auth/auth-client";

export type SessionType = Awaited<ReturnType<typeof authClient.getSession>>;
