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
    customDownload?: (
      url: string,
      encoding?: string,
    ) => string | Promise<string>;
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
      })
      .catch((error: Error) => {
        if (props.onError && error) {
          props.onError(error);
        }
        emits("ready");
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
        emits("ready");
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
  <div class="full-size">
    <mavon-editor
      :value="content"
      class="h-100"
      :editable="false"
      v-bind="options"
      @change="$emit('ready')"
    />
  </div>
</template>
