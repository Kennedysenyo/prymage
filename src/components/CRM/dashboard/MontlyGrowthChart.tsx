"use client";

import { motion } from "motion/react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  monthlyData: {
    month: string;
    leads: number;
  }[];
}

export const MonthlyGrowthChart = ({ monthlyData }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Monthly Lead Growth
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="leads"
            stroke="#D4A24C"
            strokeWidth={3}
            dot={{ fill: "#D4A24C", r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
