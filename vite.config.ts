import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@/data/content": path.resolve(__dirname, "content.ts"),
      "@/hooks/useLenis": path.resolve(__dirname, "useLenis.ts"),
      "@/utils/cn": path.resolve(__dirname, "cn.ts"),
      "@": __dirname,
    },
  },
});
