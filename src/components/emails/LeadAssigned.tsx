import { Button, Section, Text } from "react-email";
import { BaseEmailProps, brand, EmailLayout } from "../BaseEmail";

interface TaskAssignedEmailProps extends BaseEmailProps {
  leadName: string;
  leadMessage: string;
  dashboardUrl: string;
}

export default function LeadAssignedEmail({
  name,
  leadName,
  leadMessage,
  dashboardUrl,
}: TaskAssignedEmailProps) {
  return (
    <EmailLayout preview="You have been assigned a new task">
      <Text className="text-base leading-7" style={{ color: brand.text }}>
        Hello {name},
      </Text>

      <Text className="text-base leading-7" style={{ color: brand.text }}>
        A new lead has been assigned to you.
      </Text>

      <Section
        className="rounded-xl px-6 py-5 my-6"
        style={{
          backgroundColor: "#F8FAFC",
          border: "1px solid #E2E8F0",
        }}
      >
        <Text
          className="text-lg font-semibold mb-2"
          style={{
            color: brand.primary,
          }}
        >
          {leadName}
        </Text>

        <Text
          className="text-sm leading-6"
          style={{
            color: brand.text,
          }}
        >
          {leadMessage}
        </Text>
      </Section>

      <Button
        href={dashboardUrl}
        className="rounded-xl px-6 py-4 text-white text-sm font-semibold"
        style={{
          backgroundColor: brand.accent,
        }}
      >
        View Task
      </Button>
    </EmailLayout>
  );
}
