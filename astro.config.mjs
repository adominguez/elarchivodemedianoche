// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // El expediente se renderiza bajo demanda: lee la definición y el progreso de Turso.
  output: 'server',
  adapter: vercel(),

  integrations: [react()],

  /**
   * `astro:env` separa explícitamente lo que puede salir al cliente de lo que no.
   * Todo lo marcado como `secret` vive únicamente en el servidor.
   */
  env: {
    schema: {
      // --- Turso (libSQL) -------------------------------------------------
      // En desarrollo puede omitirse: se usa un fichero libSQL local como
      // borrador. En producción es obligatorio apuntar a `libsql://...`.
      TURSO_DATABASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      TURSO_AUTH_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),

      // --- Cloudinary -----------------------------------------------------
      // El cloud name es público por naturaleza (aparece en cada URL), pero se
      // declara como `secret` a propósito: en `astro:env` sólo los secretos se
      // leen del entorno en tiempo de ejecución; los públicos se incrustan al
      // compilar. Así la misma imagen del servidor sirve para cualquier cuenta
      // de Cloudinary sin volver a construir. Las URLs se generan al renderizar,
      // de modo que nunca llega al cliente.
      CLOUDINARY_CLOUD_NAME: envField.string({ context: 'server', access: 'secret', optional: true }),
      // --- Panel de dirección ---------------------------------------------
      // Llave única del panel de telemetría (`/admin`). Si está vacía, el panel
      // no existe: el middleware responde 404 en lugar de mostrar un login.
      ADMIN_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),

      // Sólo necesarias para subir/generar imágenes (fuera del MVP de lectura).
      CLOUDINARY_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CLOUDINARY_API_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'EB Garamond',
      cssVariable: '--font-garamond',
      weights: [400, 500, 600],
      styles: ['normal', 'italic'],
      fallbacks: ['Iowan Old Style', 'Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Special Elite',
      cssVariable: '--font-elite',
      weights: [400],
      fallbacks: ['Courier New', 'monospace'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
