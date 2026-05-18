import { AllUsers } from "@/components/CRM/users/AllUsers";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  return <AllUsers />;
}
