import { LeadDetails } from "@/components/CRM/leads/LeadDetails";
import { fetchLeadDetailsById } from "@/features/leads/leads.queries";
import { getSession } from "@/lib/better-auth/auth-helpers";

import { redirect } from "next/navigation";

export default async function LeadDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const { slug: id } = await params;
  const { lead, notes, history } = await fetchLeadDetailsById(id);
  return (
    <LeadDetails
      userId={session?.user.id}
      leadId={id}
      lead={lead}
      notes={notes}
      history={history}
    />
  );
}
