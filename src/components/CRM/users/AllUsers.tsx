"use client";

import { motion } from "motion/react";
import { useState } from "react";

import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserPlus,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

interface Staff {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Staff";
  leadsAssigned: number;
  dateCreated: string;
  avatar: string;
}

export function AllUsers() {
  const [searchTerm, setSearchTerm] = useState("");

  const users: Staff[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@prymage.com",
      role: "Admin",
      leadsAssigned: 45,
      dateCreated: "2023-01-15",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@prymage.com",
      role: "Staff",
      leadsAssigned: 38,
      dateCreated: "2023-03-22",
      avatar: "JS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@prymage.com",
      role: "Staff",
      leadsAssigned: 32,
      dateCreated: "2023-05-10",
      avatar: "MJ",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@prymage.com",
      role: "Staff",
      leadsAssigned: 28,
      dateCreated: "2023-07-18",
      avatar: "SW",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@prymage.com",
      role: "Staff",
      leadsAssigned: 24,
      dateCreated: "2024-01-05",
      avatar: "DB",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
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
                      <div className="w-10 h-10 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center text-white font-semibold">
                        {user.avatar}
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
                        user.role === "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {user.leadsAssigned}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {user.dateCreated}
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="bg-white rounded-xl shadow-lg border border-gray-200 py-2 w-48 z-50"
                          sideOffset={5}
                        >
                          <DropdownMenu.Item asChild>
                            <Link
                              href={`/dashboard/users/${user.id}`}
                              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer outline-none"
                            >
                              <Eye size={16} />
                              View User
                            </Link>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <Link
                              href={`/dashboard/users/edit/${user.id}`}
                              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer outline-none"
                            >
                              <Edit size={16} />
                              Edit User
                            </Link>
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                          <DropdownMenu.Item className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer outline-none">
                            <Trash2 size={16} />
                            Delete User
                          </DropdownMenu.Item>
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

      <div className="lg:hidden space-y-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center text-white font-semibold">
                {user.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  user.role === "Admin"
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
                {user.dateCreated}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/dashboard/users/${user.id}`}
                className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                View
              </Link>
              <Link
                href={`/dashboard/users/edit/${user.id}`}
                className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-lg hover:shadow-lg transition-all"
              >
                Edit
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
