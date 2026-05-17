import { AllLeads } from "@/components/CRM/leads/AllLeads";
import { fetchAllLeads } from "@/features/leads/leads.queries";

export default async function LeadsPage() {
  const leads = await fetchAllLeads();
  return <AllLeads leads={leads} />;
}
