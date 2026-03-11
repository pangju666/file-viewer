<script setup lang="ts">
import { computed } from "vue";
import type { PdfUrl } from "@/types/file.ts";
import "@/assets/css/pangju.css";

const props = withDefaults(
  defineProps<{
    src: PdfUrl;
  }>(),
  {},
);

defineEmits<{
  (e: "ready"): void;
}>();

const pdfjsPath = computed(
  () =>
    `/pdfjs/web/viewer.html?file=${encodeURIComponent(props.src?.url)}&password=${props.src?.password}`,
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
