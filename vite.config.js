import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import removeConsole from "vite-plugin-remove-console";
import stylelint from "vite-plugin-stylelint";
import * as path from "path";

export default defineConfig({
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            "~": path.resolve(__dirname, "./"),
            // eslint-disable-next-line no-undef
            "@": path.resolve(__dirname, "./src"),
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
        AutoImport({
            imports: [
                "vue",
                {
                    "naive-ui": ["useNotification"],
                },
            ],
        }),
        Components({
            resolvers: [NaiveUiResolver()],
        }),
        stylelint(),
        viteCompression(),
        vue(),
        cesium(),
        removeConsole(),
    ],
    sourceMap: false,
});
