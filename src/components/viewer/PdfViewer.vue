<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string;
  }>(),
  {},
);

defineEmits<{
  (e: "ready"): void;
}>();
</script>

<template>
  <iframe
    :src="`/pdfjs/web/viewer.html?file=${encodeURIComponent(src)}`"
    width="100%"
    height="100%"
    style="border: none"
  />
</template>
