/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ZNMI",
      fileName: "znmi",
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into your library
      external: ["axios", "zod", "qs"],
      output: {
        // Configure output globals for externalized deps
        globals: {
          axios: "Axios",
          zod: "Zod",
          qs: "qs",
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  test: {
    include: ["tests/*.test.ts"],
  },
});
