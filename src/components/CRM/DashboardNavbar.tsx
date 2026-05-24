"use client";

import { Menu } from "lucide-react";

import { MenuButton } from "./MenuButton";

import { usePathname } from "next/navigation";
import { useSidarState } from "@/hooks/useSidebarState";
import { SessionType } from "@/types/global";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard Overview",
  "/admin/leads": "Leads Management",
  "/admin/users": "Users Management",
  "/admin/users/add": "Add New User",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
  "/admin/profile": "Profile",
};

interface Props {
  userSession: SessionType;
}

export function DashboardNavbar({ userSession: session }: Props) {
  const { handleOpen: onMenuClick } = useSidarState();

  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.match(/^\/admin\/leads\/[^/]+\/details$/)) {
      return "Lead Details";
    }
    if (pathname.match(/^\/admin\/users\/[^/]+\/edit$/)) {
      return "Edit User";
    }
    if (pathname.match(/^\/admin\/users\/[^/]+\/details$/)) {
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

          {/* <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button> */}

          <MenuButton user={session?.user} />
        </div>
      </div>
    </header>
  );
}
