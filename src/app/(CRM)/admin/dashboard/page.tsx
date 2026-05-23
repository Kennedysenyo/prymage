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

  // TODO: Implement streaming

  const {
    totalLeads,
    newLeads,
    contactedLeads,
    qualifiedLeads,
    wonLeads,
    lostLeads,
  } = await fetchDashboardCardStats();

  const {
    leadStageData,
    leadsByCountryData,
    monthlyGrowthData,
    staffAssignmentsData,
    convrsionRate,
  } = await fetchDashboardChartsData();

  return (
    <DashboardHome
      totalLeads={totalLeads}
      newLeads={newLeads}
      contactedLeads={contactedLeads}
      qualifiedLeads={qualifiedLeads}
      wonLeads={wonLeads}
      lostLeads={lostLeads}
      leadStageData={leadStageData}
      leadsByCountryData={leadsByCountryData}
      monthlyGrowthData={monthlyGrowthData}
      staffAssignmentsData={staffAssignmentsData}
      convrsionRate={convrsionRate}
    />
  );
}
