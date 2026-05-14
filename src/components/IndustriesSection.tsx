"use client";

import { motion } from "motion/react";
import {
  Factory,
  ShoppingCart,
  Truck,
  Building2,
  Heart,
  School,
  Coffee,
  Wheat,
} from "lucide-react";

export function IndustriesSection() {
  const industries = [
    {
      icon: Factory,
      name: "Manufacturing",
      description: "Production & inventory management",
    },
    {
      icon: ShoppingCart,
      name: "Retail",
      description: "Point of sale & inventory systems",
    },
    {
      icon: Truck,
      name: "Logistics",
      description: "Supply chain & fleet management",
    },
    {
      icon: Building2,
      name: "Real Estate",
      description: "Property & asset management",
    },
    {
      icon: Heart,
      name: "Healthcare",
      description: "Patient & clinic management",
    },
    {
      icon: School,
      name: "Education",
      description: "Student & campus management",
    },
    {
      icon: Coffee,
      name: "Hospitality",
      description: "Hotel & restaurant operations",
    },
    { icon: Wheat, name: "Agriculture", description: "Farm & crop management" },
  ];

  return (
    <section
      id="industries"
      className="py-20 bg-gradient-to-br from-[#181225] via-[#221A35] to-[#5B2CA5] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#D4A24C] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Specialized ERP solutions for diverse sectors across West Africa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-[#D4A24C] transition-all duration-300 hover:shadow-2xl group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#D4A24C] to-yellow-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <industry.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {industry.name}
              </h3>
              <p className="text-gray-300">{industry.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-[#D4A24C] to-yellow-500 text-white rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105">
            Explore All Industries
          </button>
        </motion.div>
      </div>
    </section>
  );
}
