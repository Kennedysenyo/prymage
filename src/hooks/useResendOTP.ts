"use client";

import { handleError } from "@/lib/utils";
import { resendOTPReducer, ResendOTPState } from "@/reducers/resendOTPReducer";
import { useEffect, useReducer } from "react";
import toast from "react-hot-toast";

export const useResendOTP = () => {
  const initialState: ResendOTPState = {
    error: null,
    successMessage: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(resendOTPReducer, initialState);

  const handleResendOTP = async (email: string) => {
    try {
      dispatch({ type: "LOADING" });

      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: { message: string } = await response.json();

      if (!response.ok) {
        dispatch({ type: "ERROR", payload: data.message });
        return;
      }
      dispatch({ type: "SUCCESS", payload: data.message });
    } catch (error) {
      dispatch({ type: "ERROR", payload: handleError(error) });
    }
  };

  useEffect(() => {
    if (state.successMessage) {
      toast.success(state.successMessage);
    }
  }, [state.successMessage]);

  return { state, handleResendOTP };
};
