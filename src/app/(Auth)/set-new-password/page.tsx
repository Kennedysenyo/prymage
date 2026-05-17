import { SetNewPassword } from "@/components/auth/set-new-password/SetNewPassword";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SetNewPasswordPage() {
  const cookiesStore = await cookies();
  const email = cookiesStore.get("reset-email")?.value;
  const otp = cookiesStore.get("reset-code")?.value;
  if (!(email && otp)) {
    redirect("/forgot-password");
  }

  return <SetNewPassword email={email} otp={otp} />;
}
