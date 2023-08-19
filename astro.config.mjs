import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind({applyBaseStyles: false}), react(), image()],
  adapter: node({
    mode: 'standalone'
  })
});
