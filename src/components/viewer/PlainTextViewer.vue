<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { utf8Charset } from "@/utils/constants.ts";

const props = withDefaults(
  defineProps<{
    src: string;
    fileEncoding?: string;
  }>(),
  {
    fileEncoding: utf8Charset,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

const content = ref<string | null>(null);

onMounted(async () => {
  const response = await axios.get<string>(props.src, {
    responseType: "text",
    responseEncoding: props.fileEncoding ?? utf8Charset,
  });
  content.value = response.data;
  emits("ready");
});

watch(
  () => props.src,
  async (newVal: string) => {
    const response = await axios.get<string>(newVal, {
      responseType: "text",
      responseEncoding: props.fileEncoding ?? utf8Charset,
    });
    content.value = response.data;
    emits("ready");
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
