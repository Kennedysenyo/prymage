"use client";

import { DashboardNavbar } from "@/components/CRM/DashboardNavbar";
import { Sidebar } from "@/components/CRM/Sidebar";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard Overview",
  "/dashboard/leads": "Leads Management",
  "/dashboard/users": "Users Management",
  "/dashboard/users/add": "Add New User",
  "/dashboard/analytics": "Analytics",
  "/dashboard/settings": "Settings",
};

export default function CRMLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.match(/\/dashboard\/leads\/\d+/)) {
      return "Lead Details";
    }
    if (pathname.match(/\/dashboard\/users\/edit\/\d+/)) {
      return "Edit User";
    }
    if (pathname.match(/\/dashboard\/users\/\d+/)) {
      return "User Details";
    }
    return pageTitles[pathname] || "Dashboard";
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa] ">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64 pr-6">
        <DashboardNavbar
          onMenuClick={() => setSidebarOpen(true)}
          title={getPageTitle()}
        />
        {children}
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
