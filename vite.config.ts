import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import visualizer from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    //  visualizer({ open: true })
  ],
  base: "/",
  build: {
    sourcemap: true,
    outDir: "build",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("lodash")) return "vendor-lodash";
            return "vendor"; // Other node_modules
          }
        },
      },
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
});
