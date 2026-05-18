import Settings from "@/components/CRM/settings/Settings";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function DashboardHomePage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  return <Settings />;
}
