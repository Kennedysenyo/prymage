"use client";

import { motion } from "motion/react";

export const MonthlyGrowthChartSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      {/* Title skeleton */}
      <div className="h-6 w-56 bg-gray-200 rounded-md animate-pulse mb-6" />

      {/* Chart area */}
      <div className="w-full h-[300px] relative">
        {/* grid skeleton */}
        <div className="absolute inset-0 grid grid-rows-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-t border-gray-100 w-full" />
          ))}
        </div>

        {/* fake line path */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-full h-full"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,150 C80,120 120,180 200,130 C280,80 320,140 400,100"
              fill="none"
              stroke="rgba(209,213,219,0.8)"
              strokeWidth="3"
              className="animate-pulse"
            />

            {/* fake points */}
            {[
              [0, 150],
              [100, 130],
              [200, 130],
              [300, 110],
              [400, 100],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="5"
                fill="rgba(209,213,219,0.9)"
                className="animate-pulse"
              />
            ))}
          </svg>
        </div>

        {/* x-axis skeleton */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-3 w-10 bg-gray-100 rounded animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* legend skeleton */}
      <div className="mt-4 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
    </motion.div>
  );
};
