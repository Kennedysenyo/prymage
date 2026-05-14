"use client";

import { motion } from "motion/react";
import { Star, ArrowRight } from "lucide-react";

export function ProductsSection() {
  const products = [
    {
      name: "ERPNext",
      category: "Open Source ERP",
      rating: 4.8,
      description:
        "Comprehensive open-source ERP for manufacturing, distribution, and services.",
    },
    {
      name: "Odoo",
      category: "Business Suite",
      rating: 4.9,
      description:
        "All-in-one business management platform with modular applications.",
    },
    {
      name: "Selbby AI",
      category: "AI-Powered ERP",
      rating: 4.7,
      description:
        "Next-generation intelligent ERP with AI automation capabilities.",
    },
    {
      name: "Enquest ERP",
      category: "Industry ERP",
      rating: 4.6,
      description: "Specialized ERP solutions for West African businesses.",
    },
    {
      name: "TallyPrime",
      category: "Accounting Software",
      rating: 4.8,
      description:
        "Complete business management with powerful accounting features.",
    },
    {
      name: "QuickBooks",
      category: "Cloud Accounting",
      rating: 4.9,
      description:
        "World-class cloud accounting solution for small to medium businesses.",
    },
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Products We Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from industry-leading ERP and accounting solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-[#5B2CA5] transition-all duration-300 hover:shadow-2xl group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-[#5B2CA5]/10 to-[#D4A24C]/10 text-[#5B2CA5] rounded-full text-sm">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-[#D4A24C] fill-[#D4A24C]" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <button className="flex items-center gap-2 text-[#5B2CA5] font-semibold group-hover:gap-3 transition-all duration-300">
                Learn More
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
