"use client";

import { motion } from "motion/react";

export const StageChartSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      {/* Title skeleton */}
      <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse mb-6" />

      {/* Chart skeleton container */}
      <div className="w-full h-[300px] flex items-center justify-center">
        {/* Fake donut chart */}
        <div className="relative w-48 h-48">
          {/* outer ring */}
          <div className="absolute inset-0 rounded-full border-[16px] border-gray-200 animate-pulse" />

          {/* inner cutout */}
          <div className="absolute inset-[28px] bg-white rounded-full" />

          {/* subtle segmented illusion */}
          <div className="absolute inset-0 rounded-full opacity-30 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
        </div>
      </div>

      {/* legend skeleton */}
      <div className="mt-6 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
