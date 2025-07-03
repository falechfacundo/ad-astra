import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";

// Convert import.meta.url to a directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
