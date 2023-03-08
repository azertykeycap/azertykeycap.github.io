import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import image from '@astrojs/image';
import compress from 'astro-compress';
import vanillaExtract from 'astro-vanilla-extract';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [preact(), image(), vanillaExtract(), compress()],
  output: 'server',
  adapter: vercel({ analytics: true })
});
