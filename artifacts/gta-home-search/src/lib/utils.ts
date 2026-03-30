import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDocumentTitle = (pageTitle: string) => {
  return `${pageTitle} | My GTA Home Search`;
};
