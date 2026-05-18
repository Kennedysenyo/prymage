"use client";

import { motion } from "motion/react";
import { User, Bell, Lock, Palette, Globe } from "lucide-react";

export default function Settings() {
  return (
    <div className="max-w-4xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <User size={24} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Profile Settings
            </h3>
            <p className="text-gray-600">Manage your account information</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Display Name
            </label>
            <input
              type="text"
              defaultValue="Admin User"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="admin@prymage.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
            />
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all">
            Save Changes
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Bell size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
            <p className="text-gray-600">Configure notification preferences</p>
          </div>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-gray-700">
              Email notifications for new leads
            </span>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </label>
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-gray-700">Desktop notifications</span>
            <input type="checkbox" className="w-5 h-5" />
          </label>
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-gray-700">Weekly summary reports</span>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </label>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <Lock size={24} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Security</h3>
            <p className="text-gray-600">
              Manage password and security settings
            </p>
          </div>
        </div>
        <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-[#5B2CA5] hover:text-[#5B2CA5] transition-all">
          Change Password
        </button>
      </motion.div>
    </div>
  );
}
