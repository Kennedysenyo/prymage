import { Profile } from "@/components/CRM/profile/Profile";
import { fetchUserProfileData } from "@/features/users/users.queries";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
  const userId = session.user.id;

  const user = await fetchUserProfileData(userId);

  return <Profile user={user} />;
}
