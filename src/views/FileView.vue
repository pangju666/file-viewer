<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
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
import { useLoadingBar, useMessage } from "naive-ui";
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

const message = useMessage();

const props = defineProps<{
  filename?: string;
  mimeType: string;
  fileUrl: string;
  password?: string;
}>();

const hasError = ref(false);
const errorReason = ref<string | undefined>(undefined);

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

onMounted(() => {
  if (!props.url) {
    message.error("未找到文件链接");
  } else if (!props.mimeType) {
    message.error("未找到文件类型");
  }

  loadingBar.start();
});
</script>

<template>
  <div class="full-size">
    <error-viewer
      v-if="hasError"
      :reason="errorReason"
      :filename="filename"
      :url="fileUrl"
      :type="mimeType"
    />
    <div v-else class="full-size">
      <audio-viewer
        v-if="supportedAudioMimeTypes.includes(mimeType as string)"
        :src="fileUrl"
        :title="filename"
        :on-error="handleAudioViewerError"
        @ready="handleViewerReady"
      />
      <image-viewer
        v-else-if="supportedImageMimeTypes.includes(mimeType as string)"
        :src="{
          url: fileUrl,
          filename: filename,
        }"
        :on-error="handleViewerError"
        @ready="handleViewerReady"
      />
      <video-viewer
        v-else-if="supportedVideoMimeTypes.includes(mimeType as string)"
        :src="{
          url: fileUrl,
          mimeType: mimeType,
        }"
        :on-error="handleVideoViewerError"
        @ready="handleViewerReady"
      />
      <model-viewer
        v-else-if="supportedModelTypes.includes(mimeType as string)"
        :src="fileUrl"
        :mime-type="mimeType"
        :on-error="handleViewerError"
        @ready="handleViewerReady"
      />
      <office-viewer
        v-else-if="supportedOfficeMimeTypes.includes(mimeType as string)"
        :src="{
          url: fileUrl,
          mimeType: mimeType as string,
          title: filename,
        }"
        :mime-type="mimeType"
        mode="onlyOffice"
        only-office-api-js-url="http://localhost:10000/web-apps/apps/api/documents/api.js"
        :on-error="handleOfficeViewerError"
        @ready="handleViewerReady"
      />
      <markdown-viewer
        v-else-if="isTargetMimeType(markdownMimType, mimeType)"
        :src="{
          url: fileUrl,
          fileEncoding: getMimeTypeCharset(mimeType as string),
        }"
        :on-error="handleViewerError"
        @ready="handleViewerReady"
      />
      <dxf-viewer
        v-else-if="isTargetMimeType(dxfMimeType, mimeType)"
        :src="fileUrl"
        :file-encoding="getMimeTypeCharset(mimeType as string)"
        :on-error="handleViewerError"
        @ready="handleViewerReady"
      />
      <pdf-viewer
        v-else-if="pdfMimeType === mimeType"
        :src="{ url: fileUrl, password }"
        @ready="handleViewerReady"
      />
      <json-viewer
        v-else-if="isTargetMimeType(jsonMimeType, mimeType)"
        :src="fileUrl"
        :file-encoding="getMimeTypeCharset(mimeType as string)"
        :on-error="handleViewerError"
        @ready="handleViewerReady"
      />
      <text-viewer
        v-else-if="mimeType?.startsWith(textMimeTypePrefix)"
        :src="fileUrl"
        :file-encoding="getMimeTypeCharset(mimeType as string)"
        :on-error="handleViewerError"
        @ready="handleViewerReady"
      />
      <unknown-viewer
        v-else
        :filename="filename"
        :url="fileUrl"
        :type="mimeType"
      />
    </div>
  </div>
</template>
