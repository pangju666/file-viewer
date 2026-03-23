<script lang="ts" setup>
import { computed, onMounted } from "vue";
import type { OnlyOfficeUrl } from "@/types/file.ts";
import "@/assets/css/file-viewer.css";
import type { OfficePreviewOptions } from "@/types/options.ts";
import { DocumentEditor } from "@onlyoffice/document-editor-vue";
import { filenameAlphabet } from "@/utils/constants.ts";
import { customAlphabet, nanoid } from "nanoid";

const props = withDefaults(
  defineProps<
    OfficePreviewOptions & {
      src: OnlyOfficeUrl | string;
      title?: string;
    }
  >(),
  {
    token: undefined,
    title: undefined,
    id: "only-office-editor",
    region: "zh-CN",
    lang: "zh",
    mode: "microsoft",
    onlyOfficeServerUrl: undefined,
    //microsoftViewBaseUrl: "https://view.officeapps.live.com/op/view.aspx",
    microsoftViewBaseUrl: "https://view.officeapps.live.com/op/embed.aspx",
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "error", errorDescription: string, errorCode?: number): void;
}>();

const microsoftViewUrl = computed(() => {
  if (typeof props.src === "string") {
    return `${props.microsoftViewBaseUrl}?src=${encodeURIComponent(props.src)}`;
  } else {
    return `${props.microsoftViewBaseUrl}?src=${encodeURIComponent(props.src?.url)}`;
  }
});

const onlyOfficeConfig = computed(() => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  documentType: getDocumentType(props.src?.mimeType),
  token: props.token,
  type: "embedded",
  document: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fileType: getFileType(props.src?.mimeType),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    key: props.src?.key ?? nanoid(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    title: props.title ?? generateFilename(props.src?.mimeType),
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
    lang: props.lang,
    region: props.region,
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

const getDocumentType = (mimeType: string) => {
  switch (mimeType) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/msword":
      return "word";
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel":
      return "cell";
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.ms-powerpoint":
      return "slide";
  }
};

const getFileType = (mimeType: string) => {
  switch (mimeType) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "docx";
    case "application/msword":
      return "doc";
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "xlsx";
    case "application/vnd.ms-excel":
      return "xls";
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "pptx";
    case "application/vnd.ms-powerpoint":
      return "ppt";
  }
};

const generateFilename = (mimeType: string) => {
  switch (mimeType) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return `${customAlphabet(filenameAlphabet)()}.docx`;
    case "application/msword":
      return `${customAlphabet(filenameAlphabet)()}.doc`;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return `${customAlphabet(filenameAlphabet)()}.xlsx`;
    case "application/vnd.ms-excel":
      return `${customAlphabet(filenameAlphabet)()}.xls`;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return `${customAlphabet(filenameAlphabet)()}.pptx`;
    case "application/vnd.ms-powerpoint":
      return `${customAlphabet(filenameAlphabet)()}.ppt`;
  }
};

onMounted(() => {
  if (props.mode === "onlyOffice" && !props.onlyOfficeServerUrl) {
    console.warn(
      "[OfficeViewer] 未配置 OnlyOffice 服务器地址 (onlyOfficeServerUrl)。",
    );
    emits("error", "无法加载文档，预览服务不可用");
  }
});
</script>

<template>
  <div style="overflow: hidden">
    <document-editor
      v-if="
        mode === 'onlyOffice' &&
        onlyOfficeServerUrl &&
        src?.url &&
        src?.mimeType
      "
      :id="id"
      :document-server-url="onlyOfficeServerUrl"
      :config="onlyOfficeConfig"
    />
    <iframe
      v-else-if="src"
      :src="microsoftViewUrl"
      width="100%"
      height="100%"
      style="padding: 0; margin: 0; border: none"
      @load="$emit('ready')"
    />
  </div>
</template>
