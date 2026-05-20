import { Resend } from "resend";

const resendAPIKey = process.env.RESEND_API_KEY;
if (!resendAPIKey) {
  throw new Error("RESEND_API_KEY is required to setup Resend.");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
