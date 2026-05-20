import { Button, Section, Text } from "react-email";
import { BaseEmailProps, brand, EmailLayout } from "../BaseEmail";

interface WelcomeEmailProps extends BaseEmailProps {
  temporaryPassword: string;
  loginUrl: string;
}

export default function WelcomeEmail({
  name,
  temporaryPassword,
  loginUrl,
}: WelcomeEmailProps) {
  return (
    <EmailLayout preview="Welcome to Prymage Consultancy Ltd">
      <Text className="text-base leading-7" style={{ color: brand.text }}>
        Hello {name},
      </Text>

      <Text className="text-base leading-7" style={{ color: brand.text }}>
        Your account has been created successfully. Below is your temporary
        password:
      </Text>

      <Section
        className="rounded-xl px-6 py-4 my-6"
        style={{
          backgroundColor: "#F1F5F9",
        }}
      >
        <Text
          className="text-lg font-bold tracking-wider"
          style={{
            color: brand.primary,
          }}
        >
          {temporaryPassword}
        </Text>
      </Section>

      <Text className="text-base leading-7" style={{ color: brand.text }}>
        For security reasons, please change your password immediately after
        signing in.
      </Text>

      <Button
        href={loginUrl}
        className="rounded-xl px-6 py-4 text-white text-sm font-semibold mt-4"
        style={{
          backgroundColor: brand.accent,
        }}
      >
        Sign In
      </Button>
    </EmailLayout>
  );
}
