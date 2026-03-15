import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";
import removeConsole from "vite-plugin-remove-console";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(({ mode }) => {
  const isLib = mode === "lib";

  // ================= 基础通用配置 =================
  const baseConfig = {
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
  };

  // ================= 配置 1: 组件库模式 (Library) =================
  if (isLib) {
    return {
      ...baseConfig,
      plugins: [
        vue(),
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
          outDir: "dist/lib/types",
        }),
      ],
      build: {
        outDir: "dist/lib",
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
  }

  /*// ================= 配置 2: 独立服务模式 (Application) =================
  return {
    ...baseConfig,
    plugins: [...baseConfig.plugins, removeConsole(), viteCompression()],
    build: {
      outDir: "dist/app",
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, "index.html"),
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
        },
      },
      sourceMap: false,
    },
  };*/
});
