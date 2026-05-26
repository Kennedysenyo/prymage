import { SingleHistory } from "@/features/leads/leads.types";
import { clsx, type ClassValue } from "clsx";
import { CheckCircle, Edit, LucideProps, User, UserPlus } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  return error instanceof Error ? error.message : (error as string);
};

export const capitalizeWord = (word: string): string => {
  return word[0].toUpperCase() + word.slice(1);
};

export type HistoryInputType = Omit<
  SingleHistory,
  "actionBy" | "oldStage" | "newStage"
> &
  Partial<Pick<SingleHistory, "actionBy" | "oldStage" | "newStage">>;

interface HistoryRenderType extends HistoryInputType {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color: string;
}

export const addHistoryIcons = (
  history: HistoryInputType,
): HistoryRenderType => {
  switch (history.activity) {
    case "Lead Created":
      return { ...history, icon: UserPlus, color: "text-green-600" };
    case "Assigned Staff":
      return { ...history, icon: User, color: "text-purple-600" };
    case "Note Added":
      return { ...history, icon: Edit, color: "text-blue-600" };
    case "Stage Changed":
      return { ...history, icon: CheckCircle, color: "text-yellow-600" };
    default:
      throw new Error("Unknown activity!");
  }
};
