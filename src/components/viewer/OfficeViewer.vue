<script lang="ts" setup>
import { computed, onMounted, watch } from "vue";
import type { OnlyOfficeUrl } from "@/types/file.ts";
import "@/assets/css/file-viewer.css";
import type { OfficePreviewOptions } from "@/types/options.ts";
import { DocumentEditor } from "@onlyoffice/document-editor-vue";

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
    language: "zh",
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

watch(
  () => props.src,
  (newVal) => {
    if (props.mode === "onlyOffice" && typeof newVal === "string") {
      emits("error", "未定义文件链接或类型");
    }
  },
);

const microsoftViewUrl = computed(() => {
  if (typeof props.src === "string") {
    return `${props.microsoftViewBaseUrl}?src=${encodeURIComponent(props.src)}`;
  } else {
    return `${props.microsoftViewBaseUrl}?src=${encodeURIComponent(props.src?.url)}`;
  }
});

const onlyOfficeConfig = computed(() => ({
  documentType: getDocumentType(props.src?.mimeType),
  token: props.token,
  type: "embedded",
  document: {
    fileType: getFileType(props.src?.mimeType),
    key: props.src?.key,
    title: props.title ?? "",
    url: props.src?.url,
    permissions: {
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
    lang: props.language ?? "zh",
    mode: "view",
  },
  events: {
    onDocumentReady: () => emits("ready"),
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

onMounted(() => {
  if (props.mode === "onlyOffice" && !props.onlyOfficeServerUrl) {
    emits("error", "未配置OnlyOffice服务器地址");
  }
});
</script>

<template>
  <document-editor
    v-if="mode === 'onlyOffice' && onlyOfficeServerUrl"
    :id="id"
    :document-server-url="onlyOfficeServerUrl"
    :config="onlyOfficeConfig"
  />
  <iframe
    v-else
    :src="microsoftViewUrl"
    width="100%"
    height="100%"
    style="padding: 0; margin: 0; border: none"
    @load="$emit('ready')"
  />
</template>
