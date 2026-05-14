"use client";

import { motion } from "motion/react";

export function TrustedCompanies() {
  const companies = [
    "Ghana Commercial Bank",
    "Honda",
    "Binatone",
    "Synlab Ghana",
    "Regent University",
    "Engineers & Planners",
    "TCL",
    "Tecno",
    "Papas Pizza",
    "First National Bank",
    "Royal Motors",
    "Coca-Cola Bottling",
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-xl text-gray-600">
            Powering businesses across Ghana and Nigeria
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 rounded-xl p-6 flex items-center justify-center text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <span className="text-gray-700 font-semibold">{company}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
