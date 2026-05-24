import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/better-auth/auth";

const authRoutes = [
  "/sign-in",
  "/forgot-password",
  "/verify-otp",
  "/set-new-password",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isAuthed = !!session?.session;

  if (authRoutes.includes(pathname) && isAuthed) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (pathname.startsWith("/admin/users") && session?.user.role === "staff") {
    const referer = request.headers.get("referer");

    if (referer) {
      return NextResponse.redirect(referer);
    }

    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthed && pathname.startsWith("/admin/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
