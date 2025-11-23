import type { Schema } from "@/api/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const intl = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return intl.format(date);
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

type GateStatus = 1 | 2 | 3;

export function getProjectProgressPercentage(
  gateSteps: { status: GateStatus }[]
) {
  const totalSteps = gateSteps.length;

  if (totalSteps === 0) return 0;

  const completedSteps = gateSteps.filter(({ status }) => status === 3).length;

  return Math.round((completedSteps / totalSteps) * 100);
}

export function formatCurrency(amount: number) {
  return (
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + " ฿"
  );
}

export function shouldShowNextReview(currentGateLevel?: number) {
  return Number.isSafeInteger(currentGateLevel) ? currentGateLevel! > 1 : false;
}

export type ToastType = "success" | "error" | "info" | "warning" | "loading";
/**
 * Build a location state object for the toast message
 * @param message - The message to display in the toast
 * @param type - The type of toast to display
 * @returns A location state object
 */
export function buildToastLocationState(
  message: string,
  type: ToastType
) {
  return {
    toastMessage: message,
    toastType: type,
  };
}
