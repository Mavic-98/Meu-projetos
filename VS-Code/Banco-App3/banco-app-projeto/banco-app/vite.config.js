// vite.config.js
// ⚠️ base: "./" é OBRIGATÓRIO para o Capacitor carregar assets corretamente
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",                  // necessário para o Capacitor (caminhos relativos)
  build: {
    outDir: "dist",            // pasta que o Capacitor vai empacotar
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
