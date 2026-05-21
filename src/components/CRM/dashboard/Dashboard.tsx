"use client";

import { motion } from "motion/react";
import {
  Briefcase,
  UserPlus,
  Phone,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  XCircle,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieLabel,
  Sector,
} from "recharts";
import { fetchDashboardData } from "@/features/leads/leads.queries";
import { capitalizeWord } from "@/lib/utils";

type DashboardData = Awaited<ReturnType<typeof fetchDashboardData>>;

interface Props extends DashboardData {}

export default function DashboardHome({
  totalLeads,
  newLeads,
  contactedLeads,
  qualifiedLeads,
  wonLeads,
  lostLeads,
  leadStageData,
  leadsByCountryData,
  monthlyGrowthData,
  staffAssignmentsData,
  convrsionRate,
}: Props) {
  const statsStyles = [
    {
      icon: Briefcase,
      label: "Total Leads",
      value: totalLeads,
      change: "+12.5%",
      trend: "up",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: UserPlus,
      label: "New Leads",
      value: newLeads,
      change: "+23.1%",
      trend: "up",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Phone,
      label: "Contacted",
      value: contactedLeads,
      change: "+8.2%",
      trend: "up",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: CheckCircle,
      label: "Qualified",
      value: qualifiedLeads,
      change: "+15.3%",
      trend: "up",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: TrendingUp,
      label: "Won Leads",
      value: wonLeads,
      change: "+18.7%",
      trend: "up",
      color: "from-[#D4A24C] to-yellow-600",
    },
    {
      icon: XCircle,
      label: "Lost Leads",
      value: lostLeads,
      change: "-5.4%",
      trend: "down",
      color: "from-red-500 to-red-600",
    },
  ];

  const leadsByStageColors = [
    { name: "New", color: "#22c55e" },
    { name: "Contacted", color: "#a855f7" },
    { name: "Qualified", color: "#6366f1" },
    { name: "Won", color: "#D4A24C" },
    { name: "Lost", color: "#ef4444" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsStyles.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-start justify-center mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
              >
                <stat.icon size={24} className="text-white" />
              </div>
              {/* <div
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
              </div> */}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1 text-center">
              {stat.value}
            </h3>
            <p className="text-gray-600 text-center">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Leads by Stage
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadStageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                dataKey="value"
                shape={(props: any) => {
                  const { index, fill, ...rest } = props;

                  const sliceColor = leadsByStageColors[index]?.color || fill;

                  return <Sector {...rest} fill={sliceColor} />;
                }}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Leads by Country
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={leadsByCountryData.map((lead) => ({
                ...lead,
                name: capitalizeWord(lead.name),
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#5B2CA5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Monthly Lead Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#D4A24C"
                strokeWidth={3}
                dot={{ fill: "#D4A24C", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Assigned Leads Per Staff
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={staffAssignmentsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="leads" fill="#5B2CA5" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-2xl p-8 shadow-lg text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Conversion Rate</h3>
            <p className="text-white/80 mb-4">
              Overall lead-to-customer conversion
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">{convrsionRate}%</span>
              {/* <span className="text-green-300 flex items-center gap-1">
                <TrendingUp size={20} />
                +3.2%
              </span> */}
            </div>
          </div>
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Users size={64} className="text-white" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
