import { LanguageObjectType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const languages: LanguageObjectType[] = [
  {
    visibleName: "English",
    shortName: "en",
  },
  {
    visibleName: "Portuguese",
    shortName: "pt",
  },
  {
    visibleName: "Spanish",
    shortName: "es",
  },
  {
    visibleName: "Russian",
    shortName: "ru",
  },
  {
    visibleName: "Turkish",
    shortName: "tr",
  },
  {
    visibleName: "French",
    shortName: "fr",
  },
];
