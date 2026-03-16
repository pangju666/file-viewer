<script lang="ts" setup>
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { computed, ref, onMounted, watch } from "vue";
import {
  getFileEncodingFromUrl,
  getResult,
  getSrcFromUrl,
} from "@/utils/utils.ts";
import type { UrlWithFileEncoding } from "@/types/file.ts";
import "@/assets/css/file-viewer.css";
import type { MarkdownPreviewOptions } from "@/types/options.ts";

const props = withDefaults(
  defineProps<
    MarkdownPreviewOptions & {
      src: UrlWithFileEncoding | string;
      contentLoader?: (
        url: string,
        encoding?: string,
      ) => string | Promise<string>;
    }
  >(),
  {
    id: "markdown-viewer",
    viewerOptions: undefined,
    showCatalog: true,
    catalogWidth: 300,
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
    content.value = "";
    if (newVal) {
      getContent(newVal);
    }
  },
  { deep: true },
);

const mdPreviewProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, modelValue, editorId, ...options } = props.viewerOptions ?? {};
  return options;
});

const content = ref<string>();

const getContent = async (src: UrlWithFileEncoding | string) => {
  if (props.contentLoader) {
    getResult<string>(
      props.contentLoader(getSrcFromUrl(src), getFileEncodingFromUrl(src)),
    )
      .then((res) => {
        content.value = res;
      })
      .catch((error: Error) => {
        if (error) {
          emits("error", error);
        }
      });
  } else {
    try {
      const response = await fetch(getSrcFromUrl(src));
      content.value = await response.text();
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
  <n-layout :has-sider="showCatalog">
    <n-layout-sider v-if="showCatalog" :width="catalogWidth" bordered>
      <div class="pangju-wh-100">
        <div class="catalog-panel-title">图 层</div>
        <n-scrollbar style="max-height: calc(100% - 18px - 16px - 16px)">
          <md-catalog :editor-id="id" />
        </n-scrollbar>
      </div>
    </n-layout-sider>
    <n-layout-content>
      <md-preview
        v-bind="mdPreviewProps"
        :id="id"
        class="pangju-wh-100"
        :model-value="content"
        @remount="$emit('ready')"
      ></md-preview>
    </n-layout-content>
  </n-layout>
</template>

<style lang="less" scoped>
.catalog-panel-title {
  padding: 16px;
  font-size: 16px;
  color: #757575;
  font-weight: bold;
  line-height: 18px;
}
</style>
