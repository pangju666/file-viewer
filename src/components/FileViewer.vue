<script lang="ts" setup>
import { watch, ref, shallowRef } from "vue";
import DxfViewer from "@/components/viewer/DxfViewer.vue";
import FileCardList from "@/components/FileCardList.vue";
import {
  supportedImageMimeTypes,
  supportedModelTypes,
  dxfMimeType,
  supportedVideoMimeTypes,
  jsonMimeTypePrefix,
  markdownMimType,
  supportedOfficeMimeTypes,
  pdfMimeType,
  textMimeTypePrefix,
  supportedAudioMimeTypes,
} from "@/utils/constants.ts";
import { useLoadingBar } from "naive-ui";
import type { FileItem } from "@/types/file.ts";
import { getMimeTypeCharset, isTargetMimeType } from "@/utils/utils.ts";
import JsonViewer from "@/components/viewer/JsonViewer.vue";
import ImageViewer from "@/components/viewer/ImageViewer.vue";
import VideoViewer from "@/components/viewer/VideoViewer.vue";
import AudioViewer from "@/components/viewer/AudioViewer.vue";
import ModelViewer from "@/components/viewer/ModelViewer.vue";
import UnknownViewer from "@/components/viewer/UnknownViewer.vue";
import PdfViewer from "@/components/viewer/PdfViewer.vue";
import MarkdownViewer from "@/components/viewer/MarkdownViewer.vue";
import PlainTextViewer from "@/components/viewer/PlainTextViewer.vue";
import OfficeViewer from "@/components/viewer/OfficeViewer.vue";

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
const currentFileViewer = shallowRef({
  component: UnknownViewer,
  props: {},
});

const getFileViewer = (file: FileItem) => {
  if (file.url) {
    if (isTargetMimeType(markdownMimType, file?.mimeType)) {
      return {
        component: MarkdownViewer,
        props: {
          src: {
            url: file.url,
            fileEncoding: getMimeTypeCharset(file?.mimeType as string),
          },
          onReady: handleFileReady,
        },
      };
    } else if (isTargetMimeType(dxfMimeType, file?.mimeType)) {
      return {
        component: DxfViewer,
        props: {
          src: file.url,
          fileEncoding: getMimeTypeCharset(file?.mimeType as string),
          onReady: handleFileReady,
        },
      };
    } else if (pdfMimeType === file?.mimeType) {
      return {
        component: PdfViewer,
        props: {
          src: file.url,
          onReady: handleFileReady,
        },
      };
    } else if (file?.mimeType?.startsWith(textMimeTypePrefix)) {
      return {
        component: PlainTextViewer,
        props: {
          src: file.url,
          fileEncoding: getMimeTypeCharset(file.mimeType),
          onReady: handleFileReady,
        },
      };
    } else if (file?.mimeType?.startsWith(jsonMimeTypePrefix)) {
      return {
        component: JsonViewer,
        props: {
          src: file.url,
          fileEncoding: getMimeTypeCharset(file.mimeType),
          onReady: handleFileReady,
        },
      };
    } else if (supportedImageMimeTypes.includes(file?.mimeType as string)) {
      return {
        component: ImageViewer,
        props: {
          src: { url: file.url, filename: file?.name ?? file?.filename },
          onReady: handleFileReady,
        },
      };
    } else if (supportedVideoMimeTypes.includes(file?.mimeType as string)) {
      return {
        component: VideoViewer,
        props: {
          src: {
            url: file.url,
            mimeType: file?.mimeType,
          },
          poster: file?.cover,
          onReady: handleFileReady,
        },
      };
    } else if (supportedAudioMimeTypes.includes(file?.mimeType as string)) {
      return {
        component: AudioViewer,
        props: {
          src: file.url,
          title: file?.name ?? file?.filename,
          cover: file?.cover,
          onReady: handleFileReady,
        },
      };
    } else if (supportedModelTypes.includes(file?.mimeType as string)) {
      return {
        component: ModelViewer,
        props: {
          src: file.url,
          mimeType: file?.mimeType,
          onReady: handleFileReady,
        },
      };
    } else if (supportedOfficeMimeTypes.includes(file?.mimeType as string)) {
      return {
        component: OfficeViewer,
        props: {
          src: {
            url: file.url,
            mimeType: file?.mimeType,
            title: file?.name ?? file?.filename,
          },
          mode: "onlyOffice",
          onlyOfficeApiJsUrl:
            "http://localhost:10000/web-apps/apps/api/documents/api.js",
          onReady: handleFileReady,
        },
      };
    }
  }

  return {
    component: UnknownViewer,
    props: {
      src: file?.url,
      filename: file?.filename,
    },
  };
};

const handleClickFile = (file: FileItem) => {
  currentFile.value = file;
  loadingBar.start();
};

const handleFileReady = () => {
  loadingBar.finish();
};

watch(
  () => currentFile.value,
  (newVal) => {
    currentFileViewer.value = getFileViewer(newVal);
  },
);
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
            <component
              :is="currentFileViewer.component"
              v-bind="currentFileViewer.props"
            />
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
