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
  supportedAudioMimeTypes,
  jsonMimeType,
  utf8Charset,
  mimeTypeWithCharsetRegex,
} from "@/utils/constants.ts";
import type { FileItem } from "@/types/file.ts";
import { isTargetMimeType, isTextMimeType } from "@/utils/utils.ts";
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
import type { FilePreviewProps } from "@/types/options.ts";
import { nanoid } from "nanoid";
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

watch(
  () => props.file,
  (newVal, oldVal) => {
    fileUrl.value = undefined;

    if (newVal?.file && newVal?.mimeType) {
      hasError.value = false;
      errorReason.value = undefined;
      viewerError.value = undefined;
      emits("loading-start");
    } else {
      hasError.value = true;
      errorReason.value = "未定义文件链接或类型";
      return;
    }

    if (oldVal?.file instanceof Blob && fileUrl.value) {
      try {
        URL.revokeObjectURL(fileUrl.value);
      } catch (e) {
        console.warn("Failed to revoke object URL:", e);
      }
    }

    if (typeof newVal?.file === "string") {
      fileUrl.value = newVal.file;
    } else if (newVal instanceof Blob) {
      fileUrl.value = URL.createObjectURL(newVal);
    }
  },
);

const fileUrl = ref<string>();

const fileMimeType = computed(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  () => props.file?.mimeType ?? props.file?.file?.type ?? undefined,
);

const fileEncoding = computed(() => {
  if (!props.file?.mimeType) {
    return utf8Charset;
  }
  const match = props.file.mimeType.match(mimeTypeWithCharsetRegex);
  return match ? (match[1] ?? utf8Charset) : utf8Charset;
});

const filename = computed(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  () => props.file?.name ?? props.file?.file?.name ?? undefined,
);

const fileUrlWithMimeType = computed(() => ({
  url: fileUrl.value,
  mimeType: fileMimeType.value,
}));

const fileUrlWithFileEncoding = computed(() => ({
  url: fileUrl.value,
  fileEncoding: fileEncoding.value,
}));

const onlyOfficeUrl = computed(() => ({
  url: fileUrl.value,
  mimeType: fileMimeType.value,
  title: filename.value,
  key: props.file?.id ?? nanoid(),
}));

const audioViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, cover, title, ...options } = props.viewerOptions?.audio ?? {};
  return options;
});

const dxfViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, ...options } = props.viewerOptions?.dxf ?? {};
  return options;
});

const imageViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, title, ...options } = props.viewerOptions?.image ?? {};
  return options;
});

const jsonViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, contentLoader, ...options } = props.viewerOptions?.json ?? {};
  return options;
});

const markdownViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, contentLoader, ...options } =
    props.viewerOptions?.markdown ?? {};
  return options;
});

const modelViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, ...options } = props.viewerOptions?.model ?? {};
  return options;
});

const officeViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, title, ...options } = props.viewerOptions?.office ?? {};
  return options;
});

const pdfViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, ...options } = props.viewerOptions?.pdf ?? {};
  return options;
});

const videoViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, poster, ...options } = props.viewerOptions?.audio ?? {};
  return options;
});

const hasError = ref(false);
const errorReason = ref<string | undefined>(undefined);
const viewerError = ref<unknown>();

const handleViewerReady = () => {
  emits("loading-end");
};

const reportError = (reason?: string, error?: unknown) => {
  emits("loading-error");

  errorReason.value = reason;
  viewerError.value = error;
  hasError.value = true;
};

