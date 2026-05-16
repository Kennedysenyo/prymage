"use client";

import { motion } from "motion/react";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
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
            href="/sign-in"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Signin</span>
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4A24C] to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-300">
              No worries! Enter your email and we'll send you a verification
              code to reset your password.
            </p>
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

            <Link href="/verify-otp">
              <button
                type="button"
                className="w-full py-4 bg-gradient-to-r from-[#D4A24C] to-yellow-500 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Send Verification Code
              </button>
            </Link>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Remember your password?{" "}
              <Link
                href="/sign-in"
                className="text-[#D4A24C] hover:text-yellow-400 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
