<script lang="ts" setup>
import { computed, h, ref } from "vue";
import MarkdownViewer from "@/components/viewer/MarkdownViewer.vue";
import DxfViewer from "@/components/viewer/DxfViewer.vue";
import FileCardList from "@/components/FileCardList.vue";
import {
  audioMimeTypes,
  babylonSupportedTypes,
  dxfMimeType,
  imageMimeTypes,
  jsonMimeTypePrefix,
  markdownMimType,
  modelViewerSupportedTypes,
  officeMimeTypes,
  pdfMimeType,
  textMimeTypePrefix,
  videoMimeTypes,
} from "@/utils/constants.ts";
import { useLoadingBar } from "naive-ui";
import type { FileItem } from "@/types/file.ts";
import PlainTextViewer from "@/components/viewer/PlainTextViewer.vue";
import JsonViewer from "@/components/viewer/JsonViewer.vue";
import ImageViewer from "@/components/viewer/ImageViewer.vue";
import VideoViewer from "@/components/viewer/VideoViewer.vue";
import AudioViewer from "@/components/viewer/AudioViewer.vue";
import BabylonModelViewer from "@/components/viewer/BabylonModelViewer.vue";
import OfficeViewer from "@/components/viewer/OfficeViewer.vue";
import UnknownViewer from "@/components/viewer/UnknownViewer.vue";
import PdfViewer from "@/components/viewer/PdfViewer.vue";
import { getMimeTypeCharset } from "@/utils/utils.ts";

const loadingBar = useLoadingBar();

withDefaults(
  defineProps<{
    fileTypes?: string[];
    onLoad: (
      page: number,
      types?: string[],
      keyword?: string,
    ) => Promise<FileItem[]> | FileItem[];
    noMore: boolean;
  }>(),
  {
    fileTypes: () => [],
  },
);

const currentFile = ref<FileItem>();

const currentFileViewer = computed(() => {
  if (!currentFile.value?.mimeType) {
    return h(UnknownViewer, { onReady: handleFileReady });
  } else if (currentFile.value.mimeType.startsWith(markdownMimType)) {
    return h(MarkdownViewer, {
      src: currentFile.value.url,
      fileEncoding: getMimeTypeCharset(currentFile.value.mimeType),
      onReady: handleFileReady,
    });
  } else if (currentFile.value.mimeType === dxfMimeType) {
    return h(DxfViewer, {
      src: currentFile.value.url,
      fileEncoding: getMimeTypeCharset(currentFile.value.mimeType),
      onReady: handleFileReady,
    });
  } else if (currentFile.value.mimeType === pdfMimeType) {
    return h(PdfViewer, {
      src: currentFile.value.url,
      onReady: handleFileReady,
    });
  } else if (currentFile.value.mimeType.startsWith(textMimeTypePrefix)) {
    return h(PlainTextViewer, {
      src: currentFile.value.url,
      fileEncoding: getMimeTypeCharset(currentFile.value.mimeType),
      onReady: handleFileReady,
    });
  } else if (currentFile.value.mimeType.startsWith(jsonMimeTypePrefix)) {
    return h(JsonViewer, {
      src: currentFile.value.url,
      fileEncoding: getMimeTypeCharset(currentFile.value.mimeType),
      onReady: handleFileReady,
    });
  } else if (imageMimeTypes.includes(currentFile.value.mimeType)) {
    return h(ImageViewer, {
      src: currentFile.value.url,
      filename: currentFile.value?.name,
      onReady: handleFileReady,
    });
  } else if (videoMimeTypes.includes(currentFile.value.mimeType)) {
    return h(VideoViewer, {
      src: currentFile.value.url,
      mimeType: currentFile.value.mimeType,
      onReady: handleFileReady,
    });
  } else if (audioMimeTypes.includes(currentFile.value.mimeType)) {
    return h(AudioViewer, {
      src: currentFile.value.url,
      title: currentFile.value?.name,
      cover: currentFile.value?.cover,
      onReady: handleFileReady,
    });
  } else if (modelViewerSupportedTypes.includes(currentFile.value.mimeType)) {
    return h("model-viewer", {
      src: currentFile.value.url,
      class: "full-size",
      cameraControls: true,
      touchAction: "pan-y",
      onLoad: handleFileReady,
    });
  } else if (babylonSupportedTypes.includes(currentFile.value.mimeType)) {
    return h(BabylonModelViewer, {
      src: currentFile.value.url,
      mimeType: currentFile.value.mimeType,
      onReady: handleFileReady,
    });
  } else if (officeMimeTypes.includes(currentFile.value.mimeType)) {
    return h(OfficeViewer, {
      src: currentFile.value.url,
      filename: currentFile.value?.name,
      mimeType: currentFile.value.mimeType,
      onReady: handleFileReady,
    });
  } else {
    return h(UnknownViewer, { onReady: handleFileReady });
  }
});

const handleClickFile = (file: FileItem) => {
  currentFile.value = file;
  loadingBar.start();
};

const handleFileReady = () => {
  loadingBar.finish();
};
</script>

<template>
  <div class="full-size display-flex">
    <n-split
      direction="horizontal"
      style="z-index: 100"
      class="h-100"
      :default-size="0.8"
      :max="0.9"
      :min="0.1"
    >
      <template #1>
        <div class="full-size">
          <slot name="viewer" :current-file="currentFile">
            <component :is="currentFileViewer" />
          </slot>
        </div>
      </template>
      <template #2>
        <slot name="fileList">
          <file-card-list
            :file-types="fileTypes"
            :no-more="noMore"
            :on-load="onLoad"
            @click-file="handleClickFile"
          />
        </slot>
      </template>
    </n-split>
  </div>
</template>
