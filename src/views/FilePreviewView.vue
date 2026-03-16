<script lang="ts" setup>
import FilePreview from "@/components/FilePreview.vue";
import { computed, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    id?: string;
    url: string;
    mimeType?: string;
    filename?: string;
  }>(),
  {
    id: undefined,
    mimeType: undefined,
    filename: undefined,
  },
);

const fileItem = computed(() => ({
  file: props.url,
  mimeType: props.mimeType,
  id: props.id,
  name: props.filename,
}));

onMounted(() => {});
</script>

<template>
  <file-preview :file="fileItem" class="pangju-wh-100" />
</template>
