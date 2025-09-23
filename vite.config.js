import { defineConfig } from "vite";
import hydrogen from "@shopify/hydrogen/plugin";

export default defineConfig({
  plugins: [hydrogen()],
  ssr: {
    noExternal: [
      "@shopify/hydrogen",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "matter-js",
      "jquery",
    ],
  },

  server: {
    port: 3000,
    host: true,
  },
  define: {
    global: "globalThis",
  },
  build: {
    rollupOptions: {
      input: "./src/entry-server.jsx",
    },
  },
});
