<script lang="ts" setup>
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { computed, onMounted, ref, watch } from "vue";
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
    }
  >(),
  {
    mdPreviewProps: undefined,
    showCatalog: true,
    catalogWidth: 350,
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

const bindMdEditorProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { toolbars, modelValue, footers, ...options } =
    props.mdPreviewProps ?? {};
  return options;
});

const editorRef = ref();
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
  editorRef.value?.togglePreviewOnly(true);
  if (props.showCatalog) {
    editorRef.value?.toggleCatalog(true);
  }

  if (props.src) {
    getContent(props.src);
  }
});
</script>

<template>
  <div>
    <md-editor
      v-bind="bindMdEditorProps"
      ref="editorRef"
      style="width: 100%; height: 100%"
      :model-value="content"
      :toolbars="[]"
      :footers="[]"
      @remount="$emit('ready')"
    ></md-editor>
  </div>
</template>

<style>
.md-editor-catalog-editor {
  width: v-bind(catalogWidth) px;
}
</style>
