import type { Schema } from "@/api/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const intl = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return intl.format(date);
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

type GateStatus = 1|2|3;

export function getProjectProgressPercentage(gateSteps: { status: GateStatus }[]) {
  const totalSteps = gateSteps.length;

  if (totalSteps === 0) return 0;

  const completedSteps = gateSteps.filter(({ status }) => status === 3).length;

  return Math.round((completedSteps / totalSteps) * 100)

}