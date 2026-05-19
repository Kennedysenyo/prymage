import { EditUser } from "@/components/CRM/users/EditUser";
import { fetchUserById } from "@/features/users/users.queries";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function UserEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const { slug } = await params;

  const user = await fetchUserById(slug);

  return <EditUser user={user} />;
}
