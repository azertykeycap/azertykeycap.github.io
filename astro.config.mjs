import { defineConfig } from 'astro/config';
// https://astro.build/config

import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import image from '@astrojs/image';
import compress from 'astro-compress';
import vanillaExtract from 'astro-vanilla-extract';
import vercel from '@astrojs/vercel/edge';

export default defineConfig({
  integrations: [tailwind(), preact(), image(), vanillaExtract(), compress()],
  output: 'server',
  adapter: vercel({ analytics: true })
});
