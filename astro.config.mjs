import { defineConfig } from 'astro/config';
import lit from "@astrojs/lit";
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [lit()]
});