<script lang="ts" setup>
import { mavonEditor } from "mavon-editor";
import { onMounted, ref, watch } from "vue";
import axios, { type AxiosProgressEvent } from "axios";
import "mavon-editor/dist/css/index.css";
import { utf8Charset } from "@/utils/constants.ts";
import { getResult } from "@/utils/utils.ts";
import type { UrlWithFileEncoding } from "@/types/file.ts";

const props = withDefaults(
  defineProps<{
    src: UrlWithFileEncoding | string;
    options?: Record<string, unknown>;
    onProgress?: (event: AxiosProgressEvent) => void;
    fetcher?: (url: string, encoding?: string) => string | Promise<string>;
    onError?: (error: Error) => void;
  }>(),
  {
    options: () => ({
      subfield: false,
      defaultOpen: "preview",
      scrollStyle: true,
      toolbars: {
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true,
        navigation: true,
        subfield: true,
        preview: true,
      },
    }),
    onProgress: undefined,
    fetcher: undefined,
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

const getContent = (src: UrlWithFileEncoding | string) => {
  if (props.fetcher) {
    getResult(props.fetcher(getFileUrl(src), src?.fileEncoding ?? utf8Charset))
      .then((res) => {
        content.value = res;
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
    content.value = "";
    if (newVal) {
      getContent(newVal);
    }
  },
);
</script>

<template>
  <div class="full-size">
    <mavon-editor
      v-bind="options"
      :value="content"
      :editable="false"
      class="h-100"
      @change="$emit('ready')"
    />
  </div>
</template>
