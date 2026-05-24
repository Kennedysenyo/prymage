"use client";

import { motion } from "motion/react";
import {
  ChangeEvent,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Mail,
  Shield,
  AlertTriangle,
  Briefcase,
  Loader2,
  UserCheck,
  UserX,
} from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Link from "next/link";
import {
  EditUserFormResponseType,
  FetchedUserDataForEdit,
} from "@/features/users/users.types";
import {
  toggleUserBan,
  validateEditUserForm,
} from "@/features/users/users.service";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  user: FetchedUserDataForEdit;
}

type UserType = Omit<FetchedUserDataForEdit, "id" | "banned" | "image">;

interface FormFields extends UserType {
  password?: string;
}

export function EditUser({ user }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formData, setFormData] = useState<FormFields>({
    ...user,
    password: "",
  });

  // const handleDelete = () => {
  //   setShowDeleteDialog(false);
  // };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [pending, startTransition] = useTransition();

  const handleBan = () => {
    startTransition(async () => {
      const res = await toggleUserBan(user.id, user.banned);

      if (res) {
        toast.error("Unsuccessfull!");
      } else {
        toast.success("Successfull!");
      }
    });
  };

  const initialState: EditUserFormResponseType = {
    success: false,
    errorMessage: null,
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    validateEditUserForm.bind(null, user.id),
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Updated Successfully!");
    }
  }, [state.success]);

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
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 relative  overflow-hidden bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            <Image
              src={user.image ?? "/assets/default-image.png"}
              alt={user.name}
              width={64}
              height={64}
              loading="eager"
              className="object-cover object-center"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Edit User</h2>
            <p className="text-gray-600">
              Update user information and permissions
            </p>
          </div>
          {state.errorMessage && (
            <p className="text-red-400 text-xs text-center">
              {state.errorMessage}
            </p>
          )}
        </div>

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
                className="w-full pl-12 text-gray-600 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                placeholder="John Doe"
                required
              />
            </div>
            {state.errors.name && (
              <p className="text-red-400 text-xs">{state.errors.name}</p>
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
                className="w-full pl-12 pr-4 text-gray-600 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                placeholder="john@prymage.com"
                required
              />
            </div>
            {state.errors.email && (
              <p className="text-red-400 text-xs">{state.errors.email}</p>
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
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-12 pr-4 text-gray-600 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors appearance-none"
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
              <p className="text-red-400 text-xs">{state.errors.role}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Position
            </label>
            <div className="relative">
              <Briefcase
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full pl-12 text-gray-600 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                placeholder="Accountant"
                required
              />
            </div>
            {state.errors.position && (
              <p className="text-red-400 text-xs">{state.errors.position}</p>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Change Password (Optional)
            </h3>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <div className="relative">
                <Shield
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors"
                  placeholder="Leave blank to keep current password"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Only fill this field if you want to change the user's password
              </p>
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all"
            >
              {isPending ? (
                <Loader2 size={18} className="animate-spin mx-auto" />
              ) : (
                "Update User"
              )}
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={cn(
          "mt-6 bg-white rounded-2xl p-8 shadow-lg border border-red-200",
        )}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={24} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Danger Zone
            </h3>
            <p className="text-gray-600 mb-4">
              {user.banned
                ? "Unbannig this user will activate account, allowing access to leads."
                : "Banning this user will deactivate account denying access to leads."}
            </p>
            <AlertDialog.Root
              open={showDeleteDialog}
              onOpenChange={setShowDeleteDialog}
            >
              <AlertDialog.Trigger asChild>
                {user.banned ? (
                  <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-700 transition-colors">
                    {pending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={18} className="animate-spin mx-auto" />
                        <span>Unbanning...</span>
                      </span>
                    ) : (
                      <span className=" flex items-center gap-2">
                        <UserCheck size={20} />
                        <span>Unban User</span>
                      </span>
                    )}
                  </button>
                ) : (
                  <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                    {pending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={18} className="animate-spin mx-auto" />
                        <span>Banning...</span>
                      </span>
                    ) : (
                      <span className=" flex items-center gap-2">
                        <UserX size={20} />
                        <span>Ban User</span>
                      </span>
                    )}
                  </button>
                )}
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full z-50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle size={24} className="text-red-600" />
                    </div>
                    <AlertDialog.Title className="text-2xl font-bold text-gray-900">
                      {user.banned ? "Unband User?" : "Band User?"}
                    </AlertDialog.Title>
                  </div>
                  <AlertDialog.Description className="text-gray-600 mb-6">
                    Are you sure you want to {user.banned ? "unban" : "ban"}{" "}
                    <strong>{user.name}</strong>? This will
                    {user.banned ? "give" : "disable"} their account access to
                    leads, and all related data.
                  </AlertDialog.Description>
                  <div className="flex gap-4">
                    <AlertDialog.Cancel asChild>
                      <button className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                        Cancel
                      </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      {user.banned ? (
                        <button
                          onClick={handleBan}
                          className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-700 transition-colors"
                        >
                          Unban User
                        </button>
                      ) : (
                        <button
                          onClick={handleBan}
                          className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                        >
                          Ban User
                        </button>
                      )}
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
