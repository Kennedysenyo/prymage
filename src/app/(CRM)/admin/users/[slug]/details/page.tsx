import { UserDetails } from "@/components/CRM/users/UserDetails";
import { fecthUserDetailsData } from "@/features/users/users.queries";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const { slug } = await params;
  const {
    userDetails,
    wonCount,
    lostCount,
    activeLeadsCount,
    userPerformanceData,
    userLeadStageCountData,
    userAssignedLeads,
    userActivities,
  } = await fecthUserDetailsData(slug);

  return (
    <UserDetails
      userDetails={userDetails}
      wonCount={wonCount}
      lostCount={lostCount}
      activeLeadsCount={activeLeadsCount}
      userPerformanceData={userPerformanceData}
      userLeadStageCountData={userLeadStageCountData}
      userAssignedLeads={userAssignedLeads}
      userActivities={userActivities}
    />
  );
}
