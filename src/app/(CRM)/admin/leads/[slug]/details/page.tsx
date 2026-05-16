"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  User,
  Briefcase,
  Clock,
  CheckCircle,
  MessageSquare,
  UserPlus,
  Edit,
} from "lucide-react";

export default function LeadDetailsPage() {
  const [newNote, setNewNote] = useState("");
  const [selectedStage, setSelectedStage] = useState("qualified");

  const lead = {
    id: 1,
    name: "Kwame Mensah",
    company: "Accra Manufacturing Ltd",
    email: "kwame@accramfg.com",
    phone: "+233 24 111 2221",
    interest: "ERPNext",
    country: "Ghana",
    stage: "qualified",
    assignedStaff: "John Doe",
    createdDate: "2024-05-12",
  };

  const stages = ["new", "contacted", "qualified", "won", "lost"];

  const getStageBadge = (stage: string) => {
    const badges = {
      new: "bg-green-100 text-green-700 border-green-200",
      contacted: "bg-purple-100 text-purple-700 border-purple-200",
      qualified: "bg-blue-100 text-blue-700 border-blue-200",
      won: "bg-yellow-100 text-yellow-700 border-yellow-200",
      lost: "bg-red-100 text-red-700 border-red-200",
    };
    return badges[stage as keyof typeof badges] || badges.new;
  };

  const notes = [
    {
      id: 1,
      staff: "John Doe",
      avatar: "JD",
      timestamp: "2024-05-14 10:30 AM",
      content:
        "Initial contact made via email. Client expressed strong interest in ERPNext for their manufacturing operations.",
    },
    {
      id: 2,
      staff: "John Doe",
      avatar: "JD",
      timestamp: "2024-05-15 2:45 PM",
      content:
        "Follow-up call completed. Discussed pricing and implementation timeline. Client wants a demo next week.",
    },
    {
      id: 3,
      staff: "Sarah Wilson",
      avatar: "SW",
      timestamp: "2024-05-16 9:15 AM",
      content:
        "Demo scheduled for May 20th at 3:00 PM. Prepared customized presentation focusing on manufacturing modules.",
    },
  ];

  const timeline = [
    {
      id: 1,
      icon: UserPlus,
      label: "Lead Created",
      description: "Lead added to CRM",
      timestamp: "2024-05-12 9:00 AM",
      color: "text-green-600",
    },
    {
      id: 2,
      icon: MessageSquare,
      label: "Stage Changed",
      description: "New → Contacted",
      timestamp: "2024-05-14 10:30 AM",
      color: "text-purple-600",
    },
    {
      id: 3,
      icon: Edit,
      label: "Note Added",
      description: "Follow-up call completed",
      timestamp: "2024-05-15 2:45 PM",
      color: "text-blue-600",
    },
    {
      id: 4,
      icon: CheckCircle,
      label: "Stage Changed",
      description: "Contacted → Qualified",
      timestamp: "2024-05-16 9:00 AM",
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {lead.name}
              </h2>
              <p className="text-lg text-gray-600">{lead.company}</p>
            </div>
            <span
              className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStageBadge(lead.stage)}`}
            >
              {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{lead.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{lead.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium text-gray-900">{lead.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <MapPin size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium text-gray-900">{lead.country}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Briefcase size={20} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Interest</p>
                <p className="font-medium text-gray-900">{lead.interest}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <User size={20} className="text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Assigned Staff</p>
                <p className="font-medium text-gray-900">
                  {lead.assignedStaff}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Created Date</p>
                <p className="font-medium text-gray-900">{lead.createdDate}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Update Stage</h3>

          <div className="space-y-3 mb-6">
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  selectedStage === stage
                    ? `${getStageBadge(stage)} font-semibold`
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </button>
            ))}
          </div>

          <button className="w-full px-4 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all">
            Update Stage
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Follow-Up Notes
          </h3>

          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {note.avatar}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">
                        {note.staff}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        {note.timestamp}
                      </p>
                    </div>
                    <p className="text-gray-700">{note.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-3">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a follow-up note..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors resize-none"
              rows={3}
            />
            <button className="w-full px-4 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all">
              Add Note
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Activity Timeline
          </h3>

          <div className="space-y-6">
            {timeline.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex gap-4 relative"
              >
                {index < timeline.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-200" />
                )}
                <div
                  className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 ${event.color}`}
                >
                  <event.icon size={20} />
                </div>
                <div className="flex-1 pb-6">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {event.label}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    {event.description}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    {event.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
