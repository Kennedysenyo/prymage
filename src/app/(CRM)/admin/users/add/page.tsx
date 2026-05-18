import AddUser from "@/components/CRM/users/AddUsers";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function AddUserPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  return <AddUser />;
}
