import { defineConfig } from "vite";
import hydrogen from "@shopify/hydrogen/plugin";

export default defineConfig({
  plugins: [hydrogen()],
  ssr: {
    // Force SSR to treat these packages as ESM and bundle them
    noExternal: [
      "@shopify/hydrogen",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "matter-js",
      "jquery",
    ],
  },
  resolve: {
    alias: {
      // Sometimes jQuery needs explicit ESM alias
      jquery: "jquery/dist/jquery.esm.js",
    },
  },
  define: {
    // Ensure global variables work in worker
    global: "globalThis",
    "process.env": {},
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    rollupOptions: {
      // Entry should be your server entry
      input: "./src/entry-server.jsx",
    },
    target: "esnext", // Ensure modern ESM output
    minify: false, // Optional: helps debug worker issues
  },
});
