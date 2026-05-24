import { Section, Text } from "react-email";
import { brand, EmailLayout } from "../BaseEmail";

interface PasswordChangedEmailProps {
  supportEmail: string;
}

export default function PasswordChangedEmail({
  supportEmail,
}: PasswordChangedEmailProps) {
  return (
    <EmailLayout preview="Your password was changed">
      <Text className="text-base leading-7" style={{ color: brand.text }}>
        Hello,
      </Text>

      <Text className="text-base leading-7" style={{ color: brand.text }}>
        Your account password has been changed successfully.
      </Text>

      <Section
        className="rounded-xl px-5 py-4 my-6"
        style={{
          backgroundColor: "#FEF2F2",
          border: "1px solid #FECACA",
        }}
      >
        <Text
          className="text-sm leading-6"
          style={{
            color: "#991B1B",
          }}
        >
          If you did not make this change, please contact support immediately.
        </Text>
      </Section>

      <Text className="text-base" style={{ color: brand.text }}>
        Support: {supportEmail}
      </Text>
    </EmailLayout>
  );
}
