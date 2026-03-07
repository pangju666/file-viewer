<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios, { type AxiosProgressEvent } from "axios";
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

const content = ref<string | null>(null);

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
        responseType: "text",
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
    if (props.customDownload) {
      const response = getResult(
        props.customDownload(newVal, props.fileEncoding),
      );
      content.value = response?.data;
    } else {
      const response = await axios.get<string>(newVal, {
        responseType: "text",
        responseEncoding: props.fileEncoding,
      });
      content.value = response.data;
    }
    emits("ready");
  },
);*/
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
