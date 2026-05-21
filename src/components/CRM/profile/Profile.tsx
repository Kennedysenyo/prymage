"use client";

import { motion } from "motion/react";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Bell,
  Shield,
  Save,
  CheckCircle,
  Briefcase,
  Calendar,
  TrendingUp,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  UserMonthlyPerformanceData,
  UserProfileData,
  UserProfileUpdateData,
  UserProfileUpdateFormResponseType,
} from "@/features/users/users.types";
import { capitalizeWord, cn } from "@/lib/utils";
import { validateProfileForm } from "@/features/users/users.service";
import toast from "react-hot-toast";

interface Props {
  user: UserProfileData;
  monthlyPerformance: UserMonthlyPerformanceData;
}

export function Profile({ user, monthlyPerformance }: Props) {
  const [activeTab, setActiveTab] = useState<
    "personal" | "security" | "notifications"
  >("personal");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<UserProfileUpdateData>({
    ...user,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const initialState: UserProfileUpdateFormResponseType = {
    success: false,
    errorMessage: null,
    errors: {},
  };

  const [personalDataState, dataFormAction, isPending] = useActionState(
    validateProfileForm,
    initialState,
  );

  useEffect(() => {
    if (personalDataState.success) {
      toast.success("Updated successfully!");
    }
  }, [personalDataState.success]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailLeads: true,
    emailReports: true,
    desktopNotifications: false,
    smsAlerts: true,
    weeklyDigest: true,
  });

  const userStats = {
    leadsAssigned: 45,
    leadsWon: 18,
    leadsActive: 20,
    memberSince: "2023-01-15",
  };

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notifications);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] rounded-2xl p-8 shadow-lg text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30">
              <img
                className="w-full h-full rounded-full"
                src={user.image ?? "/assets/default-image.png"}
                alt={user.name ?? "User"}
              />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#5B2CA5] hover:scale-110 transition-transform shadow-lg">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-white/90 mb-1">{user.email}</p>
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium">
              {capitalizeWord(user.role)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Briefcase size={24} className="mx-auto mb-2" />
              <p className="text-2xl font-bold">{user.totalLeads}</p>
              <p className="text-sm text-white/80">Total Leads</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <TrendingUp size={24} className="mx-auto mb-2" />
              <p className="text-2xl font-bold">{user.totalWonLeads}</p>
              <p className="text-sm text-white/80">Leads Won</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex gap-2 p-2">
            <button
              onClick={() => setActiveTab("personal")}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "personal"
                  ? "bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "security"
                  ? "bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Security
            </button>
            {/* TODO: Uncomment Notifications tab */}
            {/* <button
              onClick={() => setActiveTab("notifications")}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "notifications"
                  ? "bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Notifications
            </button> */}
          </div>
        </div>

        <div className="p-8">
          {activeTab === "personal" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Personal Information
              </h2>
              {personalDataState.errorMessage && (
                <p className="text-red-400 text-xs mb-3 text-center">
                  {personalDataState.errorMessage}
                </p>
              )}

              <form action={dataFormAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="name"
                        value={personalInfo.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                      />
                    </div>
                    {personalDataState.errors.name && (
                      <p className="text-red-400 text-xs">
                        {personalDataState.errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl cursor-not-allowed text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={personalInfo.phone ?? ""}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                      />
                    </div>
                    {personalDataState.errors.phone && (
                      <p className="text-red-400 text-xs">
                        {personalDataState.errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Role
                    </label>
                    <div className="relative">
                      <Shield
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        value={capitalizeWord(user.role)}
                        disabled
                        className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl cursor-not-allowed text-gray-500"
                      />
                    </div>
                    {user.role !== "admin" && (
                      <p className="text-sm text-gray-500 mt-2">
                        Contact an administrator to change your role
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <Calendar size={20} className="text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Member Since
                    </p>
                    <p className="text-sm text-gray-600">
                      {user.createdAt.toDateString()}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all",
                    isPending && "pointer-events-none",
                  )}
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin " />
                      <span>Saving...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save size={20} />
                      <span>Save Changes</span>
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Performance Overview
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="leads"
                        fill="#5B2CA5"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Security Settings
              </h2>
              <form action={() => {}} className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                  <Shield
                    size={20}
                    className="text-yellow-600 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Password Security
                    </h4>
                    <p className="text-sm text-gray-600">
                      Use a strong password with at least 8 characters,
                      including uppercase, lowercase, numbers, and special
                      characters.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Lock size={20} />
                  Change Password
                </button>
              </form>
              {/* TODO: Add 2FA feature */}
              {/* <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Two-Factor Authentication
                </h3>
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#5B2CA5] hover:text-[#5B2CA5] transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div> */}
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Mail size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Email Notifications - New Leads
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receive emails when new leads are assigned to you
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emailLeads}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          emailLeads: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5B2CA5]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B2CA5]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bell size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Desktop Notifications
                      </h4>
                      <p className="text-sm text-gray-600">
                        Show desktop notifications for important updates
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.desktopNotifications}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          desktopNotifications: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5B2CA5]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B2CA5]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        SMS Alerts
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receive SMS for urgent lead updates
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.smsAlerts}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          smsAlerts: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5B2CA5]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B2CA5]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <TrendingUp size={20} className="text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Weekly Digest
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receive weekly summary of your performance
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.weeklyDigest}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          weeklyDigest: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5B2CA5]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B2CA5]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Mail size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Email Reports
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receive monthly analytics reports via email
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emailReports}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          emailReports: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5B2CA5]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B2CA5]"></div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSaveNotifications}
                className="mt-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all"
              >
                <Save size={20} />
                Save Preferences
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
