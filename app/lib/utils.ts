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