<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import axios, { type AxiosProgressEvent } from "axios";
import { utf8Charset } from "@/utils/constants.ts";
import { getResult } from "@/utils/utils.ts";
import type { UrlWithFileEncoding } from "@/types/file.ts";

const props = withDefaults(
  defineProps<{
    src: UrlWithFileEncoding | string;
    onProgress?: (event: AxiosProgressEvent) => void;
    customDownload?: (
      url: string,
      encoding?: string,
    ) => string | Promise<string>;
    onError?: (error: Error) => void;
  }>(),
  {
    onProgress: undefined,
    customDownload: undefined,
    onError: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

const content = ref<string>();

const getFileUrl = (src: UrlWithFileEncoding | string) => {
  if (typeof src === "string") {
    return src;
  }
  return src.url;
};

const downloadContent = (src: UrlWithFileEncoding | string) => {
  if (props.customDownload) {
    getResult(
      props.customDownload(getFileUrl(src), src?.fileEncoding ?? utf8Charset),
    )
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
    axios
      .get<string>(getFileUrl(src), {
        responseType: "text",
        responseEncoding: src?.fileEncoding ?? utf8Charset,
        onDownloadProgress: (event: AxiosProgressEvent) => {
          if (props.onProgress) {
            props.onProgress(event);
          }
        },
      })
      .then((res) => {
        content.value = res.data;
        emits("ready");
      })
      .catch((error: Error) => {
        if (props.onError && error) {
          props.onError(error);
        }
      });
  }
};

onMounted(() => {
  downloadContent(props.src);
});

watch(
  () => props.src,
  (newVal: UrlWithFileEncoding | string) => {
    content.value = "";
    downloadContent(newVal);
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
