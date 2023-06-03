import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import image from '@astrojs/image';
import compress from 'astro-compress';
import vanillaExtract from 'astro-vanilla-extract';
import vercel from '@astrojs/vercel/serverless';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), image(), vanillaExtract(), compress(), sitemap()],
  output: 'server',
  site: 'https://azertykeycaps.fr',
  adapter: vercel({
    analytics: true
  })
});