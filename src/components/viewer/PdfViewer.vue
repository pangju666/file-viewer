<script setup lang="ts">
import { computed, onMounted } from "vue";
import "@/assets/css/file-viewer.css";
import type { PdfPreviewOptions } from "@/types/options.ts";

const props = withDefaults(
  defineProps<
    PdfPreviewOptions & {
      src: string;
    }
  >(),
  {
    pdfjsViewerUrl: "https://mozilla.github.io/pdf.js/web/viewer.html",
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "error", message: string): void;
}>();

const pdfjsPath = computed(
  () => `${props.pdfjsViewerUrl}?file=${encodeURIComponent(props.src)}`,
);

onMounted(() => {
  if (!props.pdfjsViewerUrl) {
    emits("error", "未配置pdfjs-viewer地址");
  }
});
</script>

<template>
  <iframe
    :src="pdfjsPath"
    width="100%"
    height="100%"
    class="pangju-no-border"
    @load="$emit('ready')"
  />
</template>
