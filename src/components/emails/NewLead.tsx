import { Button, Section, Text } from "react-email";
import { brand, EmailLayout } from "../BaseEmail";

interface NewLeadEmailProps {
  leadName: string;
  company: string;
  email: string;
  interest: string;
  dashboardUrl: string;
}

export default function NewLeadCreatedEmail({
  leadName,
  company,
  email,
  interest,
  dashboardUrl,
}: NewLeadEmailProps) {
  return (
    <EmailLayout preview="A new lead has been created">
      <Text className="text-base leading-7" style={{ color: brand.text }}>
        A new lead has been submitted through the website.
      </Text>

      <Section
        className="rounded-xl px-6 py-5 my-6"
        style={{
          backgroundColor: "#F8FAFC",
          border: "1px solid #E2E8F0",
        }}
      >
        <Text style={{ color: brand.text }}>
          <strong>Name:</strong> {leadName}
        </Text>

        <Text style={{ color: brand.text }}>
          <strong>Company:</strong> {company}
        </Text>

        <Text style={{ color: brand.text }}>
          <strong>Email:</strong> {email}
        </Text>

        <Text style={{ color: brand.text }}>
          <strong>Interest:</strong> {interest}
        </Text>
      </Section>

      <Button
        href={dashboardUrl}
        className="rounded-xl px-6 py-4 text-white text-sm font-semibold"
        style={{
          backgroundColor: brand.accent,
        }}
      >
        View Lead
      </Button>
    </EmailLayout>
  );
}
