"use client";

import { motion } from "motion/react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to access your account</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2">Email Address</label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Password</label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/10 focus:ring-[#D4A24C]"
                />
                <span className="text-sm">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#D4A24C] hover:text-yellow-400 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#D4A24C] to-yellow-500 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Sign In
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
