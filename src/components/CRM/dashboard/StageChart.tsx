"use client";

import { PieChart } from "lucide-react";
import { motion } from "motion/react";
import { Pie, ResponsiveContainer, Sector, Tooltip } from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}
export const StageChart = ({ data }: Props) => {
  const leadsByStageColors = [
    { name: "New", color: "#22c55e" },
    { name: "Contacted", color: "#a855f7" },
    { name: "Qualified", color: "#6366f1" },
    { name: "Won", color: "#D4A24C" },
    { name: "Lost", color: "#ef4444" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">Leads by Stage</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            dataKey="value"
            shape={(props: any) => {
              const { index, fill, ...rest } = props;

              const sliceColor = leadsByStageColors[index]?.color || fill;

              return <Sector {...rest} fill={sliceColor} />;
            }}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
