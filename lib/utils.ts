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
  english: ["eng", "english", "englsh"],
  "ENGINEERING MECHANICS": ["mechanics","engineering mechanics","eng mechanics"],
  "BASICS OF MECHANICAL ENGINEERING": ["mech","mechanical","bme"],
  "BASICS OF CIVIL ENGINEERING": ["civil","civil engineering","bce"],
  "ENGINEERING GRAPHICS": ["graphics","graphi","eng graphics"],
  "PROFESSIONAL COMMUNICATION": ["pc","professional","communication","proff","comm"],
  // Add more as needed
};

// Generate thumbnail URL from YouTube URL
export const generateThumbnailUrl = (url: string, prefix: string): string => {
  const videoId  = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);

  if (videoId  && videoId[1]) {
    return `https://img.youtube.com/vi/${videoId[1]}/${prefix}.jpg`;
  }
  // Fallback
  return "https://via.placeholder.com/480x360/1a1a1a/ffffff?text=YouTube+Playlist";
};