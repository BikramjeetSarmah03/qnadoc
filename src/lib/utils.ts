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
