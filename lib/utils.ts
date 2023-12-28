import { type ClassValue, clsx } from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { MaterialType, StatusType } from "./api/contentful";

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

export const getStatusColor = (
  status: StatusType
): { bg: ClassNameValue; text: ClassNameValue } => {
  switch (status) {
    case "En stock":
      return {
        bg: "bg-green-600 dark:bg-green-300/20 border border-green-600 dark:border-green-300",
        text: "text-white",
      };
    case "Extras In-Stock":
      return {
        bg: "bg-sky-500 dark:bg-sky-300/20 border border-sky-500 dark:border-sky-300",
        text: "text-white",
      };
    case "Extras GB":
      return {
        bg: "bg-blue-500 dark:bg-blue-300/20 border border-blue-500 dark:border-blue-300",
        text: "text-white",
      };
    case "GB en cours":
      return {
        bg: "bg-emerald-500 dark:bg-emerald-300/20 border border-emerald-500 dark:border-emerald-300",
        text: "text-white",
      };
    case "Interest Check":
      return {
        bg: "bg-orange-500 dark:bg-orange-300/20 border border-orange-500 dark:border-orange-300",
        text: "text-white",
      };
    case "GB terminé":
      return {
        bg: "bg-red-500 dark:bg-red-300/20 border border-red-500 dark:border-red-300",
        text: "text-white",
      };
    case "Out Of Stock":
      return {
        bg: "bg-gray-500 dark:bg-gray-300/20 border border-gray-500 dark:border-gray-300",
        text: "text-white",
      };
    default:
      return {
        bg: "bg-slate-500 dark:bg-slate-300/20 border border-slate-500 dark:border-slate-300",
        text: "text-white",
      };
  }
};
