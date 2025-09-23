import { defineConfig } from "vite";
import hydrogen from "@shopify/hydrogen/plugin";

export default defineConfig({
  plugins: [hydrogen()],
  ssr: {
    noExternal: [
      "@shopify/hydrogen",
      "jquery",
      "matter-js",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
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
