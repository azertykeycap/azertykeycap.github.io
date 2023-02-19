import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import image from '@astrojs/image';
import compress from 'astro-compress';

// https://astro.build/config
import vanillaExtract from 'astro-vanilla-extract';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact(), image(), vanillaExtract(), compress()]
});
