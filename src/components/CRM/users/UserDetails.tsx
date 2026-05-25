"use client";

import { motion } from "motion/react";

import {
  Mail,
  Shield,
  Calendar,
  Briefcase,
  TrendingUp,
  Clock,
  Edit,
  CheckCircle,
  XCircle,
  Phone,
  ArrowLeft,
  UserPlus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Sector,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { fecthUserDetailsData } from "@/features/users/users.queries";
import { addHistoryIcons, capitalizeWord } from "@/lib/utils";
import Image from "next/image";
type UserDetailsDataType = Awaited<ReturnType<typeof fecthUserDetailsData>>;
interface Props extends UserDetailsDataType {}

export function UserDetails({
  userDetails: user,
  wonCount,
  lostCount,
  activeLeadsCount,
  userPerformanceData,
  userLeadStageCountData,
  userAssignedLeads,
  userActivities,
}: Props) {
  // const recentActivity = [
  //   {
  //     id: 1,
  //     action: "Won Lead",
  //     description: "Closed deal with Ama Osei - Royal Motors",
  //     timestamp: "2024-05-12 3:30 PM",
  //     icon: CheckCircle,
  //     color: "text-green-600",
  //   },
  //   {
  //     id: 2,
  //     action: "Contacted Lead",
  //     description: "Follow-up call with Kwame Mensah",
  //     timestamp: "2024-05-11 10:15 AM",
  //     icon: Phone,
  //     color: "text-blue-600",
  //   },
  //   {
  //     id: 3,
  //     action: "Lead Assigned",
  //     description: "New lead assigned: Abena Asante",
  //     timestamp: "2024-05-10 2:45 PM",
  //     icon: Briefcase,
  //     color: "text-purple-600",
  //   },
  //   {
  //     id: 4,
  //     action: "Lost Lead",
  //     description: "Lead declined - Budget constraints",
  //     timestamp: "2024-05-09 11:20 AM",
  //     icon: XCircle,
  //     color: "text-red-600",
  //   },
  // ];

  const leadsByStageColors = [
    { name: "New", color: "#22c55e" },
    { name: "Contacted", color: "#a855f7" },
    { name: "Qualified", color: "#6366f1" },
    { name: "Won", color: "#D4A24C" },
    { name: "Lost", color: "#ef4444" },
  ];

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

  return (
    <div className="space-y-6">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Users
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-fit"
        >
          <div className="text-center mb-6">
            <div className="w-24 h-24 relative bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 overflow-hidden">
              <Image
                src={user?.image ?? "/assets/default-image.png"}
                alt={user?.name ?? "Note Author"}
                width={96}
                height={96}
                loading="eager"
                className="object-cover object-center"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {user.name}
            </h2>
            <p className="text-gray-600 mb-3">{user.email}</p>
            <span
              className={`inline-block px-4 py-2 rounded-xl text-sm font-semibold ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {capitalizeWord(user.role)}
            </span>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Mail size={20} className="text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900 truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Briefcase size={20} className="text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">Position</p>
                <p className="text-gray-900">{user.position}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Phone size={20} className="text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900 truncate">{user.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Shield size={20} className="text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-gray-900">{capitalizeWord(user.role)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <UserPlus size={20} className="text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">Leads Assigned</p>
                <p className="text-gray-900 font-bold">{user.leadsCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Calendar size={20} className="text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-gray-900">{user.createdAt.toDateString()}</p>
              </div>
            </div>
          </div>

          <Link href={`/admin/users/${user.id}/edit`}>
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all">
              <Edit size={20} />
              Edit User
            </button>
          </Link>
        </motion.div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Leads Won</p>
                  <p className="text-2xl font-bold text-gray-900">{wonCount}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Leads Lost</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {lostCount}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Leads</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeLeadsCount}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Performance
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={userPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="won" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="lost" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Leads by Stage
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={userLeadStageCountData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    dataKey="value"
                    shape={(props: any) => {
                      const { index, fill, ...rest } = props;

                      const sliceColor =
                        leadsByStageColors[index]?.color || fill;

                      return <Sector {...rest} fill={sliceColor} />;
                    }}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Assigned Leads
            </h3>
            <div className="space-y-3">
              {userAssignedLeads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{lead.name}</h4>
                    <p className="text-sm text-gray-600">{lead.company}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${getStageBadge(lead.stage)}`}
                    >
                      {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
                    </span>
                    <p className="text-sm text-gray-500">
                      {lead.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {userActivities
                .map((hist) => addHistoryIcons(hist))
                .map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="flex gap-4"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 ${activity.color} `}
                    >
                      <activity.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {activity.activity}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock size={12} />
                        {activity.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
