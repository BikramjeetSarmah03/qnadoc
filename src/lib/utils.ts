import { File } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SafeFile extends Omit<File, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

export const zoomLevels = [
  { name: "25%", value: 0.25 },
  { name: "50%", value: 0.5 },
  { name: "75%", value: 0.75 },
  { name: "100%", value: 1 },
  { name: "125%", value: 1.25 },
  { name: "150%", value: 1.5 },
  { name: "175%", value: 1.75 },
  { name: "200%", value: 2 },
];
