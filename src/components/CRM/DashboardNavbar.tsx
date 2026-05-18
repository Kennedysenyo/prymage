"use client";

import { Menu, Search, Bell, ChevronDown } from "lucide-react";

import { MenuButton } from "./MenuButton";
import { authClient } from "@/lib/better-auth/auth-client";
import { usePathname } from "next/navigation";
import { useSidarState } from "@/hooks/useSidebarState";
import { SessionType } from "@/types/global";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard Overview",
  "/dashboard/leads": "Leads Management",
  "/dashboard/users": "Users Management",
  "/dashboard/users/add": "Add New User",
  "/dashboard/analytics": "Analytics",
  "/dashboard/settings": "Settings",
};

interface Props {
  userSession: SessionType;
}

export function DashboardNavbar({ userSession: session }: Props) {
  const { handleOpen: onMenuClick } = useSidarState();

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
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-gray-600 " />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/*
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-80">
            <Search size={20} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
            />
          </div> */}

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <MenuButton user={session?.user} />
        </div>
      </div>
    </header>
  );
}
