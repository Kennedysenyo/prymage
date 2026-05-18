import { AllLeads } from "@/components/CRM/leads/AllLeads";
import { fetchAllLeads } from "@/features/leads/leads.queries";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

export default async function LeadsPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const leads = await fetchAllLeads();
  return <AllLeads leads={leads} />;
}
