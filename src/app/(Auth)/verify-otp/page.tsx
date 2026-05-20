import { VerifyOTP } from "@/components/auth/verify-otp/VerifyOTP";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function VerifyOTPPage() {
  const cookiesStore = await cookies();
  const email = cookiesStore.get("reset-email")?.value;
  if (!email) redirect("/forgot-password");
  return <VerifyOTP email={email} type="forget-password" />;
}
