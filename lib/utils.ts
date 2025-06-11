import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function getSubjectSlug(sub:string): string {
  return sub.toLowerCase().replace(/\s+/g, '-');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}