import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
  const userId = session.user.id;
  return <div>Profile Page</div>;
}
