"use client";

import { motion } from "motion/react";

export const ConversionRateSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-8 shadow-lg"
    >
      <div className="flex items-center justify-between">
        {/* Left content */}
        <div className="space-y-4">
          {/* Title */}
          <div className="h-7 w-48 bg-gray-300 rounded-md animate-pulse" />

          {/* subtitle */}
          <div className="h-4 w-64 bg-gray-300/80 rounded-md animate-pulse" />

          {/* main rate row */}
          <div className="flex items-baseline gap-3">
            <div className="h-12 w-28 bg-gray-300 rounded-md animate-pulse" />
            <div className="h-5 w-20 bg-gray-300/80 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Right icon circle */}
        <div className="w-32 h-32 bg-gray-300/70 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-400/50 rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};
