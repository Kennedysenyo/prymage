import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  return (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center">
          <img
            className="w-full h-full"
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
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
            <hr className="my-2" />
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
