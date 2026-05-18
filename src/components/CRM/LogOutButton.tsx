"use client";

import { logOut } from "@/features/auth/auth.service";
import { Loader2, LogOut } from "lucide-react";
import { useTransition } from "react";
import toast from "react-hot-toast";

export const LogOutButton = () => {
  const [pending, startTransition] = useTransition();

  const handleLogout = () => {
    let response: string | null = null;
    startTransition(async () => {
      response = await logOut();
      if (response) {
        toast.error(response);
      } else {
        toast.success("Logged out successfully!");
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
    >
      <LogOut size={20} />
      {pending ? (
        <Loader2 size={18} className="animate-spin " />
      ) : (
        <span>Logout</span>
      )}
    </button>
  );
};
