import { type ClassValue, clsx } from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { MaterialType, StatusType } from "./api/contentful";
import UAParser from "ua-parser-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusList: Array<StatusType | string> = [
  "En stock",
  "Extras GB",
  "Extras In-Stock",
  "GB en cours",
  "GB terminé",
  "Interest Check",
  "Out Of Stock",
];

export const materialList: Array<MaterialType | string> = [
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
): { bg: ClassNameValue; text: ClassNameValue } => {
  switch (status) {
    case "En stock":
      return { bg: "bg-green-500", text: "text-green-50" };
    case "Extras In-Stock":
      return { bg: "bg-green-500", text: "text-green-50" };
    case "Extras GB":
    case "GB en cours":
    case "Interest Check":
      return { bg: "bg-orange-500", text: "text-orange-50" };
    case "GB terminé":
    case "Out Of Stock":
      return { bg: "bg-red-500", text: "text-red-50" };
    default:
      return "gray";
  }
};
