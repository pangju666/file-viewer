<script lang="ts" setup>
import { computed, onMounted, watch } from "vue";
import type { PdfUrl } from "@/types/file.ts";
import "@/assets/css/file-viewer.css";
import type { PdfPreviewOptions } from "@/types/options.ts";
import { DocumentEditor } from "@onlyoffice/document-editor-vue";
import { undefinedFileErrorMessage } from "@/utils/constants.ts";

const props = withDefaults(
  defineProps<
    PdfPreviewOptions & {
      src: PdfUrl | string;
      title?: string;
    }
  >(),
  {
    token: undefined,
    title: undefined,
    id: "only-office-pdf-editor",
    region: "zh-CN",
    mode: "pdfjs",
    onlyOfficeServerUrl: undefined,
    pdfjsViewBaseUrl: "https://mozilla.github.io/pdf.js/web/viewer.html",
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "error", errorDescription: string, errorCode?: number): void;
}>();

watch(
  () => props.src,
  (newVal) => {
    if (
      props.mode === "onlyOffice" &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (!newVal?.url || !newVal?.mimeType || !newVal?.key)
    ) {
      emits("error", undefinedFileErrorMessage);
    }
  },
  { immediate: true },
);

const pdfjsViewUrl = computed(() => {
  if (typeof props.src === "string") {
    return `${props.pdfjsViewBaseUrl}?file=${encodeURIComponent(props.src)}`;
  } else {
    return `${props.pdfjsViewBaseUrl}?file=${encodeURIComponent(props.src.url)}`;
  }
});

const onlyOfficeConfig = computed(() => ({
  documentType: "pdf",
  token: props.token,
  type: "embedded",
  document: {
    fileType: "pdf",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    key: props.src?.key,
    title: props.title ?? "",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    url: props.src?.url,
    permissions: {
      copy: true,
      download: true,
      print: true,
      chat: false,
      comment: false,
    },
  },
  editorConfig: {
    customization: {
      anonymous: {
        request: false,
      },
      close: {
        visible: false,
      },
    },
    region: props.region ?? "zh-CN",
    mode: "view",
  },
  events: {
    onAppReady: () => emits("ready"),
    onError: (e: unknown) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (e?.data) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        emits("error", e.data?.errorDescription, e.data?.errorCode);
      }
    },
  },
}));

onMounted(() => {
  if (props.mode === "onlyOffice" && !props.onlyOfficeServerUrl) {
    console.warn(
      "[PdfViewer] 未配置 OnlyOffice 服务器地址 (onlyOfficeServerUrl)。",
    );
    emits("error", "无法加载文档，预览服务不可用");
  }
});
</script>

<template>
  <div style="overflow: hidden">
    <document-editor
      v-if="mode === 'onlyOffice' && onlyOfficeServerUrl"
      :id="id"
      :document-server-url="onlyOfficeServerUrl"
      :config="onlyOfficeConfig"
    />
    <iframe
      v-else
      :src="pdfjsViewUrl"
      width="100%"
      height="100%"
      style="padding: 0; margin: 0; border: none"
      @load="$emit('ready')"
    />
  </div>
</template>
