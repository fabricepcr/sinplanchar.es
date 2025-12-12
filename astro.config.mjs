import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sinplanchar.es',
  output: 'static',
  server: {
    host: '0.0.0.0',
    port: 5000
  },
  vite: {
    server: {
      allowedHosts: true
    }
  }
});
