import { defineConfig } from "vite";
<<<<<<< HEAD
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
=======
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // src/server.ts wraps the SSR entry for error handling.
    }),
    viteReact(),
  ],
  ssr: {
    // docx-preview uses DOM APIs (document.createElement, appendChild)
    // which are not available during SSR. Mark as external so it only runs client-side.
    external: ["docx-preview"],
>>>>>>> origin/Ai-Study-fix-folder-refactor
  },
});
