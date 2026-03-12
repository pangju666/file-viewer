<script lang="ts" setup>
import { computed, nextTick, onMounted, watch } from "vue";
import { useScriptTag } from "@vueuse/core";
import type { OnlyOfficeUrl } from "@/types/file.ts";
import type { OfficeViewerProps } from "@/types/viewer.ts";
import "@/assets/css/pangju.css";

const props = withDefaults(
  defineProps<
    OfficeViewerProps & {
      src: OnlyOfficeUrl | string;
      onError?: (
        error:
          | {
              errorCode: number;
              errorDescription: string;
            }
          | string,
      ) => void;
    }
  >(),
  {
    language: "zh",
    mode: "microsoft",
    onlyOfficeApiJsUrl: undefined,
    //microsoftViewBaseUrl: "https://view.officeapps.live.com/op/view.aspx",
    microsoftViewBaseUrl: "https://view.officeapps.live.com/op/embed.aspx",
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

const initEditor = (src: OnlyOfficeUrl) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (props?.onError && e?.data) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
      if (typeof props.src === "string" || !props.src.mimeType) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      editor?.destroyEditor();
      initEditor(newVal as OnlyOfficeUrl);
    }
  },
  { deep: true },
);

onMounted(() => {
  if (props.mode === "onlyOffice") {
    if (typeof props.src === "string" || !props.src.mimeType) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window?.DocsAPI?.DocEditor) {
      initEditor(props.src as OnlyOfficeUrl);
      return;
    }

    if (!props.onlyOfficeApiJsUrl) {
      if (props.onError) {
        props.onError('未配置onlyOffice的api.js文件地址"');
      } else {
        throw new Error("未配置onlyOffice的api.js文件地址");
      }
    }

    nextTick(() => {
      useScriptTag(props.onlyOfficeApiJsUrl as string, () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!window?.DocsAPI?.DocEditor) {
          if (props.onError) {
            props.onError("DocsAPI注入失败，请检查api.js文件地址是否正确");
          } else {
            throw new Error("DocsAPI注入失败，请检查api.js文件地址是否正确");
          }
        }
        initEditor(props.src as OnlyOfficeUrl);
      });
    });
  }
});
</script>

<template>
  <div
    v-if="mode === 'onlyOffice'"
    id="only-office-container"
    class="pangju-wh-100"
  ></div>
  <iframe
    v-else
    :src="microsoftViewUrl"
    width="100%"
    height="100%"
    class="pangju-no-border"
    @load="$emit('ready')"
  />
</template>
