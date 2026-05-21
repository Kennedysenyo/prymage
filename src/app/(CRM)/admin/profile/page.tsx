import { Profile } from "@/components/CRM/profile/Profile";
import { fetchUserAndPerformanceDetails } from "@/features/users/users.queries";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
  const userId = session.user.id;

  const { userDetails, userPerformanceData } =
    await fetchUserAndPerformanceDetails(userId);

  return (
    <Profile user={userDetails} monthlyPerformance={userPerformanceData} />
  );
}
