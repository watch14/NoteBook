import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Ensure source maps are generated
  },
  define: {
    "process.env": {}, // Provide an empty object to avoid ReferenceError
  },
});
