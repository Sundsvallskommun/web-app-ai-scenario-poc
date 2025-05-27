import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const hosts = env.VITE_HOSTS ? env.VITE_HOSTS.split(",") : [];
  return {
    base: env.VITE_BASE_PATH || "/",
    server: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT, 10) : undefined,
    },
    preview: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT, 10) : undefined,
      allowedHosts: hosts,
    },
    plugins: [
      react(),
      VitePWA({
        manifest: {
          short_name: "Med livet som insats",
          name: "Med livet som insats",
          description:
            "Ett stöd för dialog med unga om vägval och dess konsekvenser",
          icons: [
            {
              src: "favicon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "favicon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
          start_url: ".",
          display: "standalone",
          theme_color: "#2F2F3C",
          background_color: "#2F2F3C",
        },
      }),
    ],
  };
});
