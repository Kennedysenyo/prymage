import { AssignStaff } from "@/components/CRM/leads/AssignStaff";
import { fetchLeadByIdAndFetchAllUsers } from "@/features/leads/leads.queries";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function AssignStaffPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const { slug: id } = await params;

  const { lead, allUsers } = await fetchLeadByIdAndFetchAllUsers(id);

  return (
    <AssignStaff actionBy={session?.user.id} lead={lead} users={allUsers} />
  );
}
