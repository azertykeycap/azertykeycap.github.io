import { type ClassValue, clsx } from "clsx";
import { encode } from "blurhash";
import { twMerge } from "tailwind-merge";
import { blurhashToCssGradientString } from "@unpic/placeholder";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const getBlurhash = async (url: string) => {
//   const jpgData = await getPixels(url);
//   const data = Uint8ClampedArray.from(jpgData.data);
//   const blurhash = encode(data, jpgData.width, jpgData.height, 4, 4);

//   console.log(blurhash);
//   return blurhash;
// };

// export const getPlaceholder = async (img: string) => {
//   return await blurhashToCssGradientString(
//     await getBlurhash(`https:${img}?fit=fill&w=560&h=370&fm=webp&q=70`)
//   );
// };
