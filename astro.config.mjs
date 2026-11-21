// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Change this to the real address once the site is live (e.g. https://annieguyphotography.pages.dev)
  site: 'https://annieguyphotography.pages.dev',
  build: {
    // Inline CSS into each page: one less request before the first paint.
    inlineStylesheets: 'always',
  },
  image: { responsiveStyles: true },
});
