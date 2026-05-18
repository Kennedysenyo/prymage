"use client";

import { motion } from "motion/react";
import { useState } from "react";

import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { LeadsTable } from "@/features/leads/leads.types";

interface Props {
  leads: LeadsTable[];
}

export function AllLeads({ leads }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStageBadge = (stage: string) => {
    const badges = {
      new: "bg-green-100 text-green-700",
      contacted: "bg-purple-100 text-purple-700",
      qualified: "bg-blue-100 text-blue-700",
      won: "bg-yellow-100 text-yellow-700",
      lost: "bg-red-100 text-red-700",
    };
    return badges[stage as keyof typeof badges] || badges.new;
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "all" || lead.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(
    startIndex,
    startIndex + itemsPerPage,
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
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="flex-1 sm:flex-none px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
          >
            <option value="all">All Stages</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Lead Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Interest
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Country
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Stage
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Assigned Staff
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{lead.company}</td>
                  <td className="px-6 py-4 text-gray-700">{lead.interest}</td>
                  <td className="px-6 py-4 text-gray-700">{lead.country}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${getStageBadge(lead.stage)}`}
                    >
                      {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{lead.assignedTo}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {lead.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <MoreVertical size={18} className="text-gray-500" />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="bg-white rounded-xl shadow-lg border border-gray-200 py-2 w-48 z-50"
                          sideOffset={5}
                        >
                          <DropdownMenu.Item asChild>
                            <Link
                              href={`/admin/leads/${lead.id}/details`}
                              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer outline-none"
                            >
                              <Eye size={16} />
                              View Lead
                            </Link>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer outline-none">
                            <Link
                              href={"/"}
                              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer outline-none"
                            >
                              <Edit size={16} />
                              Edit Lead
                            </Link>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer outline-none">
                            <UserPlus size={16} />
                            Assign Staff
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                          <DropdownMenu.Item className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer outline-none">
                            <Trash2 size={16} />
                            Delete Lead
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
        {paginatedLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{lead.name}</h3>
                <p className="text-sm text-gray-500">{lead.company}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-medium ${getStageBadge(lead.stage)}`}
              >
                {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {lead.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Interest:</span> {lead.interest}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Country:</span> {lead.country}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Assigned:</span> {lead.assignedTo}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Created:</span>{" "}
                {lead.createdAt.toLocaleDateString()}
              </p>
            </div>
            <Link
              href={`/dashboard/leads/${lead.id}`}
              className="mt-4 block w-full text-center px-4 py-2 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-lg hover:shadow-lg transition-all"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-lg border border-gray-100">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredLeads.length)} of{" "}
            {filteredLeads.length} leads
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-[#5B2CA5] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
