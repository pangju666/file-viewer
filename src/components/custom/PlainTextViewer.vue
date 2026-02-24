<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";

const props = withDefaults(
  defineProps<{
    url: string;
    fileEncoding?: string;
  }>(),
  {
    fileEncoding: "utf-8",
  },
);

const emits = defineEmits<{
  (e: "finished"): void;
}>();

const content = ref<string | null>(null);

onMounted(async () => {
  const response = await axios.get<string>(props.url, {
    responseType: "text",
    responseEncoding: props.fileEncoding ?? "utf-8",
  });
  content.value = response.data;
  emits("finished");
});

watch(
  () => props.url,
  async (newVal: string) => {
    const response = await axios.get<string>(newVal, {
      responseType: "text",
      responseEncoding: props.fileEncoding ?? "utf-8",
    });
    content.value = response.data;
    emits("finished");
  },
);
</script>

<template>
  <div class="plain-text-viewer">
    <pre>{{ content }}</pre>
  </div>
</template>

<style scoped lang="less">
.plain-text-viewer {
  overflow: hidden auto;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #000;

  > pre {
    white-space: pre-wrap; /* 保留原始换行 + 允许自动换行 */
    overflow-wrap: break-word;
  }
}
</style>
