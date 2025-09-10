import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  root: "src",
  base: "./", // important!
  build: {
    outDir: "../dist", // 👈 Output goes outside src/
    emptyOutDir: true, // Clean dist folder before build
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: false,
    }),
  ],
});
