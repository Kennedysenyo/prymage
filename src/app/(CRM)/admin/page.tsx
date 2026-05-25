import { getSession } from "@/lib/better-auth/auth-helpers";
import { redirect } from "next/navigation";

const session = await getSession();
if (!session) {
  redirect("/sign-in");
}

export default function Admin() {
  redirect("/admin/dashboard");
}
