import { motion } from "motion/react";
import { Users } from "lucide-react";

import { CardsData, ChartsData } from "@/features/leads/leads.types";
import { Suspense } from "react";
import { Cards } from "./Cards";
import { CardsSkeleton } from "./skeletons/CardSkeleton";
import { StageChart } from "./StageChart";
import { StageChartSkeleton } from "./skeletons/StageChartSkeleton";
import { LeadByCountryChart } from "./LeadByCountryChart";
import { LeadByCountryChartSkeleton } from "./skeletons/LeadByCountryChartSkeleton";
import { MonthlyGrowthChart } from "./MontlyGrowthChart";
import { MonthlyGrowthChartSkeleton } from "./skeletons/MonthlyGrowthChartSkeleton";
import { StaffLeadChart } from "./StaffLeadChart";

interface Props {
  cardsData: CardsData;
  chartsData: ChartsData;
}

export default function DashboardHome({ cardsData, chartsData }: Props) {
  return (
    <div className="space-y-8">
      <Suspense fallback={<CardsSkeleton />}>
        <Cards stats={cardsData} />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<StageChartSkeleton />}>
          <StageChart data={chartsData.leadStageData} />
        </Suspense>
        <Suspense fallback={<LeadByCountryChartSkeleton />}>
          <LeadByCountryChart statData={chartsData.staffAssignmentsData} />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<MonthlyGrowthChartSkeleton />}>
          <MonthlyGrowthChart monthlyData={chartsData.monthlyGrowthData} />
        </Suspense>

        <Suspense fallback={<StageChartSkeleton />}>
          <StaffLeadChart staffLeadData={chartsData.staffAssignmentsData} />
        </Suspense>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-2xl p-8 shadow-lg text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Conversion Rate</h3>
            <p className="text-white/80 mb-4">
              Overall lead-to-customer conversion
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">
                {chartsData.convrsionRate}%
              </span>
              {/* <span className="text-green-300 flex items-center gap-1">
                <TrendingUp size={20} />
                +3.2%
              </span> */}
            </div>
          </div>
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Users size={64} className="text-white" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
