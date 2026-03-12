<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import {
  getFileEncodingFromUrl,
  getResult,
  getSrcFromUrl,
} from "@/utils/utils.ts";
import type { UrlWithFileEncoding } from "@/types/file.ts";

const props = withDefaults(
  defineProps<{
    src: UrlWithFileEncoding | string;
    fetcher?: (url: string, encoding?: string) => string | Promise<string>;
    onError?: (error: Error) => void;
  }>(),
  {
    onProgress: undefined,
    fetcher: undefined,
    onError: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

const content = ref<string>();

const getContent = async (src: UrlWithFileEncoding | string) => {
  if (props.fetcher) {
    getResult(props.fetcher(getSrcFromUrl(src), getFileEncodingFromUrl(src)))
      .then((res) => {
        content.value = res;
        emits("ready");
      })
      .catch((error: Error) => {
        if (props.onError && error) {
          props.onError(error);
        }
      });
  } else {
    try {
      const response = await fetch(getSrcFromUrl(src));
      content.value = await response.text();
      emits("ready");
    } catch (error) {
      if (props.onError && error) {
        props.onError(error as Error);
      }
    }
  }
};

onMounted(() => {
  if (props.src) {
    getContent(props.src);
  }
});

watch(
  () => props.src,
  (newVal: UrlWithFileEncoding | string) => {
    content.value = "";
    if (newVal) {
      getContent(newVal);
    }
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
  padding: 15px;
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
