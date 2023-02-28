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
  const inter600 = await fetch(
    'https://rsms.me/inter/font-files/Inter-SemiBold.woff'
  ).then((res) => res.arrayBuffer());

  const svg = await satori(Component(props), {
    debug: debug,
    width: width,
    height: height,
    fonts: [
      {
        name: 'Inter',
        data: inter600,
        weight: 600,
        style: 'normal'
      }
    ]
  });

  return await sharp(Buffer.from(svg)).png().toBuffer();
}
