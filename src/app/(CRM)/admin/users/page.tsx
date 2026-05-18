import { AllUsers } from "@/components/CRM/users/AllUsers";
import { fetchAllUsersTable } from "@/features/users/users.queries";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const users = await fetchAllUsersTable();

  return <AllUsers users={users} />;
}
