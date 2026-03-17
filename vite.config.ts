import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";
import { resolve } from "node:path";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "./"),
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        math: "always",
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      dts: false,
      imports: ["vue"],
    }),
    Components({
      dts: false,
      //dts: "~/types/components.d.ts",
      resolvers: [NaiveUiResolver()],
    }),
    viteCompression({ algorithm: "gzip" }),
  ],
  build: {
    emptyOutDir: true,
    outDir: "dist/app",
    sourcemap: false,
    minify: "esbuild",
  },
});
