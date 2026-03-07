<script lang="ts" setup>
import { mavonEditor } from "mavon-editor";
import { onMounted, ref } from "vue";
import axios, { type AxiosProgressEvent } from "axios";
import "mavon-editor/dist/css/index.css";
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
    const response = await axios.get<string>(newVal, {
      responseType: "text",
    });
    content.value = response.data;
    emits("ready");
  },
);*/
</script>

<template>
  <div class="md-viewer">
    <mavon-editor
      v-model="content"
      :subfield="false"
      default-open="preview"
      :editable="false"
      :toolbars-flag="false"
      :scroll-style="true"
    />
  </div>
</template>

<style scoped lang="less">
.md-viewer {
  overflow: auto;
  height: 100%;
}
</style>
