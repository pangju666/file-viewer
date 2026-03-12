<script lang="ts" setup>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { onMounted, ref, watch } from "vue";
import {
  getFileEncodingFromUrl,
  getResult,
  getSrcFromUrl,
} from "@/utils/utils.ts";
import type { UrlWithFileEncoding } from "@/types/file.ts";
import "@/assets/css/pangju.css";

const props = withDefaults(
  defineProps<{
    src: UrlWithFileEncoding | string;
    options?: Record<string, unknown>;
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

defineEmits<{
  (e: "ready"): void;
}>();

const content = ref<string>();

const getContent = async (src: UrlWithFileEncoding | string) => {
  if (props.fetcher) {
    getResult(props.fetcher(getSrcFromUrl(src), getFileEncodingFromUrl(src)))
      .then((res) => {
        content.value = res;
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
  <div class="pangju-wh-100">
    <mavon-editor
      v-bind="options"
      :value="content"
      :editable="false"
      class="pangju-h-100"
      @change="$emit('ready')"
    />
  </div>
</template>
