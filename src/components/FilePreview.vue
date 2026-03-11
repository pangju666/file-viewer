<script lang="ts" setup>
import { ref, watch } from "vue";
import DxfViewer from "@/components/viewer/DxfViewer.vue";
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

const props = withDefaults(
  defineProps<{
    file: FileItem;
    customViewerMatcher?: string[] | ((file: FileItem) => boolean);
  }>(),
  {
    customViewerMatcher: undefined,
  },
);

const hasError = ref(false);
const errorReason = ref<string | undefined>(undefined);

watch(
  () => props.file,
  () => {
    hasError.value = false;
    errorReason.value = undefined;
    loadingBar.start();
  },
);

const matchCustomViewer = (file: FileItem) => {
  if (props.customViewerMatcher) {
    if (typeof props.customViewerMatcher == "function") {
      return props.customViewerMatcher(file);
    } else if (
      Array.isArray(props.customViewerMatcher) &&
      props.customViewerMatcher.length > 0
    ) {
      return props.customViewerMatcher.includes(file?.mimeType);
    }
  }
  return false;
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
  <div class="full-size">
    <slot v-if="hasError" name="error-viewer">
      <error-viewer
        :reason="errorReason"
        :filename="file.name ?? file.filename"
        :url="file.url"
        :type="file.mimeType"
      />
    </slot>
    <slot v-else name="viewer">
      <slot v-if="matchCustomViewer(file)" name="custom-viewer"> </slot>
      <slot
        v-else-if="supportedAudioMimeTypes.includes(file?.mimeType as string)"
        name="audio-viewer"
      >
        <audio-viewer
          :src="file.url"
          :title="file?.name ?? file?.filename"
          :cover="file?.cover"
          :on-error="handleAudioViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="supportedImageMimeTypes.includes(file?.mimeType as string)"
        name="image-viewer"
      >
        <image-viewer
          :src="{
            url: file.url,
            filename: file?.name ?? file?.filename,
          }"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="supportedVideoMimeTypes.includes(file?.mimeType as string)"
        name="video-viewer"
      >
        <video-viewer
          :src="{
            url: file.url,
            mimeType: file?.mimeType,
          }"
          :poster="file.cover"
          :on-error="handleVideoViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="supportedModelTypes.includes(file?.mimeType as string)"
        name="model-viewer"
      >
        <model-viewer
          :src="file.url"
          :mime-type="file?.mimeType"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="supportedOfficeMimeTypes.includes(file?.mimeType as string)"
        name="office-viewer"
      >
        <office-viewer
          :src="{
            url: file.url,
            mimeType: file?.mimeType as string,
            title: file?.name ?? file?.filename,
          }"
          :mime-type="file?.mimeType"
          mode="onlyOffice"
          only-office-api-js-url="http://localhost:10000/web-apps/apps/api/documents/api.js"
          :on-error="handleOfficeViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="isTargetMimeType(markdownMimType, file?.mimeType)"
        name="markdown-viewer"
      >
        <markdown-viewer
          :src="{
            url: file.url,
            fileEncoding: getMimeTypeCharset(file?.mimeType as string),
          }"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="isTargetMimeType(dxfMimeType, file?.mimeType)"
        name="dxf-viewer"
      >
        <dxf-viewer
          :src="file.url"
          :file-encoding="getMimeTypeCharset(file?.mimeType as string)"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot v-else-if="pdfMimeType === file?.mimeType" name="pdf-viewer">
        <pdf-viewer
          :src="{ url: file.url, password: file.password }"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="isTargetMimeType(jsonMimeType, file?.mimeType)"
        name="json-viewer"
      >
        <json-viewer
          :src="file.url"
          :file-encoding="getMimeTypeCharset(file?.mimeType as string)"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="file?.mimeType?.startsWith(textMimeTypePrefix)"
        name="text-viewer"
      >
        <text-viewer
          :src="file.url"
          :file-encoding="getMimeTypeCharset(file?.mimeType as string)"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot v-else name="unknown-viewer">
        <unknown-viewer
          :filename="file?.name ?? file?.filename"
          :url="file?.url"
          :type="file?.mimeType"
        />
      </slot>
    </slot>
  </div>
</template>
