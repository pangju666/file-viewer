<script setup lang="ts">
import { computed } from "vue";
import type { PdfUrl } from "@/types/file.ts";

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
    style="border: none"
    @load="$emit('ready')"
  />
</template>
