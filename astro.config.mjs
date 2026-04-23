import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  // 'server' permite que la web sea dinámica (necesario para la base de datos)
  output: 'server', 
  // Adaptador oficial para que Vercel entienda el proyecto
  adapter: vercel(),
  // Inyectamos Tailwind para el diseño
  integrations: [tailwind()],
});
