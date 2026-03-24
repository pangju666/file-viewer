import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { resolve } from "node:path";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  base: "/file-viewer",
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
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("babylon-"),
        },
      },
    }),
    AutoImport({
      dts: false,
      imports: ["vue"],
    }),
    Components({
      dts: false,
      resolvers: [NaiveUiResolver()],
    }),
    viteCompression({ algorithm: "gzip" }),
  ],
  build: {
    outDir: "docs",
    sourcemap: false,
  },
});
