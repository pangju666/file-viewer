<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    src: string;
  }>(),
  {},
);

defineEmits<{
  (e: "ready"): void;
}>();

const pdfjsPath = computed(
  () => `/pdfjs/web/viewer.html?file=${encodeURIComponent(props.src)}`,
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
