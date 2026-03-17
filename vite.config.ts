import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(() => {
  return {
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
        //dts: "~/types/auto-imports.d.ts",
        imports: ["vue"],
      }),
      Components({
        dts: false,
        //dts: "~/types/components.d.ts",
        resolvers: [NaiveUiResolver()],
      }),
      dts({
        include: ["src"],
        exclude: ["src/App.vue", "src/main.ts", "src/views/**"],
        outDir: "dist/types",
      }),
    ],
    build: {
      outDir: "dist",
      emptyOutDir: true,
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        fileName: (format) => `index.${format}.js`,
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: ["vue", "vue-router", /^node:.*/],
        output: {
          exports: "named",
          globals: {
            vue: "Vue",
          },
        },
      },
      minify: "esbuild",
      sourcemap: true,
    },
  };
});
