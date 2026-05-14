"use client";

import { motion } from "motion/react";
import {
  Database,
  Cloud,
  Zap,
  Calculator,
  Brain,
  FileText,
} from "lucide-react";

export function SoftwareSolutions() {
  const solutions = [
    {
      name: "ERPNext",
      icon: Database,
      description: "Open-source ERP solution for modern businesses",
    },
    {
      name: "Odoo",
      icon: Cloud,
      description: "Comprehensive business management suite",
    },
    {
      name: "Enquest ERP",
      icon: Zap,
      description: "Industry-specific ERP for Ghana & Nigeria",
    },
    {
      name: "TallyPrime",
      icon: Calculator,
      description: "Complete accounting and business software",
    },
    {
      name: "Selbby AI ERP",
      icon: Brain,
      description: "AI-powered intelligent ERP system",
    },
    {
      name: "QuickBooks",
      icon: FileText,
      description: "World-class accounting software",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Software Solutions We Implement
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry-leading ERP and accounting software tailored to your
            business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-[#5B2CA5] transition-all duration-300 hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B2CA5]/5 to-[#D4A24C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <solution.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {solution.name}
                </h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A24C]/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
