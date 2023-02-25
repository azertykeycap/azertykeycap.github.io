import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import image from '@astrojs/image';
import compress from 'astro-compress';

// https://astro.build/config
import vanillaExtract from 'astro-vanilla-extract';

// https://astro.build/config
import satori from 'astro-satori';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    preact(),
    image(),
    vanillaExtract(),
    compress(),
    satori({
      satoriOptionsFactory: async () => {
        const fontFileRegular = await fetch(
          'https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf'
        );
        const fontRegular = await fontFileRegular.arrayBuffer();

        const fontFileBold = await fetch(
          'https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf'
        );

        const fontBold = await fontFileBold.arrayBuffer();

        const options = {
          width: 1200,
          height: 630,
          embedFont: true,
          fonts: [
            {
              name: 'IBM Plex Mono',
              data: fontRegular,
              weight: 400,
              style: 'normal'
            },
            {
              name: 'IBM Plex Mono',
              data: fontBold,
              weight: 600,
              style: 'normal'
            }
          ]
        };

        return options;
      }
    })
  ]
});
