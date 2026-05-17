"use client";

import { motion } from "motion/react";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  TrendingUp,
  Settings,
  X,
  Briefcase,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOutButton } from "./LogOutButton";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Briefcase, label: "Leads", path: "/admin/leads" },
    // { icon: FileText, label: "Lead Details", path: "/dashboard/leads/1" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: UserPlus, label: "Add User", path: "/admin/users/add" },
    // { icon: TrendingUp, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-[#181225] text-white">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#D4A24C] to-yellow-400 bg-clip-text text-transparent">
            Prymage
          </span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden text-white/80 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
              isActive(item.path)
                ? "bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10",
            )}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/10 rounded-xl p-4 mb-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">Admin User</p>
              <p className="text-white/60 text-sm truncate">
                admin@prymage.com
              </p>
            </div>
          </div>
        </div>
        <LogOutButton />
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-40">
        <SidebarContent />
      </aside>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-64 z-50 lg:hidden"
          >
            <SidebarContent />
          </motion.aside>
        </>
      )}
    </>
  );
}
