"use client";

import { motion } from "motion/react";
import { Award, Users, Globe, Zap, Shield, Handshake } from "lucide-react";

export function AboutSection() {
  const stats = [
    { value: "18+", label: "Years Experience" },
    { value: "3.3k+", label: "Projects Delivered" },
    { value: "8.6k+", label: "Professionals Trained" },
    { value: "45+", label: "Expert Consultants" },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "Certified ERP Experts",
      description:
        "Our team consists of certified professionals with deep expertise in all major ERP platforms.",
    },
    {
      icon: Globe,
      title: "Local West African Support",
      description:
        "On-ground presence in Ghana and Nigeria with understanding of local business requirements.",
    },
    {
      icon: Zap,
      title: "Affordable Enterprise Solutions",
      description:
        "Premium ERP solutions at competitive prices tailored for African businesses.",
    },
    {
      icon: Shield,
      title: "Scalable Systems",
      description:
        "Solutions that grow with your business from startup to enterprise scale.",
    },
    {
      icon: Users,
      title: "AI-Powered Automation",
      description:
        "Cutting-edge AI integration to automate processes and boost productivity.",
    },
    {
      icon: Handshake,
      title: "Long-Term Partnership",
      description:
        "Ongoing support and partnership beyond implementation for sustained success.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#F7F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Trusted Technology Partner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading digital transformation across West Africa with 18+ years of
            expertise in ERP implementation and business automation
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] bg-clip-text text-transparent mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            Why Choose Prymage?
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-lg flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
