"use client";

import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Loader, Loader2 } from "lucide-react";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import {
  CreateLeadsDataType,
  CreateLeadsFormResponseType,
} from "@/features/leads/leads.types";
import { validateLeadsForm } from "@/features/leads/leads.service";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Ghana Office",
      details: ["1 Fetu Street, Sakaman", "Accra, Ghana"],
    },
    {
      icon: MapPin,
      title: "Nigeria Office",
      details: ["Lekki, Lagos", "Nigeria"],
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+233-241-112-221", "+233-261-303-070", "+234-814-316-7289"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["sales@prymage.com", "info@prymage.com"],
    },
  ];

  const [formData, setFormData] = useState<CreateLeadsDataType>({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "",
    country: "",
    message: "",
  });

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initialState: CreateLeadsFormResponseType = {
    success: false,
    errors: {},
    errorMessage: null,
  };

  const [state, formAction, isPending] = useActionState(
    validateLeadsForm,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        interest: "",
        country: "",
        message: "",
      });
      toast.success("Message send successfully!");
    }
  }, [state.success]);

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-[#181225] via-[#221A35] to-[#5B2CA5] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#D4A24C] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
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
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your business? Contact us for a free consultation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send us a message
              </h3>
              {state.errorMessage && (
                <small className="text-red-500 text-xs">
                  {state.errorMessage}
                </small>
              )}
              <form className="space-y-6" action={formAction}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors"
                      placeholder="John Doe"
                    />
                    {state.errors.name && (
                      <small className="text-red-500 text-xs">
                        {state.errors.name}
                      </small>
                    )}
                  </div>
                  <div>
                    <label className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors"
                      placeholder="john@example.com"
                    />
                    {state.errors.email && (
                      <small className="text-red-500 text-xs">
                        {state.errors.email}
                      </small>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors"
                      placeholder="+233 000 000 000"
                    />
                    {state.errors.phone && (
                      <small className="text-red-500 text-xs">
                        {state.errors.phone}
                      </small>
                    )}
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors"
                      placeholder="Your Company"
                    />
                    {state.errors.company && (
                      <small className="text-red-500 text-xs">
                        {state.errors.company}
                      </small>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2">Interest</label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#D4A24C] transition-colors"
                    >
                      <option value="" className="text-gray-900">
                        Select purpose
                      </option>
                      <option value="consultation" className="text-gray-900">
                        Free Consultation
                      </option>
                      <option value="implementation" className="text-gray-900">
                        ERP Implementation
                      </option>
                      <option value="support" className="text-gray-900">
                        Support
                      </option>
                      <option value="training" className="text-gray-900">
                        Training
                      </option>
                    </select>
                    {state.errors.interest && (
                      <small className="text-red-500 text-xs">
                        {state.errors.interest}
                      </small>
                    )}
                  </div>
                  <div>
                    <label className="block text-white mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#D4A24C] transition-colors"
                    >
                      <option value="" className="text-gray-900">
                        Select country
                      </option>
                      <option value="ghana" className="text-gray-900">
                        Ghana
                      </option>
                      <option value="nigeria" className="text-gray-900">
                        Nigeria
                      </option>
                      <option value="other" className="text-gray-900">
                        Other
                      </option>
                    </select>
                    {state.errors.country && (
                      <small className="text-red-500 text-xs">
                        {state.errors.country}
                      </small>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A24C] transition-colors resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                  {state.errors.message && (
                    <small className="text-red-500 text-xs">
                      {state.errors.message}
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  aria-disabled={isPending}
                  className={cn(
                    "w-full px-8 py-4 bg-gradient-to-r from-[#D4A24C] to-yellow-500 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center",
                    isPending && "pointer-events-none",
                  )}
                >
                  {isPending ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-[#D4A24C] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4A24C] to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {info.title}
                    </h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-300">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4A24C] to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Business Hours
                  </h4>
                  <p className="text-gray-300">
                    Monday - Friday: 8:00 AM - 6:00 PM
                  </p>
                  <p className="text-gray-300">Saturday: 9:00 AM - 2:00 PM</p>
                  <p className="text-gray-300">24/7 Support Available</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
