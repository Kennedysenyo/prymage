"use client";

import { motion } from "motion/react";
import {
  Settings,
  Link2,
  Headphones,
  Cpu,
  GraduationCap,
  Database,
  Code,
  TrendingUp,
} from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: Settings,
      title: "ERP Implementation",
      description:
        "Complete end-to-end ERP deployment tailored to your business processes and industry requirements.",
    },
    {
      icon: Link2,
      title: "Integration & Customization",
      description:
        "Seamless integration with existing systems and custom modules to match your unique workflows.",
    },
    {
      icon: Headphones,
      title: "Support & Maintenance",
      description:
        "24/7 technical support, system updates, and proactive maintenance to ensure smooth operations.",
    },
    {
      icon: Cpu,
      title: "AI Automation",
      description:
        "Intelligent automation solutions to streamline processes and boost productivity.",
    },
    {
      icon: GraduationCap,
      title: "Training & Support",
      description:
        "Comprehensive user training programs and ongoing support for your teams.",
    },
    {
      icon: Database,
      title: "Data Migration",
      description:
        "Secure and efficient migration of your legacy data to new ERP systems.",
    },
    {
      icon: Code,
      title: "Custom Software Development",
      description:
        "Bespoke software solutions designed specifically for your business needs.",
    },
    {
      icon: TrendingUp,
      title: "Business Consulting",
      description:
        "Strategic consulting to optimize processes and maximize ROI from technology investments.",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-[#F7F7FA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Business Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From implementation to support, we provide end-to-end services for
            your digital transformation journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-[#5B2CA5]/10 to-[#D4A24C]/10 group-hover:from-white/20 group-hover:to-white/20 rounded-xl flex items-center justify-center mb-4 transition-all duration-300">
                  <service.icon
                    size={28}
                    className="text-[#5B2CA5] group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
