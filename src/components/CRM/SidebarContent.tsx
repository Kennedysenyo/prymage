"use client";

import Link from "next/link";
import { LogOutButton } from "./LogOutButton";
import { Briefcase, LayoutDashboard, UserPlus, Users, X } from "lucide-react";
import { useSidarState } from "@/hooks/useSidebarState";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SessionType } from "@/types/global";
import Image from "next/image";

interface Props {
  session: SessionType;
}

export const SidebarContent = ({ session }: Props) => {
  const { handleOpen: onClose } = useSidarState();

  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === path;
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
      staffFriendly: true,
    },
    {
      icon: Briefcase,
      label: "Leads",
      path: "/admin/leads",
      staffFriendly: true,
    },
    // { icon: FileText, label: "Lead Details", path: "/dashboard/leads/1",staffFriendly: true },
    { icon: Users, label: "Users", path: "/admin/users", staffFriendly: false },
    {
      icon: UserPlus,
      label: "Add User",
      path: "/admin/users/add",
      staffFriendly: false,
    },
    // { icon: TrendingUp, label: "Analytics", path: "/dashboard/analytics",staffFriendly: false },
    // { icon: Settings, label: "Settings", path: "/admin/settings",staffFriendly: false },
  ];
  return (
    <div className="h-full flex flex-col bg-[#181225] text-white">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
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
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${session?.user?.role === "staff" && !item.staffFriendly ? "hidden" : ""}`,
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
            <div className="w-10 h-10 relative overflow-hidden bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center">
              <Image
                src={session?.user?.image ?? "/assets/default-image.png"}
                alt={session?.user?.name ?? "Note Author"}
                width={40}
                height={40}
                loading="eager"
                className="object-cover object-center"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">
                {session?.user?.name}
              </p>
              <p className="text-white/60 text-sm truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>
        <LogOutButton />
      </div>
    </div>
  );
};
