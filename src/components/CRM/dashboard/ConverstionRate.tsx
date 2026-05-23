"use client";

import { TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  rate: number;
}
export const ConversionRate = ({ rate }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-2xl p-8 shadow-lg text-white"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">Conversion Rate</h3>
          <p className="text-white/80 mb-4">
            Overall lead-to-customer conversion
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">{rate}%</span>
            <span className="text-green-300 flex items-center gap-1">
              <TrendingUp size={20} />
              +3.2%
            </span>
          </div>
        </div>
        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Users size={64} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
};
