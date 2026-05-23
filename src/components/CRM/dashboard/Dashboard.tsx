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
import { ConversionRate } from "./ConverstionRate";
import { ConversionRateSkeleton } from "./skeletons/ConversionRateSkeleton";

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

      <Suspense fallback={<ConversionRateSkeleton />}>
        <ConversionRate rate={chartsData.convrsionRate} />
      </Suspense>
    </div>
  );
}
