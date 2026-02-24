<script lang="ts" setup>
import { onMounted } from "vue";

const props = defineProps<{
  url: string;
  filename: string;
  mimeType: string;
}>();

const emits = defineEmits<{
  (e: "finished"): void;
}>();

onMounted(async () => {
  if (!(window as any).DocsAPI) {
    location.href = `${
      import.meta.env.VITE_OFFICE_VIEW_URL
    }?src=${encodeURIComponent(props.url)}`;
  } else {
    // 配置文档查看器
    const fileNameWithExt = props.filename.split(/[/\\]/).pop() || "";

    let baseName;
    let extension;
    const lastDotIndex = fileNameWithExt.lastIndexOf(".");
    if (lastDotIndex === -1) {
      // 无扩展名
      baseName = fileNameWithExt;
      extension = "";
    } else if (lastDotIndex === 0) {
      // 以 . 开头
      baseName = fileNameWithExt;
      extension = "";
    } else if (lastDotIndex === fileNameWithExt.length - 1) {
      // 以 . 结尾
      extension = "";
    } else {
      baseName = fileNameWithExt.slice(0, lastDotIndex);
      extension = fileNameWithExt.slice(lastDotIndex).toLowerCase();
    }

    let documentType: string | null = null;
    switch (props.mimeType) {
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/msword":
        documentType = "word";
        break;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      case "application/vnd.ms-excel":
        documentType = "cell";
        break;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      case "application/vnd.ms-powerpoint":
        documentType = "slide";
        break;
    }

    (window as any).docEditor = new (window as any).DocsAPI.DocEditor(
      "only-office-container",
      {
        documentType: documentType,
        type: "desktop",
        height: "100%",
        width: "100%",
        document: {
          fileType: extension,
          key: "test",
          title: baseName,
          url: props.url,
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
          lang: "zh",
          mode: "view",
        },
      },
    );
  }
  emits("finished");
});
</script>

<template>
  <div id="only-office-container"></div>
</template>
