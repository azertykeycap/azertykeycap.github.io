import { type ClassValue, clsx } from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { MaterialType, StatusType } from "./api/contentful";
import UAParser from "ua-parser-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusList: Array<StatusType> = [
  "En stock",
  "Extras GB",
  "Extras In-Stock",
  "GB en cours",
  "GB terminé",
  "Interest Check",
  "Out Of Stock",
];

export const materialList: Array<MaterialType> = [
  "ABS Double-Shot",
  "ABS Pad-Printed",
  "ABS Simple",
  "Aluminium",
  "PBT Double-Shot",
  "PBT Dye-Sub",
  "PBT Laser printed",
];

export function wrapValuesWithFr(
  originalObject: Record<string, string | Date | boolean>
): Record<string, { fr: string | Date | boolean }> {
  const resultObject: Record<string, { fr: string | Date | boolean }> = {};

  for (const key in originalObject) {
    if (Object.prototype.hasOwnProperty.call(originalObject, key)) {
      resultObject[key] = { fr: originalObject[key] };
    }
  }

  return resultObject;
}

export const getOperatingSystem = (userAgent: string): string => {
  const parser = new UAParser();
  const result = parser.setUA(userAgent).getOS();
  return result.name || "Unknown OS";
};

export const getStatusColor = (
  status: StatusType
): { bg: ClassNameValue; text: ClassNameValue; bgHover: ClassNameValue } => {
  switch (status) {
    case "En stock":
      return {
        bgHover: "hover:bg-green-700 dark:hover:bg-green-300/30",
        bg: "bg-green-500 dark:bg-green-300/20 border border-green-500 dark:border-green-300",
        text: "text-green-50 dark:text-green-300",
      };
    case "Extras In-Stock":
      return {
        bgHover: "hover:bg-sky-700 dark:hover:bg-sky-300/30",
        bg: "bg-sky-500 dark:bg-sky-300/20 border border-sky-500 dark:border-sky-300",
        text: "text-sky-50 dark:text-sky-300",
      };
    case "Extras GB":
      return {
        bgHover: "hover:bg-blue-700 dark:hover:bg-blue-300/30",
        bg: "bg-blue-500 dark:bg-blue-300/20 border border-blue-500 dark:border-blue-300",
        text: "text-blue-50 dark:text-blue-300",
      };
    case "GB en cours":
      return {
        bgHover: "hover:bg-emerald-700 dark:hover:bg-emerald-300/30",
        bg: "bg-emerald-500 dark:bg-emerald-300/20 border border-emerald-500 dark:border-emerald-300",
        text: "text-emerald-50 dark:text-emerald-300",
      };
    case "Interest Check":
      return {
        bgHover: "hover:bg-orange-700 dark:hover:bg-orange-300/30",
        bg: "bg-orange-500 dark:bg-orange-300/20 border border-orange-500 dark:border-orange-300",
        text: "text-orange-50 dark:text-orange-300",
      };
    case "GB terminé":
      return {
        bgHover: "hover:bg-red-700 dark:hover:bg-red-300/30",
        bg: "bg-red-500 dark:bg-red-300/20 border border-red-500 dark:border-red-300",
        text: "text-red-50 dark:text-red-300",
      };
    case "Out Of Stock":
      return {
        bgHover: "hover:bg-gray-700 dark:hover:bg-gray-300/30",
        bg: "bg-gray-500 dark:bg-gray-300/20 border border-gray-500 dark:border-gray-300",
        text: "text-gray-50 dark:text-gray-800",
      };
    default:
      return {
        bgHover: "hover:bg-slate-700 dark:hover:bg-slate-300/30",
        bg: "bg-slate-500 dark:bg-slate-300/20 border border-slate-500 dark:border-slate-300",
        text: "text-slate-50 dark:text-slate-800",
      };
  }
};
