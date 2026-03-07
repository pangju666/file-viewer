<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios, { type AxiosProgressEvent } from "axios";
import VueJsonViewer from "vue-json-viewer";
import "vue-json-viewer/style.css";
import { utf8Charset } from "@/utils/constants.ts";
import { getResult } from "@/utils/utils.ts";

const props = withDefaults(
  defineProps<{
    src: string;
    fileEncoding?: string;
    onProgress?: (loaded: number, total: number) => void;
    customDownload?: (
      url: string,
      encoding?: string,
    ) => string | Promise<string>;
  }>(),
  {
    fileEncoding: utf8Charset,
    onProgress: () => {},
    customDownload: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "error", error: Error): void;
}>();

const content = ref<string>();

onMounted(async () => {
  if (props.customDownload) {
    getResult(props.customDownload(props.src, props.fileEncoding))
      .then((res) => {
        content.value = res;
        emits("ready");
      })
      .catch((err: Error) => {
        emits("error", err);
      });
  } else {
    axios
      .get<string>(props.src, {
        responseType: "json",
        responseEncoding: props.fileEncoding,
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          const { loaded, total } = progressEvent;
          if (total) {
            props.onProgress?.(loaded, total);
          }
        },
      })
      .then((res) => {
        content.value = res.data;
        emits("ready");
      })
      .catch((err: Error) => {
        emits("error", err);
      });
  }
});

/*watch(
  () => props.src,
  async (newVal: string) => {
    const response = await axios.get<string>(newVal, {
      responseType: "json",
      responseEncoding: props.fileEncoding ?? utf8Charset,
    });
    content.value = response.data;
    emits("ready");
  },
);*/
</script>

<template>
  <div class="json-viewer">
    <vue-json-viewer
      :value="content"
      copyable
      :expand-depth="10"
      expanded
      show-array-index
    />
  </div>
</template>

<style scoped lang="less">
.json-viewer {
  overflow: auto;
  height: 100%;
}
</style>
