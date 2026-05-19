import { UserDetails } from "@/components/CRM/users/UserDetails";
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
  return <UserDetails />;
}
