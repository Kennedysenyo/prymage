import { clsx, type ClassValue } from "clsx";
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
