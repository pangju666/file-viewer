import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import removeConsole from "vite-plugin-remove-console";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

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
    plugins: [
      vue(),
      AutoImport({
        dts: "~/types/auto-imports.d.ts",
        imports: [
          "vue",
          {
            "naive-ui": ["useLoadingBar"],
          },
        ],
      }),
      Components({
        dts: "~/types/components.d.ts",
        resolvers: [NaiveUiResolver()],
      }),
    ],
  };

  // ================= 配置 1: 组件库模式 (Library) =================
  if (isLib) {
    return {
      ...baseConfig,
      plugins: [
        ...baseConfig.plugins,
        dts({
          include: [
            "src/components/**/*",
            "src/types/**/*",
            "src/utils/**/*",
            "src/index.ts",
          ],
          outDir: "dist/lib/types",
        }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "PangjuFileViewer",
          formats: ["es", "cjs"],
          fileName: (format) => {
            if (format === "es") return "index.es.mjs";
            if (format === "cjs") return "index.cjs.js";
            return `index.${format}.js`;
          },
        },
        rollupOptions: {
          treeshake: {
            propertyReadSideEffects: false,
          },
          external: [
            "@vueuse/core",
            "axios",
            "vue",
            "@babylonjs/viewer",
            "dxf-viewer",
            "mavon-editor",
            "three",
            "file-type",
            "video.js",
            "viewerjs",
            "vue-json-viewer",
            "vue-router",
            /^node:.*/,
          ],
          output: {
            exports: "named",
            preserveModulesRoot: "src",
            assetFileNames: (assetInfo) => {
              const hasCssSource = assetInfo.originalFileNames?.some((name) =>
                name.endsWith(".css"),
              );
              const hasCssName =
                !hasCssSource &&
                assetInfo.names?.some((name) => name.endsWith(".css"));
              if (hasCssSource || hasCssName) {
                return "index.css";
              }
              return "assets/[name].[hash][extname]";
            },
          },
        },
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log", "info"],
          },
        },
        assetsInclude: [/\.ttf$/],
        outDir: "dist/lib",
        emptyOutDir: true,
        minify: "terser",
        cssCodeSplit: false,
        sourceMap: true,
      },
    };
  }

  // ================= 配置 2: 独立服务模式 (Application) =================
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
  };
});
