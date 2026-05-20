"use server";

import LeadAssignedEmail from "@/components/emails/LeadAssigned";
import NewLeadCreatedEmail from "@/components/emails/NewLead";
import OTPEmail from "@/components/emails/OTP";
import PasswordChangedEmail from "@/components/emails/PasswordResetConfirmation";
import WelcomeEmail from "@/components/emails/Welcome";
import { resend } from "@/lib/resend/resend";
import { EmailTypes } from "./emails.types";

export const sendEmail = async (
  email: EmailTypes,
  recipientEmail: string | string[],
) => {
  switch (email.type) {
    case "Welcome":
      await resend.emails.send({
        from: "Prymage CRM <welcome@kencoding.dev>",
        to: recipientEmail,
        subject: "Welocome Aboard",
        react: WelcomeEmail({
          name: email.name,
          temporaryPassword: email.temporaryPassword,
          loginUrl: email.loginUrl,
        }),
      });

      break;

    case "New-Lead":
      await resend.emails.send({
        from: "Prymage CRM <notification@kencoding.dev>",
        to: recipientEmail,
        subject: "New Lead Allert",
        react: NewLeadCreatedEmail({
          leadName: email.leadName,
          company: email.company,
          email: email.email,
          interest: email.interest,
          dashboardUrl: email.dashboardUrl,
        }),
      });

      break;

    case "Lead-Assigned":
      await resend.emails.send({
        from: "Prymage CRM <notification@kencoding.dev>",
        to: recipientEmail,
        subject: "New Lead Assigned",
        react: LeadAssignedEmail({
          name: email.name,
          leadName: email.leadName,
          leadMessage: email.leadMessage,
          dashboardUrl: email.dashboardUrl,
        }),
      });

      break;

    case "OTP":
      await resend.emails.send({
        from: "Prymage CRM <noreply@kencoding.dev>",
        to: recipientEmail,
        subject: "Password Recovery OTP",
        react: OTPEmail({ otp: email.otp }),
      });

      break;

    case "PasswordChangeConfirmation":
      await resend.emails.send({
        from: "Prymage CRM <noreply@kencoding.dev>",
        to: recipientEmail,
        subject: "Password Changed",
        react: PasswordChangedEmail({
          supportEmail: email.supportEmail,
        }),
      });

      break;

    default:
      throw new Error("Unknown email type!");
  }
};
