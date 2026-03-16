<script lang="ts" setup>
import { watch, ref, onMounted, computed } from "vue";
import { JsonViewer as VueJsonViewer } from "vue3-json-viewer";
import "vue3-json-viewer/dist/vue3-json-viewer.css";
import {
  getFileEncodingFromUrl,
  getResult,
  getSrcFromUrl,
} from "@/utils/utils.ts";
import type { UrlWithFileEncoding } from "@/types/file.ts";
import type { JsonPreviewOptions } from "@/types/options.ts";

const props = withDefaults(
  defineProps<
    JsonPreviewOptions & {
      src: UrlWithFileEncoding | string;
      contentLoader?: (
        url: string,
        fileEncoding?: string,
      ) => Record<string, unknown> | Promise<Record<string, unknown>>;
    }
  >(),
  {
    viewerOptions: () => ({
      copyable: true,
      expanded: true,
      expandDepth: 10,
    }),
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
    content.value = {};
    if (newVal) {
      getContent(newVal);
    }
  },
  { deep: true },
);

const vueJsonViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { value, ...options } = props.viewerOptions ?? {};
  return options;
});

const content = ref<Record<string, unknown>>({});

const getContent = async (src: UrlWithFileEncoding | string) => {
  if (props.contentLoader) {
    getResult<Record<string, unknown>>(
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
      content.value = await response.json();
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
  <div class="json-viewer">
    <vue-json-viewer v-bind="vueJsonViewerProps" :value="content" />
  </div>
</template>

<style scoped lang="less">
.json-viewer {
  overflow: auto;
  width: 100%;
  height: 100%;
}
</style>
