import { Section, Text } from "react-email";
import { brand, EmailLayout } from "../BaseEmail";

interface OTPEmailProps {
  otp: string;
}

export default function OTPEmail({ otp }: OTPEmailProps) {
  return (
    <EmailLayout preview="Your verification code">
      <Text className="text-base leading-7" style={{ color: brand.text }}>
        Hello ,
      </Text>

      <Text className="text-base leading-7" style={{ color: brand.text }}>
        Use the verification code below to continue your request.
      </Text>

      <Section
        className="rounded-2xl py-6 my-8 text-center"
        style={{
          backgroundColor: "#F8FAFC",
          border: "1px solid #E2E8F0",
        }}
      >
        <Text
          className="text-4xl font-bold tracking-[10px]"
          style={{
            color: brand.accent,
          }}
        >
          {otp}
        </Text>
      </Section>

      <Text className="text-sm leading-6" style={{ color: brand.muted }}>
        This code will expire shortly. If you did not request this code, please
        ignore this email.
      </Text>
    </EmailLayout>
  );
}
