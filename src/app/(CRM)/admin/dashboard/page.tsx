import DashboardHome from "@/components/CRM/dashboard/Dashboard";
import { fetchDashboardCardStats } from "@/features/leads/leads.queries";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function DashboardHomePage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const {
    totalLeads,
    newLeads,
    contactedLeads,
    qualifiedLeads,
    wonLeads,
    lostLeads,
  } = await fetchDashboardCardStats();

  return (
    <DashboardHome
      stats={{
        totalLeads,
        newLeads,
        contactedLeads,
        qualifiedLeads,
        wonLeads,
        lostLeads,
      }}
    />
  );
}
