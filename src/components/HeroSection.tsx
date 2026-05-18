"use client";

import { motion } from "motion/react";
import {
  Play,
  CheckCircle,
  Users,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export function HeroSection() {
  const stats = [
    { icon: Briefcase, value: "3.5k+", label: "Successful Projects" },
    { icon: Award, value: "18+", label: "Years Experience" },
    { icon: GraduationCap, value: "8.6k+", label: "Students Trained" },
    { icon: Users, value: "45+", label: "Expert Consultants" },
  ];

  const badges = [
    { icon: CheckCircle, text: "Trusted by 100+ Businesses" },
    { icon: CheckCircle, text: "Local Support" },
    { icon: CheckCircle, text: "Affordable Pricing" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#181225] via-[#221A35] to-[#5B2CA5]"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4A24C] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#5B2CA5] rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              West Africa's Leading{" "}
              <span className="bg-gradient-to-r from-[#D4A24C] to-yellow-300 bg-clip-text text-transparent">
                ERP Partner
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              ERP & Accounting Software Company in Ghana and Nigeria. Expert
              implementation of ERPNext, Odoo, Enquest ERP, Tally, QuickBooks,
              and AI-powered business solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <button
                onClick={() => scrollToSection("#contact")}
                className="px-8 py-4 bg-gradient-to-r from-[#D4A24C] to-yellow-500 text-white rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Start Free Consultation
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2">
                <Play size={20} fill="white" />
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <badge.icon size={20} className="text-[#D4A24C]" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-[#D4A24C]/50 transition-all duration-300 hover:shadow-2xl"
              >
                <stat.icon size={40} className="text-[#D4A24C] mb-4" />
                <h3 className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
