import sharp from 'sharp';
// @ts-ignore: no types
import initYoga from 'yoga-wasm-web/asm';
// @ts-ignore: no types
import satori, { init as initSatori } from 'satori/wasm';

const YOGA = initYoga();
initSatori(YOGA);

export type ImageOptions = {
  width: number;
  height: number;
  debug?: boolean;
};

export async function generateImage(
  Component: any,
  props: Record<string, any>,
  { width, height, debug }: ImageOptions
) {
  const roboto500 = await fetch(
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff'
  ).then((res) => res.arrayBuffer());

  const svg = await satori(Component(props), {
    debug: debug,
    width: width,
    height: height,
    fonts: [
      {
        name: 'Roboto',
        data: roboto500,
        weight: 400,
        style: 'normal'
      }
    ]
  });

  return await sharp(Buffer.from(svg)).png().toBuffer();
}
