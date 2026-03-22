<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import {
  getFileEncodingFromUrl,
  getResult,
  getSrcFromUrl,
} from "@/utils/utils.ts";
import type { UrlWithFileEncoding } from "@/types/file.ts";
import type { TextPreviewOptions } from "@/types/options.ts";

const props = withDefaults(
  defineProps<
    TextPreviewOptions & {
      src: UrlWithFileEncoding | string;
    }
  >(),
  {
    contentLoader: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "error", error: Error): void;
}>();

watch(
  () => props.src,
  (newVal: UrlWithFileEncoding | string) => {
    content.value = "";

    if (newVal) {
      getContent(newVal);
    }
  },
  { deep: true },
);

const content = ref<string>();

const getContent = async (src: UrlWithFileEncoding | string) => {
  if (props.contentLoader) {
    getResult(
      props.contentLoader(getSrcFromUrl(src), getFileEncodingFromUrl(src)),
    )
      .then((res) => {
        content.value = res;
        emits("ready");
      })
      .catch((error: Error) => {
        if (error) {
          emits("error", error);
        }
      });
  } else {
    try {
      const response = await fetch(getSrcFromUrl(src));
      content.value = await response.text();
      emits("ready");
    } catch (error) {
      if (error) {
        emits("error", error as Error);
      }
    }
  }
};

onMounted(() => {
  if (props.src) {
    getContent(props.src);
  }
});
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
  font-size: 16px;
  color: #000;

  > pre {
    white-space: pre-wrap; /* 保留原始换行 + 允许自动换行 */
    overflow-wrap: break-word;
  }
}
</style>
