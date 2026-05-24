import DashboardHome from "@/components/CRM/dashboard/Dashboard";
import {
  fetchDashboardCardStats,
  fetchDashboardChartsData,
} from "@/features/leads/leads.queries";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function DashboardHomePage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const cardsData = await fetchDashboardCardStats();

  const chartsData = await fetchDashboardChartsData();

  return (
    <DashboardHome
      cardsData={cardsData}
      chartsData={chartsData}
      role={session?.user.role}
    />
  );
}
