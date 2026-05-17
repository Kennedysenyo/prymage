"use client";

import { motion } from "motion/react";
import { ChangeEvent, useActionState, useEffect, useState } from "react";

import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, Shield } from "lucide-react";
import Link from "next/link";
import {
  CreateUserFormResponseType,
  CreateUserFormType,
} from "@/features/users/users.types";
import { validateCreateUserForm } from "@/features/users/users.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddUserPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<CreateUserFormType>({
    name: "",
    email: "",
    role: "staff",
    password: "",
    cnfrmPassword: "",
  });

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initialState: CreateUserFormResponseType = {
    success: false,
    errors: {},
    errorMessage: null,
  };

  const [state, formAction, isPending] = useActionState(
    validateCreateUserForm,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      setFormData({
        name: "",
        email: "",
        role: "staff",
        password: "",
        cnfrmPassword: "",
      });
      toast.success("User created successfully!");
      router.push("/admin/users");
    }
  }, [state.success, router]);

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Users
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New User</h2>
        <p className="text-gray-600 ">
          Create a new user account for your team
        </p>

        {state.errorMessage && (
          <p className="text-xs text-red-400 text-center mb-8">
            {state.errorMessage}
          </p>
        )}

        <form action={formAction} className="space-y-6">
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
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                placeholder="John Doe"
                required
              />
            </div>

            {state.errors.name && (
              <p className="text-xs text-red-400">{state.errors.name}</p>
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                placeholder="john@prymage.com"
                required
              />
            </div>
            {state.errors.email && (
              <p className="text-xs text-red-400">{state.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <div className="relative">
              <Shield
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                value={formData.role}
                name="role"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors appearance-none"
                required
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {formData.role === "admin"
                ? "Admins have full access to all features"
                : "Staff can manage assigned leads and tasks"}
            </p>
            {state.errors.role && (
              <p className="text-xs text-red-400">{state.errors.role}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                name="password"
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.cnfrmPassword}
                name="cnfrmPassword"
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Link href="/admin/users" className="flex-1">
              <button
                type="button"
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              aria-disabled={isPending}
              style={{ cursor: isPending ? "none" : "cursor" }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all"
            >
              Create User
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
