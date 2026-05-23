"use client";

import { capitalizeWord } from "@/lib/utils";

import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  statData: {
    name: string;
    leads: number;
  }[];
}
export const LeadByCountryChart = ({ statData }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">Leads by Country</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={statData.map((lead) => ({
            ...lead,
            name: capitalizeWord(lead.name),
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="leads" fill="#5B2CA5" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
