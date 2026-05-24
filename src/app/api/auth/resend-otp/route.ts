import { sendOtp } from "@/features/auth/auth.service";
import { aj } from "@/lib/arcjet/arcjet";
import { tokenBucket } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "email is required!" },
        { status: 400 },
      );
    }

    const emailLimiter = aj.withRule(
      tokenBucket({
        mode: "LIVE",
        characteristics: ["email"],
        capacity: 3,
        refillRate: 3,
        interval: "60s",
      }),
    );

    const emailDecision = await emailLimiter.protect(request, {
      email: email.trim(),
      requested: 1,
    });

    if (emailDecision.isDenied()) {
      if (emailDecision.reason.isRateLimit()) {
        return NextResponse.json(
          {
            message:
              "Too many resend attempts for this email. Try again later.",
          },
          { status: 429 },
        );
      }
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const globalDecision = await aj.protect(request, { requested: 1 });
    if (globalDecision.isDenied()) {
      if (globalDecision.reason.isBot())
        return NextResponse.json(
          { message: "Bots are not allowed" },
          { status: 403 },
        );
      if (globalDecision.reason.isRateLimit())
        return NextResponse.json(
          { message: "Too many requests from this location." },
          { status: 429 },
        );
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const res = await sendOtp({ email });
    if (res) {
      throw new Error(res);
    }
    return NextResponse.json(
      { message: "Another OTP sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error occured" },
      { status: 500 },
    );
  }
};
