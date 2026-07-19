import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      // "@/..." trỏ tới thư mục src — không phụ thuộc plugin ngoài
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
