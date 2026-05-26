"use client";

import { motion } from "motion/react";
import { useState, useTransition } from "react";

import {
  ArrowLeft,
  Search,
  CheckCircle,
  User,
  Briefcase,
  Mail,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { capitalizeWord } from "@/lib/utils";
import { assignStaff } from "@/features/leads/leads.service";
import toast from "react-hot-toast";

import { AssignStaffUsers } from "@/features/users/users.types";
import { AssignStaffLead } from "@/features/leads/leads.types";
import Image from "next/image";

interface Props {
  actionBy: string;
  lead: AssignStaffLead;
  users: AssignStaffUsers;
}

export function AssignStaff({ actionBy, lead, users }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(lead.assignedTo);
  const [pending, startTransition] = useTransition();

  const filteredStaff = users.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // const getAvailabilityBadge = (availability: string) => {
  //   const badges = {
  //     available: {
  //       bg: "bg-green-100",
  //       text: "text-green-700",
  //       label: "Available",
  //     },
  //     busy: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Busy" },
  //     full: { bg: "bg-red-100", text: "text-red-700", label: "At Capacity" },
  //   };
  //   return badges[availability as keyof typeof badges] || badges.available;
  // };

  const handleAssign = () => {
    if (selectedStaff && lead.assignedTo !== selectedStaff) {
      let res: string | null = null;
      startTransition(async () => {
        res = await assignStaff({
          leadId: lead.id,
          staffId: selectedStaff,
          actionBy,
        });

        if (res) {
          toast.error(res);
        } else {
          toast.success("Assigned staff successfully!");
          // router.push(`/admin/leads/${lead.id}/details`);
        }
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Link
        href={`/admin/leads/${lead.id}/details`}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Lead Details
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-fit"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Lead Information
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#5B2CA5]/10 to-[#D4A24C]/10 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center text-white font-bold">
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 truncate">{lead.name}</p>
                <p className="text-sm text-gray-600 truncate">{lead.company}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{lead.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase
                  size={18}
                  className="text-gray-400 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-sm text-gray-500">Interest</p>
                  <p className="text-gray-900">
                    {capitalizeWord(lead.interest)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Currently Assigned</p>
                  <p className="text-gray-900 font-medium">
                    {lead.assignedUser ?? "None"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
              <span>
                <p className="text-sm text-gray-500 mb-2">Stage</p>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                  {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
                </span>
              </span>
              <Link
                href={`/admin/leads/${lead.id}/details`}
                className="px-6 py-3 rouded-lg bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all"
              >
                View Lead
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Select Staff Member
            </h3>

            <div className="mb-6">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search staff by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 text-gray-600 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredStaff.map((staff, index) => {
                // const badge = getAvailabilityBadge(staff.availability);
                const isSelected = selectedStaff === staff.id;

                return (
                  <motion.div
                    key={staff.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => setSelectedStaff(staff.id)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-[#5B2CA5] bg-[#5B2CA5]/5 shadow-lg"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-[#5B2CA5] rounded-full flex items-center justify-center">
                          <CheckCircle size={16} className="text-white" />
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 overflow-hidden bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                        <Image
                          src={staff.image ?? "/assets/default-image.png"}
                          alt={staff.name ?? "Note Author"}
                          width={48}
                          height={48}
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">
                              {staff.name}
                            </h4>
                            <p className="text-sm text-gray-600 truncate">
                              {staff.position}
                            </p>
                          </div>
                          {/* <span
                            className={`px-3 py-1 ${badge.bg} ${badge.text} rounded-lg text-xs font-medium whitespace-nowrap`}
                          >
                            {badge.label}
                          </span> */}
                        </div>

                        <p className="text-sm text-gray-600 mb-3 truncate">
                          {staff.email}
                        </p>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Briefcase size={16} className="text-gray-400" />
                            <span className="text-gray-600">
                              {staff.leadsAssigned} leads assigned
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {filteredStaff.length === 0 && (
                <div className="text-center py-12">
                  <User size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No staff members found</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex gap-4">
              <Link href={`/admin/leads`} className="flex-1">
                <button className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              </Link>
              <button
                onClick={handleAssign}
                disabled={!selectedStaff}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pending ? (
                  <Loader2 size={18} className="animate-spin mx-auto" />
                ) : selectedStaff ? (
                  "Assign Staff"
                ) : (
                  "Select Staff Member"
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
