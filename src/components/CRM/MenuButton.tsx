"use client";

import { logOut } from "@/features/auth/auth.service";
import { cn } from "@/lib/utils";
import { ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

interface Props {
  user:
    | {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        banned: boolean | null | undefined;
        role?: string | null | undefined;
        banReason?: string | null | undefined;
        banExpires?: Date | null | undefined;
      }
    | undefined;
}

export const MenuButton = ({ user }: Props) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleLogout = () => {
    let res: string | null = null;
    startTransition(async () => {
      res = await logOut();
    });
    if (res) {
      toast.error(res);
    } else {
      toast.success("Logged out successfully!");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center">
          <img
            className="w-full h-full rounded-full"
            src={user?.image ?? "/assets/default-image.png"}
            alt={user?.name ?? "Note Author"}
          />
        </div>
        <ChevronDown size={16} className="hidden sm:block" />
      </button>

      {showUserMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowUserMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <Link
              href="/admin/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              href="/admin/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
            <hr className="my-2" />
            <button
              onClick={handleLogout}
              className={cn(
                "block px-4 py-2 w-full text-sm text-red-600 hover:bg-gray-100",
                pending && "pointer-events-none",
              )}
            >
              {pending ? (
                <Loader2 size={18} className="animate-spin mx-auto" />
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
