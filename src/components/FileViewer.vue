<script lang="ts" setup>
import { ref } from "vue";
import DxfViewer from "@/components/viewer/DxfViewer.vue";
import FileCardList from "@/components/FileCardList.vue";
import {
  supportedImageMimeTypes,
  supportedModelTypes,
  dxfMimeType,
  supportedVideoMimeTypes,
  markdownMimType,
  supportedOfficeMimeTypes,
  pdfMimeType,
  textMimeTypePrefix,
  supportedAudioMimeTypes,
  jsonMimeType,
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
import TextViewer from "@/components/viewer/TextViewer.vue";
import ErrorViewer from "@/components/viewer/ErrorViewer.vue";
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

const hasError = ref(false);
const errorReason = ref<string | undefined>(undefined);

const handleClickFile = (file: FileItem) => {
  hasError.value = false;
  errorReason.value = undefined;

  currentFile.value = file;
  loadingBar.start();
};

const handleViewerReady = () => {
  loadingBar.finish();
};

const handleViewerError = () => {
  loadingBar.error();
  hasError.value = true;
  //errorReason.value = undefined;
};

const handleAudioViewerError = (error: MediaError) => {
  handleViewerError();

  switch (error?.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      // 音频加载被用户主动中断
      break;
    case MediaError.MEDIA_ERR_NETWORK:
      // 网络错误：音频下载过程中断
      errorReason.value = "音频加载失败，请检查网络后重试";
      break;
    case MediaError.MEDIA_ERR_DECODE:
      // 解码错误：音频文件损坏或格式不兼容
      errorReason.value = "音频文件损坏或格式不支持";
      break;
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      // 源不支持：无效的音频地址或格式
      errorReason.value = "无效的音频链接或格式不支持";
      break;
    default:
      break;
  }
};

const handleVideoViewerError = (error: MediaError) => {
  handleViewerError();

  switch (error?.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      // 视频加载被用户主动中断
      break;
    case MediaError.MEDIA_ERR_NETWORK:
      // 网络错误：视频下载过程中断
      errorReason.value = "视频加载失败，请检查网络后重试";
      break;
    case MediaError.MEDIA_ERR_DECODE:
      // 解码错误：视频文件损坏或格式不兼容
      errorReason.value = "视频文件损坏或格式不支持";
      break;
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      // 源不支持：无效的视频地址或格式
      errorReason.value = "无效的视频链接或格式不支持";
      break;
    default:
      break;
  }
};

const handleOfficeViewerError = (/*{ errorCode, errorDescription }*/) => {
  handleViewerError();
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
        <div v-if="currentFile" class="full-size">
          <slot v-if="hasError" name="error-viewer">
            <error-viewer
              :reason="errorReason"
              :filename="currentFile.name ?? currentFile.filename"
              :url="currentFile.url"
              :type="currentFile.mimeType"
            />
          </slot>
          <slot v-else name="viewer" :current-file="currentFile">
            <slot
              v-if="
                supportedAudioMimeTypes.includes(
                  currentFile?.mimeType as string,
                )
              "
              name="audio-viewer"
              :current-file="currentFile"
            >
              <audio-viewer
                :src="currentFile.url"
                :title="currentFile?.name ?? currentFile?.filename"
                :cover="currentFile?.cover"
                :on-error="handleAudioViewerError"
                @ready="handleViewerReady"
              />
            </slot>
            <slot
              v-else-if="
                supportedImageMimeTypes.includes(
                  currentFile?.mimeType as string,
                )
              "
              name="image-viewer"
              :current-file="currentFile"
            >
              <image-viewer
                :src="{
                  url: currentFile.url,
                  filename: currentFile?.name ?? currentFile?.filename,
                }"
                :on-error="handleViewerError"
                @ready="handleViewerReady"
              />
            </slot>
            <slot
              v-else-if="
                supportedVideoMimeTypes.includes(
                  currentFile?.mimeType as string,
                )
              "
              name="video-viewer"
              :current-file="currentFile"
            >
              <video-viewer
                :src="{
                  url: currentFile.url,
                  mimeType: currentFile?.mimeType,
                }"
                :poster="currentFile.cover"
                :on-error="handleVideoViewerError"
                @ready="handleViewerReady"
              />
            </slot>
            <slot
              v-else-if="
                supportedModelTypes.includes(currentFile?.mimeType as string)
              "
              name="model-viewer"
              :current-file="currentFile"
            >
              <model-viewer
                :src="currentFile.url"
                :mime-type="currentFile?.mimeType"
                :on-error="handleViewerError"
                @ready="handleViewerReady"
              />
            </slot>
            <slot
              v-else-if="
                supportedOfficeMimeTypes.includes(
                  currentFile?.mimeType as string,
                )
              "
              name="office-viewer"
              :current-file="currentFile"
            >
              <office-viewer
                :src="{
                  url: currentFile.url,
                  mimeType: currentFile?.mimeType as string,
                  title: currentFile?.name ?? currentFile?.filename,
                }"
                :mime-type="currentFile?.mimeType"
                mode="onlyOffice"
                only-office-api-js-url="http://localhost:10000/web-apps/apps/api/documents/api.js"
                :on-error="handleOfficeViewerError"
                @ready="handleViewerReady"
              />
            </slot>
            <slot
              v-else-if="
                isTargetMimeType(markdownMimType, currentFile?.mimeType)
              "
              name="markdown-viewer"
              :current-file="currentFile"
            >
              <markdown-viewer
                :src="{
                  url: currentFile.url,
                  fileEncoding: getMimeTypeCharset(
                    currentFile?.mimeType as string,
                  ),
                }"
                :on-error="handleViewerError"
                @ready="handleViewerReady"
              />
            </slot>
            <slot
              v-else-if="isTargetMimeType(dxfMimeType, currentFile?.mimeType)"
              name="dxf-viewer"
              :current-file="currentFile"
            >
              <dxf-viewer
                :src="currentFile.url"
                :file-encoding="
                  getMimeTypeCharset(currentFile?.mimeType as string)
                "
                :on-error="handleViewerError"
                @ready="handleViewerReady"
              />
            </slot>
            <slot
              v-else-if="pdfMimeType === currentFile?.mimeType"
              name="pdf-viewer"
              :current-file="currentFile"
            >
              <pdf-viewer :src="currentFile.url" @ready="handleViewerReady" />
            </slot>
            <slot
              v-else-if="isTargetMimeType(jsonMimeType, currentFile?.mimeType)"
              name="json-viewer"
              :current-file="currentFile"
            >
              <json-viewer
                :src="currentFile.url"
                :file-encoding="
                  getMimeTypeCharset(currentFile?.mimeType as string)
                "
                :on-error="handleViewerError"
                @ready="handleViewerReady"
              />
            </slot>
            <slot
              v-else-if="currentFile?.mimeType?.startsWith(textMimeTypePrefix)"
              name="text-viewer"
              :current-file="currentFile"
            >
              <text-viewer
                :src="currentFile.url"
                :file-encoding="
                  getMimeTypeCharset(currentFile?.mimeType as string)
                "
                :on-error="handleViewerError"
                @ready="handleViewerReady"
              />
            </slot>
            <slot v-else name="unknown-viewer" :current-file="currentFile">
              <unknown-viewer
                :filename="currentFile.name ?? currentFile.filename"
                :url="currentFile.url"
                :type="currentFile.mimeType"
              />
            </slot>
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
