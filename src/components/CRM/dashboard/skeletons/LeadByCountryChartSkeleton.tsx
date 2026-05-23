"use client";

import { motion } from "motion/react";

export const LeadByCountryChartSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      {/* Title skeleton */}
      <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse mb-6" />

      {/* Chart area */}
      <div className="w-full h-[300px] flex items-end justify-between gap-3 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center flex-1 gap-2">
            {/* bar skeleton */}
            <div
              className="w-full bg-gray-200 animate-pulse rounded-md"
              style={{
                height: `${40 + Math.random() * 120}px`,
              }}
            />

            {/* x-axis label skeleton */}
            <div className="h-3 w-10 bg-gray-100 animate-pulse rounded" />
          </div>
        ))}
      </div>

      {/* fake axis line */}
      <div className="mt-4 h-px w-full bg-gray-100" />
    </motion.div>
  );
};
