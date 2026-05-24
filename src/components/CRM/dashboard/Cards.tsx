"use client";

import {
  Briefcase,
  CheckCircle,
  Phone,
  TrendingDown,
  TrendingUp,
  UserPlus,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { CardsData } from "@/features/leads/leads.types";

interface Props {
  stats: CardsData;
}
export const Cards = ({ stats }: Props) => {
  const data = [
    {
      icon: Briefcase,
      label: "Total Leads",
      value: stats.totalLeads.value,
      change: stats.totalLeads.change,
      trend: stats.totalLeads.trend,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: UserPlus,
      label: "New Leads",
      value: stats.newLeads.value,
      change: stats.newLeads.change,
      trend: stats.newLeads.trend,
      color: "from-green-500 to-green-600",
    },
    {
      icon: Phone,
      label: "Contacted",
      value: stats.contactedLeads.value,
      change: stats.contactedLeads.change,
      trend: stats.contactedLeads.trend,
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: CheckCircle,
      label: "Qualified",
      value: stats.qualifiedLeads.value,
      change: stats.qualifiedLeads.change,
      trend: stats.qualifiedLeads.trend,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: TrendingUp,
      label: "Won Leads",
      value: stats.wonLeads.value,
      change: stats.wonLeads.change,
      trend: stats.wonLeads.trend,
      color: "from-[#D4A24C] to-yellow-600",
    },
    {
      icon: XCircle,
      label: "Lost Leads",
      value: stats.lostLeads.value,
      change: stats.lostLeads.change,
      trend: stats.lostLeads.trend,
      color: "from-red-500 to-red-600",
    },
  ];

  const CardElements = data.map((stat, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
        >
          <stat.icon size={24} className="text-white" />
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
            stat.trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {stat.trend === "up" ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          <span className="text-sm font-semibold">{stat.change}</span>
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
      <p className="text-gray-600">{stat.label}</p>
    </motion.div>
  ));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {CardElements}
    </div>
  );
};
