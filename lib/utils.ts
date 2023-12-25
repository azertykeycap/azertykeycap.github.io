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
        bgHover: "hover:bg-green-700",
        bg: "bg-green-500",
        text: "text-green-50",
      };
    case "Extras In-Stock":
      return {
        bgHover: "hover:bg-sky-700",
        bg: "bg-sky-500",
        text: "text-sky-50",
      };
    case "Extras GB":
      return {
        bgHover: "hover:bg-blue-700",
        bg: "bg-blue-500",
        text: "text-blue-50",
      };
    case "GB en cours":
      return {
        bgHover: "hover:bg-emerald-700",
        bg: "bg-emerald-500",
        text: "text-emerald-50",
      };
    case "Interest Check":
      return {
        bgHover: "hover:bg-orange-700",
        bg: "bg-orange-500",
        text: "text-orange-50",
      };
    case "GB terminé":
      return {
        bgHover: "hover:bg-red-700",
        bg: "bg-red-500",
        text: "text-red-50",
      };
    case "Out Of Stock":
      return {
        bgHover: "hover:bg-gray-700",
        bg: "bg-gray-500",
        text: "text-gray-50",
      };
    default:
      return {
        bgHover: "hover:bg-slate-700",
        bg: "bg-slate-500",
        text: "text-slate-50",
      };
  }
};
