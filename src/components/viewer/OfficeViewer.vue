<script lang="ts" setup>
import { computed, nextTick, onMounted } from "vue";
import { useScriptTag } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    src: string;
    filename?: string;
    mimeType: string;
    mode?: "officeapps" | "onlyOffice";
    officeappsViewBaseUrl?: string;
    onlyOfficeApiJsUrl?: string;
  }>(),
  {
    filename: undefined,
    mode: "officeapps",
    onlyOfficeApiJsUrl: undefined,
    officeappsViewBaseUrl: "http://view.officeapps.live.com/op/view.aspx",
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "error", error: Error): void;
}>();

onMounted(() => {
  if (props.mode === "onlyOffice") {
    if (!props.onlyOfficeApiJsUrl) {
      //...提示没配置js链接
      return;
    }

    nextTick(() => {
      useScriptTag(props.onlyOfficeApiJsUrl, () => {
        console.log(33331);

        // 配置文档查看器
        const fileNameWithExt = props.filename?.split(/[/\\]/).pop() || "";

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

        window.docEditor = new window.DocsAPI.DocEditor(
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
              url: props.src,
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

        emits("ready");
      });
    });
  }
});

const officeappsUrl = computed(
  () => `${props.officeappsViewBaseUrl}?src=${encodeURIComponent(props.src)}`,
);
</script>

<template>
  <div
    v-if="mode === 'onlyOffice'"
    id="only-office-container"
    class="full-size"
  ></div>
  <iframe
    v-else
    :src="officeappsUrl"
    width="100%"
    height="100%"
    style="border: none"
    @load="$emit('ready')"
  />
</template>
