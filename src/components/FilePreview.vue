<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
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
  utf8Charset,
} from "@/utils/constants.ts";
import type { FileItem } from "@/types/file.ts";
import { getMimeTypeCharset, isTargetMimeType } from "@/utils/utils.ts";
import DxfViewer from "@/components/viewer/DxfViewer.vue";
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
import type { FilePreviewProps, ViewerError } from "@/types/options.ts";
import "@/assets/css/file-viewer.css";

const props = withDefaults(
  defineProps<
    FilePreviewProps & {
      file: FileItem;
    }
  >(),
  {
    enableImage: true,
    enableVideo: true,
    enableAudio: true,
    enablePdf: true,
    enableOffice: true,
    enableModel: true,
    enableMarkdown: true,
    enableText: true,
    enableJson: true,
    enableDxf: true,
    jsonContentLoader: undefined,
    textContentLoader: undefined,
    markdownContentLoader: undefined,
    customViewerMatcher: undefined,
    viewerOptions: undefined,
  },
);

const emits = defineEmits<{
  (e: "loading-start"): void;
  (e: "loading-end"): void;
  (e: "loading-error"): void;
}>();

const audioViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, cover, title, onError, ...options } =
    props.viewerOptions?.audio ?? {};
  return options;
});

const dxfViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, onProgress, onError, ...options } =
    props.viewerOptions?.dxf ?? {};
  return options;
});

const imageViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, onError, ...options } = props.viewerOptions?.audio ?? {};
  return options;
});

const jsonViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, contentLoader, onError, ...options } =
    props.viewerOptions?.audio ?? {};
  return options;
});

const markdownViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, contentLoader, onError, ...options } =
    props.viewerOptions?.audio ?? {};
  return options;
});

const modelViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, onProgress, onError, ...options } =
    props.viewerOptions?.audio ?? {};
  return options;
});

const officeViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, onError, ...options } = props.viewerOptions?.audio ?? {};
  return options;
});

const pdfViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, ...options } = props.viewerOptions?.audio ?? {};
  return options;
});

const videoViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, cover, onProgress, onError, ...options } =
    props.viewerOptions?.audio ?? {};
  return options;
});

const hasError = ref(false);
const errorReason = ref<string | undefined>(undefined);
const error = ref<ViewerError>();

watch(
  () => props.file,
  () => {
    emits("loading-start");

    hasError.value = false;
    errorReason.value = undefined;
    error.value = undefined;
  },
);

const filename = computed(() => props.file.name ?? props.file.filename);

const fileEncoding = computed(() => {
  return getMimeTypeCharset(props.file.mimeType, utf8Charset);
});

const matchCustomViewer = (file: FileItem) => {
  if (props.customViewerMatcher) {
    if (typeof props.customViewerMatcher == "function") {
      return props.customViewerMatcher(file);
    } else if (
      Array.isArray(props.customViewerMatcher) &&
      props.customViewerMatcher.length > 0
    ) {
      return props.customViewerMatcher.includes(file.mimeType);
    }
  }
  return false;
};

const handleViewerReady = () => {
  emits("loading-end");
};

const handleViewerError = (e: ViewerError) => {
  emits("loading-error");

  errorReason.value = typeof e === "string" ? e : undefined;
  error.value = e;
  hasError.value = true;
};

const handleAudioViewerError = (error: MediaError) => {
  handleViewerError(error);

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
  handleViewerError(error);

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

onMounted(() => {
  if (props.file?.url && props.file?.mimeType) {
    emits("loading-start");
    return;
  }
  hasError.value = true;
  errorReason.value = "未定义文件链接或类型";
});
</script>

<template>
  <div class="pangju-wh-100">
    <slot v-if="hasError" name="error-viewer" :error="error">
      <error-viewer
        :reason="errorReason"
        :filename="filename"
        :url="file.url"
        :mime-type="file.mimeType"
      />
    </slot>
    <slot v-else>
      <slot v-if="matchCustomViewer(file)" name="custom-viewer"> </slot>
      <slot
        v-else-if="
          supportedAudioMimeTypes.includes(file.mimeType) && enableAudio
        "
        name="audio-viewer"
      >
        <audio-viewer
          v-bind="audioViewerProps"
          :src="file.url"
          :title="filename"
          :cover="file?.cover"
          :on-error="handleAudioViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="
          supportedImageMimeTypes.includes(file.mimeType) && enableImage
        "
        name="image-viewer"
      >
        <image-viewer
          v-bind="imageViewerProps"
          :src="{
            url: file.url,
            filename: filename,
          }"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="
          supportedVideoMimeTypes.includes(file.mimeType) && enableVideo
        "
        name="video-viewer"
      >
        <video-viewer
          v-bind="videoViewerProps"
          :src="{
            url: file.url,
            mimeType: file.mimeType,
          }"
          :poster="file.cover"
          :on-error="handleVideoViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="supportedModelTypes.includes(file.mimeType) && enableModel"
        name="model-viewer"
      >
        <model-viewer
          v-bind="modelViewerProps"
          :src="file.url"
          :mime-type="file.mimeType"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="
          supportedOfficeMimeTypes.includes(file.mimeType) && enableOffice
        "
        name="office-viewer"
      >
        <office-viewer
          v-bind="officeViewerProps"
          :src="{
            url: file.url,
            mimeType: file.mimeType,
            title: filename,
            key: file.id,
          }"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="
          isTargetMimeType(markdownMimType, file.mimeType) && enableMarkdown
        "
        name="markdown-viewer"
      >
        <markdown-viewer
          v-bind="markdownViewerProps"
          :src="{
            url: file.url,
            fileEncoding: fileEncoding,
          }"
          :content-loader="markdownContentLoader"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="isTargetMimeType(dxfMimeType, file.mimeType) && enableDxf"
        name="dxf-viewer"
      >
        <dxf-viewer
          v-bind="dxfViewerProps"
          :src="file.url"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="pdfMimeType === file.mimeType && enablePdf"
        name="pdf-viewer"
      >
        <pdf-viewer
          v-bind="pdfViewerProps"
          :src="file.url"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="isTargetMimeType(jsonMimeType, file.mimeType) && enableJson"
        name="json-viewer"
      >
        <json-viewer
          v-bind="jsonViewerProps"
          :src="{
            url: file.url,
            fileEncoding: fileEncoding,
          }"
          :content-loader="jsonContentLoader"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="file.mimeType.startsWith(textMimeTypePrefix) && enableText"
        name="text-viewer"
      >
        <text-viewer
          :src="{
            url: file.url,
            fileEncoding: fileEncoding,
          }"
          :content-loader="textContentLoader"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot v-else name="unknown-viewer">
        <unknown-viewer
          :filename="filename"
          :url="file.url"
          :type="file.mimeType"
        />
      </slot>
    </slot>
  </div>
</template>
