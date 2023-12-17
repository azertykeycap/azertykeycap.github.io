import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MaterialType, StatusType } from "./api/contentful";

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
