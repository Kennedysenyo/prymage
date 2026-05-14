"use client";

import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { useState } from "react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Prymage transformed our manufacturing operations with ERPNext. Our inventory accuracy improved by 95% and production efficiency increased by 40%. Best investment we've made!",
      author: "Michael Osei",
      role: "Operations Director",
      company: "Ghana Manufacturing Ltd",
      rating: 5,
    },
    {
      quote:
        "The Odoo implementation by Prymage streamlined all our accounting processes. We now have real-time visibility into our financials and saved over 200 hours per month in manual work.",
      author: "Fatima Ibrahim",
      role: "Chief Financial Officer",
      company: "West Africa Accounting Solutions",
      rating: 5,
    },
    {
      quote:
        "Their support team is exceptional. Available 24/7 and always resolves issues quickly. The training program ensured our entire staff was comfortable with the new system.",
      author: "Kwame Mensah",
      role: "CEO",
      company: "Accra Retail Group",
      rating: 5,
    },
    {
      quote:
        "I completed their ERP training program and it opened so many career opportunities. The instructors are highly knowledgeable and the hands-on approach made learning enjoyable.",
      author: "Chioma Nwankwo",
      role: "ERP Consultant",
      company: "Independent Professional",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section
      id="testimonials"
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
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from businesses we've helped transform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <Quote size={40} className="text-[#D4A24C] mb-4" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-[#D4A24C] fill-[#D4A24C]"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-[#5B2CA5]">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
