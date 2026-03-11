<script lang="ts" setup>
import { watch, ref, onMounted } from "vue";
import axios, { type AxiosProgressEvent } from "axios";
import VueJsonViewer from "vue-json-viewer";
import "vue-json-viewer/style.css";
import {
  getResult,
  getSrcFromUrl,
  getFileEncodingFromUrl,
} from "@/utils/utils.ts";
import type { UrlWithFileEncoding } from "@/types/file.ts";

const props = withDefaults(
  defineProps<{
    src: UrlWithFileEncoding | string;
    options?: Record<string, unknown>;
    onProgress?: (event: AxiosProgressEvent) => void;
    fetcher?: (
      url: string,
      fileEncoding?: string,
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
    fetcher: undefined,
    onError: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

const content = ref<Record<string, unknown>>({});

const getContent = (src: UrlWithFileEncoding | string) => {
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
    axios
      .get<Record<string, unknown>>(getSrcFromUrl(src), {
        responseType: "json",
        responseEncoding: getFileEncodingFromUrl(src),
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
  if (props.src) {
    getContent(props.src);
  }
});

watch(
  () => props.src,
  (newVal: UrlWithFileEncoding | string) => {
    content.value = {};
    if (newVal) {
      getContent(newVal);
    }
  },
);
</script>

<template>
  <div class="json-viewer">
    <vue-json-viewer v-bind="options" :value="content" />
  </div>
</template>

<style scoped lang="less">
.json-viewer {
  overflow: auto;
  height: 100%;
}
</style>
