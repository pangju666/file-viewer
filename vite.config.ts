import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import removeConsole from "vite-plugin-remove-console";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig([
  // =================配置 1: 组件库模式 (Library)=================
  {
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
      dts({
        include: ["src/components/**/*", "src/index.ts"],
        outDir: "dist/lib/types",
      }),
      AutoImport({
        dts: "~/types/auto-imports.d.ts",
        imports: [
          "vue",
          {
            "naive-ui": ["useMessage", "useLoadingBar"],
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
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "MyVueLib",
        fileName: (format) => `my-lib.${format}.js`,
        formats: ["es", "cjs", "umd"],
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: { vue: "Vue" },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) return "my-lib.css";
            return assetInfo.name!;
          },
        },
      },
      outDir: "dist/lib", // 输出到 dist/lib
      emptyOutDir: false, // 不要清空目录，因为下面还有一个构建
    },
  },
  // =================配置 2: 独立服务模式 (Application)=================
  {
    plugins: [
      vue(),
      AutoImport({
        dts: "~/types/auto-imports.d.ts",
        imports: [
          "vue",
          {
            "naive-ui": ["useMessage", "useLoadingBar"],
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
      outDir: "dist/app", // 输出到 dist/app
      emptyOutDir: true, // 只有最后一个构建可以清空，或者手动控制
      rollupOptions: {
        input: resolve(__dirname, "index.html"), // 标准 HTML 入口
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
        },
      },
    },
  },
]);
