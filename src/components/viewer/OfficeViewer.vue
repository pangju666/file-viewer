<script lang="ts" setup>
import { computed, nextTick, onMounted, watch } from "vue";
import { useScriptTag } from "@vueuse/core";
import type { OfficeUrl } from "@/types/file.ts";

const props = withDefaults(
  defineProps<{
    src: OfficeUrl | string;
    mode?: "microsoft" | "onlyOffice";
    language?: string;
    microsoftViewBaseUrl?: string;
    onlyOfficeApiJsUrl?: string;
    onError?: (error: unknown) => void;
  }>(),
  {
    language: "zh",
    mode: "microsoft",
    onlyOfficeApiJsUrl: undefined,
    microsoftViewBaseUrl: "http://view.officeapps.live.com/op/view.aspx",
    onError: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

let editor: unknown | null = null;

const microsoftViewUrl = computed(() => {
  if (typeof props.src === "string") {
    return `${props.microsoftViewBaseUrl}?src=${encodeURIComponent(props.src)}`;
  } else {
    return `${props.microsoftViewBaseUrl}?src=${encodeURIComponent(props.src?.url)}`;
  }
});

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

const initEditor = (src: OfficeUrl) => {
  editor = new window.DocsAPI.DocEditor("only-office-container", {
    documentType: getDocumentType(src.mimeType),
    type: "desktop",
    height: "100%",
    width: "100%",
    document: {
      fileType: getFileType(src.mimeType),
      key: src?.key ?? "only-office-editor",
      title: src?.title,
      url: src.url,
      permissions: {
        copy: true,
        download: true,
        print: true,
      },
    },
    editorConfig: {
      customization: {
        anonymous: {
          request: false,
        },
        chat: false,
        comments: false,
      },
      lang: props.language ?? "zh",
      mode: "view",
    },
    events: {
      onDocumentReady: () => emits("ready"),
      onError: (e: Event) => {
        if (props?.onError && e?.data) {
          props.onError(e.data);
        }
      },
    },
  });
};

watch(
  () => props.src,
  (newVal) => {
    if (props.mode === "onlyOffice") {
      editor?.destroyEditor();
      initEditor(newVal);
    }
  },
  { deep: true },
);

onMounted(() => {
  if (props.mode === "onlyOffice") {
    if (!props.onlyOfficeApiJsUrl) {
      throw new Error("未配置onlyOffice的api.js文件地址");
    }

    nextTick(() => {
      useScriptTag(props.onlyOfficeApiJsUrl as string, () => {
        if (!window?.DocsAPI?.DocEditor) {
          throw new Error("DocsAPI注入失败，请检查api.js文件地址是否正确");
        }
        initEditor(props.src);
      });
    });
  }
});
</script>

<template>
  <div
    v-if="mode === 'onlyOffice'"
    id="only-office-container"
    class="full-size"
  ></div>
  <iframe
    v-else
    :src="microsoftViewUrl"
    width="100%"
    height="100%"
    style="border: none"
    @load="$emit('ready')"
  />
</template>
