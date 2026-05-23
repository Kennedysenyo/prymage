"use client";

import { motion } from "motion/react";

export const CardsSkeleton = () => {
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            {/* Icon skeleton */}
            <div className="w-12 h-12 rounded-xl bg-gray-200 animate-pulse" />

            {/* Trend badge skeleton */}
            <div className="w-16 h-6 rounded-lg bg-gray-200 animate-pulse" />
          </div>

          {/* Value skeleton */}
          <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse mx-auto mb-2" />

          {/* Label skeleton */}
          <div className="h-4 w-32 bg-gray-100 rounded-md animate-pulse mx-auto" />
        </motion.div>
      ))}
    </div>
  );
};
