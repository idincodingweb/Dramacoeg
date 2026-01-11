import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // --- LOGIKA PEBISNIS: AKTIFKAN PWA DI MODE DEV ---
      devOptions: {
        enabled: true, // Biar fitur install & service worker jalan saat npm run dev
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "DramaID - Nonton Drama Pendek",
        short_name: "DramaID",
        description: "Streaming Drama Cina Pendek Sub Indo Terlengkap",
        theme_color: "#0a0a0c",
        background_color: "#0a0a0c",
        display: "standalone", // Biar jadi aplikasi full screen tanpa bar browser
        orientation: "portrait",
        start_url: "/", // Titik masuk utama aplikasi
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable", // Biar icon D merah lu fleksibel di semua jenis HP
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});