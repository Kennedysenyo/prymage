import { DashboardNavbar } from "@/components/CRM/DashboardNavbar";
import { Sidebar } from "@/components/CRM/Sidebar";
import { getSession } from "@/lib/better-auth/auth-helpers";
import { SidebarProvider } from "@/providers/SidebarProvider";
import { ReactNode } from "react";

export default async function CRMLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-[#f7f7fa] ">
      <SidebarProvider>
        <Sidebar session={session} />
        <div className="lg:pl-64">
          <DashboardNavbar userSession={session} />
          <div className="p-4">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
