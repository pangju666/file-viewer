<script setup lang="ts">
import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
import "@/assets/css/pangju.css";
import type { PdfViewerProps } from "@/types/viewer.ts";
import type { UrlWithFilename } from "@/types/file.ts";

withDefaults(
  defineProps<
    PdfViewerProps & {
      src: UrlWithFilename;
    }
  >(),
  {},
);

defineEmits<{
  (e: "ready"): void;
}>();
</script>

<template>
  <vue-pdf-app
    class="pangju-wh-100"
    :pdf="src.url"
    :file-name="src.filename"
    :title="showTitle"
    :theme="theme"
    :page-scale="pageScale"
    :page-number="pageNumber"
    :config="config"
    :id-config="config"
    @pages-rendered="$emit('ready')"
  ></vue-pdf-app>
</template>
