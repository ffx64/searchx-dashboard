import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sanitize = (input: string) => {
  return input
    .replace(/<|>|"|'/g, "")  // Remove XSS bosta
    .replace(/--|;|\/\*|\*\//g, "") // Remove SQLi junk
    .trim(); // Remove espaço extra, limpinho
};