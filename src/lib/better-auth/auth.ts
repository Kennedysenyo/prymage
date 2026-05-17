import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db";
import { authSchemas } from "../db/schema";
import { admin, emailOTP } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { adminRole, fullAc, staffRole } from "@/features/auth/auth.permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema: authSchemas,
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          // Send the OTP for sign in
        } else if (type === "email-verification") {
          // Send the OTP for email verification
        } else {
          console.log({ email, otp });
          // Send the OTP for password reset
        }
      },
    }),
    admin({
      ac: fullAc,
      roles: {
        admin: adminRole,
        staff: staffRole,
      },
      adminRoles: ["admin"],
      adminUserIds: ["d9U7TsMBzbAEgf8IB6vuR4ceL710C5LW"],
    }),
  ],
});
