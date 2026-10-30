// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // [TODO] Replace with the real domain before launch (used for canonical URLs and sitemap).
  site: 'https://www.recaclinic.my',
  output: 'static',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
