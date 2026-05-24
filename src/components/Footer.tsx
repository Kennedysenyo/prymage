"use client";

import { motion } from "motion/react";
import { Mail } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
  ];

  const products = [
    "ERPNext",
    "Odoo",
    "Enquest ERP",
    "TallyPrime",
    "QuickBooks",
    "Selbby AI",
  ];

  const services = [
    "ERP Implementation",
    "Integration & Customization",
    "Support & Maintenance",
    "Training",
  ];

  // const industries = ["Manufacturing", "Retail", "Healthcare", "Education"];

  return (
    <footer className="bg-[#181225] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] bg-clip-text text-transparent mb-4">
                Prymage
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Leading ERP and accounting software consultancy in West Africa.
                Empowering businesses across Ghana and Nigeria with cutting-edge
                technology solutions since 2008.
              </p>

              <div>
                <h4 className="font-semibold mb-4">
                  Subscribe to our newsletter
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] rounded-lg hover:shadow-lg transition-all duration-300">
                    <Mail size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#D4A24C] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2">
              {products.map((product, index) => (
                <li key={index}>
                  <Link
                    href="#products"
                    className="text-gray-400 hover:text-[#D4A24C] transition-colors"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-[#D4A24C] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-400 text-center md:text-left"
            >
              © {new Date().getFullYear()} Prymage Consultancy Ltd. All rights
              reserved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex gap-4"
            >
              {[FaFacebookF, FaXTwitter, FaLinkedin, FaInstagram].map(
                (Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-[#5B2CA5] hover:to-[#D4A24C] transition-all duration-300"
                  >
                    <Icon size={20} />
                  </Link>
                ),
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
