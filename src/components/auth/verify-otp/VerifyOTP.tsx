"use client";

import { motion } from "motion/react";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, useActionState } from "react";
import Link from "next/link";
import { VerifyOTPFormResponseType } from "@/features/auth/auth.types";
import { validateVerifyOTPForm } from "@/features/auth/auth.service";
import { useRouter } from "next/navigation";
import { useResendOTP } from "@/hooks/useResendOTP";
import { cn } from "@/lib/utils";

interface Props {
  email: string;
  type: string;
}

export function VerifyOTP({ email, type }: Props) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { state: resendOTPState, handleResendOTP } = useResendOTP();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const initialState: VerifyOTPFormResponseType = {
    success: false,
    errors: {},
    errorMessage: null,
  };

  const [state, formAction, isPending] = useActionState(
    validateVerifyOTPForm.bind(null, { email, type }),
    initialState,
  );

  useEffect(() => {
    if (resendOTPState.error) {
      setError(resendOTPState.error);
    }
  }, [resendOTPState.error]);

  useEffect(() => {
    if (state.errorMessage) {
      setError(state.errorMessage);
    }
  }, [state.errorMessage]);

  useEffect(() => {
    if (state.success) {
      setOtp(["", "", "", "", "", ""]);
      router.replace("/set-new-password");
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
            href="/forgot-password"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4A24C] to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Verify Code</h1>
            <p className="text-gray-300">
              We've sent a 6-digit verification code to your email address.
            </p>
            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}
          </div>

          <form className="space-y-6" action={formAction}>
            <div>
              <label className="block text-white mb-4 text-center">
                Enter Verification Code
              </label>
              <>
                <div
                  className="flex gap-3 justify-center"
                  onPaste={handlePaste}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 bg-white/10 border border-white/20 rounded-xl text-white text-center text-2xl focus:outline-none focus:border-[#D4A24C] transition-colors"
                    />
                  ))}
                </div>
                <input
                  name="otp"
                  defaultValue={otp.join("")}
                  className="hidden"
                />
              </>
              {state.errors.otp && (
                <p className="text-red-400 text-xs text-center mt-1">
                  {state.errors.otp}
                </p>
              )}
            </div>

            <div className="text-center">
              <p className="text-gray-300 text-sm mb-2">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={() => handleResendOTP(email)}
                className={cn(
                  "text-[#D4A24C] hover:text-yellow-400 transition-colors text-sm",
                  resendOTPState.loading && "pointer-events-none",
                )}
              >
                {resendOTPState.loading ? (
                  <Loader2 size={14} className="animate-spin mx-auto" />
                ) : (
                  "Resend Code"
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#D4A24C] to-yellow-500 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {isPending ? (
                <Loader2 size={18} className="animate-spin mx-auto" />
              ) : (
                "Verify Code"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
