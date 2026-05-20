export type EmailTypes =
  | {
      type: "Welcome";
      name: string;
      temporaryPassword: string;
      loginUrl: string;
    }
  | {
      type: "OTP";
      otp: string;
    }
  | {
      type: "PasswordChangeConfirmation";
      supportEmail: string;
    }
  | {
      type: "Lead-Assigned";
      name: string;
      leadName: string;
      leadMessage: string;
      dashboardUrl: string;
    }
  | {
      type: "New-Lead";
      leadName: string;
      company: string;
      email: string;
      interest: string;
      dashboardUrl: string;
    };
