import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The dev server proxies /api to the API, so the browser sees one origin,
// matching production (PRD 9.3), and no CORS is needed.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": { target: "http://localhost:4000", changeOrigin: false },
    },
  },
  build: {
    sourcemap: true,
  },
});
