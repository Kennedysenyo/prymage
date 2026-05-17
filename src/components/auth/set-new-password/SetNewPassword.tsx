"use client";

import { motion } from "motion/react";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  Loader2,
} from "lucide-react";

import { ChangeEvent, useActionState, useEffect, useState } from "react";
import Link from "next/link";
import {
  SetNewPasswordDataType,
  SetNewPasswordFormResponseType,
} from "@/features/auth/auth.types";
import { validateSetNewPasswordForm } from "@/features/auth/auth.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  email: string;
  otp: string;
}

export function SetNewPassword({ email, otp }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<
    Pick<SetNewPasswordDataType, "password" | "cnfrmPassword">
  >({
    password: "",
    cnfrmPassword: "",
  });
  const router = useRouter();
  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    {
      label: "Contains uppercase letter",
      met: /[A-Z]/.test(formData.password),
    },
    {
      label: "Contains lowercase letter",
      met: /[a-z]/.test(formData.password),
    },
    { label: "Contains number", met: /\d/.test(formData.password) },
    {
      label: "Contains special character",
      met: /[!@#$%^&*]/.test(formData.password),
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initialState: SetNewPasswordFormResponseType = {
    success: false,
    errorMessage: null,
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    validateSetNewPasswordForm.bind(null, { email, otp }),
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      setFormData({
        password: "",
        cnfrmPassword: "",
      });
      toast.success("Password reset successfull. Sign In");
      router.replace("/sign-in");
    }
  }, [state.success, router]);

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

            {state.errorMessage && (
              <p className="text-xs text-red-400 text-center">
                {state.errorMessage}
              </p>
            )}
          </div>

          <form className="space-y-6" action={formAction}>
            <div>
              <label className="block text-white mb-2">New Password</label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {state.errors.password && (
                <p className="text-xs text-red-400 ">{state.errors.password}</p>
              )}
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
                  name="cnfrmPassword"
                  value={formData.cnfrmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {state.errors.cnfrmPassword && (
                <p className="text-xs text-red-400 ">
                  {state.errors.cnfrmPassword}
                </p>
              )}
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

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#D4A24C] to-yellow-500 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {isPending ? (
                <Loader2 size={18} className="animate-spin mx-auto" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
