"use client";
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
  staffLeadData: {
    name: string;
    leads: number;
  }[];
}
export const StaffLeadChart = ({ staffLeadData }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Assigned Leads Per Staff
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={staffLeadData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Bar dataKey="leads" fill="#5B2CA5" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
