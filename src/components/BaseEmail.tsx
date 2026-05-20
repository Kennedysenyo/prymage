import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

export const brand = {
  primary: "#0F172A",
  accent: "#D4A24C",
  background: "#F8FAFC",
  text: "#334155",
  muted: "#64748B",
};

export interface BaseEmailProps {
  name?: string;
}

export const EmailLayout = ({
  preview,
  children,
}: {
  preview: string;
  children: React.ReactNode;
}) => {
  return (
    <Html>
      <Head />

      <Tailwind>
        <Body
          className="py-10"
          style={{
            backgroundColor: brand.background,
            fontFamily: "Inter, Arial, sans-serif",
          }}
        >
          <Preview>{preview}</Preview>

          <Container
            className="rounded-2xl p-10"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #E2E8F0",
            }}
          >
            {/* Logo / Brand */}

            <Text
              className="text-2xl font-bold mb-8"
              style={{
                color: brand.primary,
              }}
            >
              Prymage CRM Lead Support
            </Text>

            <Section>{children}</Section>

            {/* Footer */}

            <Section className="mt-10 pt-6 border-t border-solid border-[#E2E8F0]">
              <Text
                className="text-sm leading-6"
                style={{
                  color: brand.muted,
                }}
              >
                Prymage Consultancy Ltd
                <br />
                ERP & Business Solutions
                <br />
                Accra, Ghana
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
