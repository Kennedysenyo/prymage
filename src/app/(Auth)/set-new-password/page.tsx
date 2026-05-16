"use client";

import { motion } from "motion/react";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";

import { useState } from "react";
import Link from "next/link";

export default function SetNewPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[!@#$%^&*]/.test(password) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181225] via-[#221A35] to-[#5B2CA5] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#D4A24C] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <Link
            href="/verify-otp"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4A24C] to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Set New Password
            </h1>
            <p className="text-gray-300">
              Create a strong password for your account
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2">New Password</label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Confirm Password</label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3">
                Password Requirements:
              </h3>
              <ul className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle
                      size={16}
                      className={req.met ? "text-green-400" : "text-gray-500"}
                    />
                    <span
                      className={req.met ? "text-green-400" : "text-gray-400"}
                    >
                      {req.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/auth/login">
              <button
                type="button"
                className="w-full py-4 bg-gradient-to-r from-[#D4A24C] to-yellow-500 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Reset Password
              </button>
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
