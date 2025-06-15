import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function getSubjectSlug(sub:string): string {
  return sub.toLowerCase().replace(/\s+/g, '-');
}

export function getSubjectNameFromSlug(slug: string): string {
  return slug.toLowerCase().replace(/-/g, " ");
  }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const subjectMap = {
  maths: ["math", "maths", "mathematics"],
  physics: ["phys", "phiscs", "physics", "phy", "ph"],
  chemistry: ["chem", "chemsitry", "chemistry"],
  biology: ["bio", "biology"],
  english: ["eng", "english", "englsh"],
  // Add more as needed
};