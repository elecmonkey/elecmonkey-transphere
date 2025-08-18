import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { ssgDevPlugin } from './plugins/ssg-dev.js';

export default defineConfig({
  plugins: [tailwindcss(), ssgDevPlugin()],
});

