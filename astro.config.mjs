import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), compress(), image()]
});