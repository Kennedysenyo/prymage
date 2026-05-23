"use client";

import { motion } from "motion/react";

export const StaffLeadChartSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      {/* Title skeleton */}
      <div className="h-6 w-64 bg-gray-200 rounded-md animate-pulse mb-6" />

      <div className="w-full h-[300px] flex">
        {/* Y-axis labels skeleton */}
        <div className="w-[100px] flex flex-col justify-between pr-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-20 bg-gray-100 rounded animate-pulse"
            />
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 flex flex-col justify-between py-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* bar track */}
              <div className="flex-1 h-6 bg-gray-100 rounded-md overflow-hidden">
                {/* animated bar fill */}
                <div
                  className="h-full bg-gray-200 animate-pulse rounded-md"
                  style={{
                    width: `${30 + Math.random() * 60}%`,
                  }}
                />
              </div>

              {/* value skeleton */}
              <div className="h-4 w-10 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
