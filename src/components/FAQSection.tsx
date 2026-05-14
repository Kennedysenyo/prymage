"use client";

import { motion } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      question: "What is the difference between ERPNext and Odoo?",
      answer:
        "ERPNext is a fully open-source ERP with no license fees, ideal for manufacturing and distribution. Odoo offers both community (free) and enterprise versions with a modular approach, better for businesses needing specific apps. Both are excellent choices - we help you select based on your industry and requirements.",
    },
    {
      question: "Should I choose TallyPrime or QuickBooks for my business?",
      answer:
        "TallyPrime is excellent for businesses needing robust inventory management and GST/VAT compliance features, popular in Ghana and Nigeria. QuickBooks is ideal for service-based businesses and offers superior cloud capabilities and mobile access. We assess your specific needs to recommend the best fit.",
    },
    {
      question: "Do you provide E-VAT compliance support for Ghana?",
      answer:
        "Yes! We provide complete E-VAT compliance solutions for businesses in Ghana. Our systems are configured to meet Ghana Revenue Authority requirements, including automatic VAT calculations, compliant invoicing, and seamless integration with GRA systems.",
    },
    {
      question: "Can you host our ERP system in the cloud?",
      answer:
        "Absolutely! We offer both cloud-hosted and on-premise ERP solutions. Our cloud hosting includes secure servers, automatic backups, 99.9% uptime guarantee, and 24/7 monitoring. We can also deploy on AWS, Azure, or your preferred cloud provider.",
    },
    {
      question: "What is the best ERP for manufacturing companies?",
      answer:
        "For manufacturing, we typically recommend ERPNext or Odoo Manufacturing. Both offer excellent production planning, BOM management, quality control, and shop floor operations. ERPNext is more cost-effective for pure manufacturing, while Odoo excels if you need integrated CRM and sales modules.",
    },
    {
      question: "Do you help migrate data from our old system?",
      answer:
        "Yes, data migration is a core part of our implementation service. We handle migration from legacy systems, Excel spreadsheets, and other ERP platforms. Our process includes data cleaning, validation, testing, and ensuring zero data loss during the transition.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our ERP solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-[#5B2CA5] transition-colors duration-300"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left group">
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={24}
                      className="text-[#5B2CA5] transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
