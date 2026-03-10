<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import axios, { type AxiosProgressEvent } from "axios";
import VueJsonViewer from "vue-json-viewer";
import "vue-json-viewer/style.css";
import { utf8Charset } from "@/utils/constants.ts";
import { getResult } from "@/utils/utils.ts";
import type { UrlWithFileEncoding } from "@/types/file.ts";

const props = withDefaults(
  defineProps<{
    src: UrlWithFileEncoding | string;
    options?: Record<string, unknown>;
    onProgress?: (event: AxiosProgressEvent) => void;
    customDownload?: (
      url: string,
      encoding?: string,
    ) => Record<string, unknown> | Promise<Record<string, unknown>>;
    onError?: (error: Error) => void;
  }>(),
  {
    options: () => ({
      copyable: true,
      expandDepth: 10,
      expanded: true,
      showArrayIndex: true,
    }),
    onProgress: undefined,
    customDownload: undefined,
    onError: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

const content = ref<Record<string, unknown>>({});

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
      .get<Record<string, unknown>>(getFileUrl(src), {
        responseType: "json",
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
    content.value = {};
    downloadContent(newVal);
  },
);
</script>

<template>
  <div class="json-viewer">
    <vue-json-viewer :value="content" v-bind="options" />
  </div>
</template>

<style scoped lang="less">
.json-viewer {
  overflow: auto;
  height: 100%;
}
</style>
