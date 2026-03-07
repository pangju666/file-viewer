import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import removeConsole from "vite-plugin-remove-console";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "./"),
      "@": resolve(__dirname, "src"),
    },
  },
  assetsInclude: [
    "**/*.md",
    "**/*.glb",
    "**/*.stl",
    "**/*.obj",
    "**/*.txt",
    "**/*.json5",
    "**/*.ppt",
    "**/*.pptx",
    "**/*.docx",
    "**/*.doc",
    "**/*.xlsx",
    "**/*.xls",
    "**/*.pdf",
  ],
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
      dts: "~/types/auto-imports.d.ts",
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        },
      ],
    }),
    Components({
      dts: "~/types/components.d.ts",
      resolvers: [NaiveUiResolver()],
    }),
    removeConsole(),
    viteCompression(),
  ],
  build: {
    sourcemap: false,
  },
});