const handleViewerError = (e?: unknown) => {
  emits("loading-error");

  errorReason.value = undefined;
  viewerError.value = e;
  hasError.value = true;
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

const handleOfficeViewerError = (errorDescription: string) => {
  handleViewerError();
  errorReason.value = errorDescription;
};

const handlePdfViewerError = (errorDescription: string) => {
  handleViewerError();
  errorReason.value = errorDescription;
};

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

onMounted(() => {
  if (props.file?.file && props.file?.mimeType) {
    emits("loading-start");
  } else {
    hasError.value = true;
    errorReason.value = "未定义文件链接或类型";
    return;
  }

  if (typeof props.file?.file === "string") {
    fileUrl.value = props.file.file;
  } else if (props.file instanceof Blob) {
    fileUrl.value = URL.createObjectURL(props.file);
  }
});

defineExpose({
  reportError,
});
</script>

<template>
  <div>
    <slot
      v-if="hasError || !fileUrl || !fileMimeType"
      name="error-viewer"
      :reason="errorReason"
      :filename="filename"
      :file-url="fileUrl"
      :mime-type="fileMimeType"
      :file-encoding="fileEncoding"
      :error="viewerError"
    >
      <error-viewer
        class="pangju-wh-100"
        :reason="errorReason"
        :filename="filename"
        :src="fileUrl"
        :mime-type="fileMimeType"
      />
    </slot>
    <slot
      v-else
      :filename="filename"
      :file-url="fileUrl"
      :mime-type="fileMimeType"
      :file-encoding="fileEncoding"
    >
      <slot
        v-if="matchCustomViewer(file)"
        name="custom-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
      </slot>
      <slot
        v-else-if="
          supportedAudioMimeTypes.includes(fileMimeType) && enableAudio
        "
        name="audio-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <audio-viewer
          v-bind="audioViewerProps"
          class="pangju-wh-100"
          :src="fileUrl"
          :title="filename"
          :cover="file?.cover"
          @ready="handleViewerReady"
          @error="handleAudioViewerError"
        />
      </slot>
      <slot
        v-else-if="
          supportedImageMimeTypes.includes(fileMimeType) && enableImage
        "
        name="image-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <image-viewer
          v-bind="imageViewerProps"
          class="pangju-wh-100"
          :src="fileUrl"
          :title="filename"
          @ready="handleViewerReady"
          @error="handleViewerError"
        />
      </slot>
      <slot
        v-else-if="
          supportedVideoMimeTypes.includes(fileMimeType) && enableVideo
        "
        name="video-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <video-viewer
          v-bind="videoViewerProps"
          :src="fileUrlWithMimeType"
          :poster="file.cover"
          class="pangju-wh-100"
          @ready="handleViewerReady"
          @error="handleVideoViewerError"
        />
      </slot>
      <slot
        v-else-if="supportedModelTypes.includes(fileMimeType) && enableModel"
        name="model-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <model-viewer
          v-bind="modelViewerProps"
          :src="fileUrlWithMimeType"
          class="pangju-wh-100"
          @ready="handleViewerReady"
          @error="handleViewerError"
        />
      </slot>
      <slot
        v-else-if="
          supportedOfficeMimeTypes.includes(fileMimeType) && enableOffice
        "
        name="office-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <office-viewer
          v-bind="officeViewerProps"
          :src="onlyOfficeUrl"
          :title="filename"
          class="pangju-wh-100"
          @ready="handleViewerReady"
          @error="handleOfficeViewerError"
        />
      </slot>
      <slot
        v-else-if="
          isTargetMimeType(markdownMimType, fileMimeType) && enableMarkdown
        "
        name="markdown-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <markdown-viewer
          v-bind="markdownViewerProps"
          :src="fileUrlWithFileEncoding"
          class="pangju-wh-100"
          :content-loader="markdownContentLoader"
          @ready="handleViewerReady"
          @error="handleViewerError"
        />
      </slot>
      <slot
        v-else-if="isTargetMimeType(dxfMimeType, fileMimeType) && enableDxf"
        name="dxf-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <dxf-viewer
          v-bind="dxfViewerProps"
          :src="fileUrl"
          class="pangju-wh-100"
          @ready="handleViewerReady"
          @error="handleViewerError"
        />
      </slot>
      <slot
        v-else-if="pdfMimeType === fileMimeType && enablePdf"
        name="pdf-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <pdf-viewer
          v-bind="pdfViewerProps"
          :src="onlyOfficeUrl"
          :title="filename"
          class="pangju-wh-100"
          @ready="handleViewerReady"
          @error="handlePdfViewerError"
        />
      </slot>
      <slot
        v-else-if="isTargetMimeType(jsonMimeType, fileMimeType) && enableJson"
        name="json-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <json-viewer
          v-bind="jsonViewerProps"
          class="pangju-wh-100"
          :src="fileUrlWithFileEncoding"
          :content-loader="jsonContentLoader"
          @ready="handleViewerReady"
          @error="handleViewerError"
        />
      </slot>
      <slot
        v-else-if="isTextMimeType(fileMimeType) && enableText"
        name="text-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <text-viewer
          class="pangju-wh-100"
          :src="fileUrlWithFileEncoding"
          :content-loader="textContentLoader"
          @ready="handleViewerReady"
          @error="handleViewerError"
        />
      </slot>
      <slot
        v-else
        name="unknown-viewer"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <unknown-viewer
          class="pangju-wh-100"
          :filename="filename"
          :src="fileUrl"
          :mime-type="fileMimeType"
          @ready="handleViewerReady"
        />
      </slot>
    </slot>
  </div>
</template>

<style lang="less" scoped>
.loading-container {
  position: relative;
  z-index: 9999;
}
</style>
