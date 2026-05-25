"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { Search, MoreVertical, Eye, Edit, UserPlus } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { capitalizeWord } from "@/lib/utils";
import { DeleteButton } from "../DeleteButton";
import { deleteUserById } from "@/features/users/users.service";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: "admin" | "staff";
  leadsAssigned: number;
  createdAt: Date;
}

interface Props {
  users: User[];
}

export function AllUsers({ users }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center px-2">
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative ">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 text-gray-600 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
            />
          </div>
        </div>

        <Link href="/admin/users/add">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all">
            <UserPlus size={20} />
            Add User
          </button>
        </Link>
      </div>

      <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Leads Assigned
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date Created
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center text-white overflow-hidden font-semibold">
                        <Image
                          src={user?.image ?? "/assets/default-image.png"}
                          alt={user?.name ?? "Note Author"}
                          width={40}
                          height={40}
                          loading="eager"
                          className="object-cover object-center"
                        />
                      </div>
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {capitalizeWord(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {user.leadsAssigned}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <MoreVertical size={18} className="text-gray-600" />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="bg-white rounded-xl shadow-lg border border-gray-200 py-2 w-48 z-50"
                          sideOffset={5}
                        >
                          <DropdownMenu.Item asChild>
                            <Link
                              href={`/admin/users/${user.id}/details`}
                              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer outline-none"
                            >
                              <Eye size={16} />
                              View User
                            </Link>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <Link
                              href={`/admin/users/${user.id}/edit`}
                              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer outline-none"
                            >
                              <Edit size={16} />
                              Edit User
                            </Link>
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                          <DeleteButton
                            resource="user"
                            id={user.id}
                            deleteServerAction={deleteUserById}
                          />
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:hidden space-y-4 pl-2">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative shrink-0 w-12 h-12 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full overflow-hidden flex items-center justify-center text-white font-semibold">
                <Image
                  src={user?.image ?? "/assets/default-image.png"}
                  alt={user?.name ?? "Note Author"}
                  width={48}
                  height={48}
                  loading="eager"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex-1  truncate">
                <h3 className="font-bold text-gray-900 ">{user.name}</h3>
                <p className="text-sm text-gray-500 ">{user.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <p className="text-gray-600">
                <span className="font-medium">Leads Assigned:</span>{" "}
                {user.leadsAssigned}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Date Created:</span>{" "}
                {user.createdAt.toDateString()}
              </p>
            </div>
            <Link
              href={`/admin/leads/${user.id}/details`}
              className="mt-4 block w-full text-center px-4 py-2 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-lg hover:shadow-lg transition-all"
            >
              View
            </Link>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/admin/users/${user.id}/details`}
                className="mt-4 flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                View
              </Link>
              <span className="flex-1 mt-4">
                <DeleteButton
                  resource="user"
                  id={user.id}
                  deleteServerAction={deleteUserById}
                />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
