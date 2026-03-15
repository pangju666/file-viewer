<script setup lang="ts">
import { computed } from "vue";
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

defineEmits<{
  (e: "ready"): void;
}>();

const pdfjsPath = computed(
  () => `${props.pdfjsViewerUrl}?file=${encodeURIComponent(props.src)}`,
);
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
