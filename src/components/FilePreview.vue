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
  undefinedFileErrorMessage,
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
    customViewerMatcher: undefined,
    viewerProps: undefined,
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

    if (newVal?.source && newVal?.mimeType) {
      hasError.value = false;
      errorReason.value = undefined;
      viewerError.value = undefined;
    } else {
      hasError.value = true;
      errorReason.value = undefinedFileErrorMessage;

      emits("loading-error");
      return;
    }

    if (oldVal?.source instanceof Blob && fileUrl.value) {
      try {
        URL.revokeObjectURL(fileUrl.value);
      } catch (e) {
        console.warn("释放 Object URL 失败:", e);
      }
    }

    if (typeof newVal?.source === "string") {
      isBlob.value = false;
      fileUrl.value = newVal.source;
    } else if (newVal.source instanceof Blob) {
      isBlob.value = true;
      fileUrl.value = URL.createObjectURL(newVal.source);
    }

    emits("loading-start");
  },
);

const isBlob = ref(false);
const fileUrl = ref<string>();

const fileMimeType = computed(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  () => props.file?.mimeType ?? props.file?.source?.type ?? undefined,
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
  () => props.file?.name ?? props.file?.source?.name ?? undefined,
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
  key: props.file?.id ?? nanoid(),
}));

const audioViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, cover, title, ...options } = props.viewerProps?.audio ?? {};
  return options;
});

const dxfViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, ...options } = props.viewerProps?.dxf ?? {};
  return options;
});

const imageViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, title, ...options } = props.viewerProps?.image ?? {};
  return options;
});

const jsonViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, ...options } = props.viewerProps?.json ?? {};
  return options;
});

const textViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, ...options } = props.viewerProps?.text ?? {};
  return options;
});

const markdownViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, ...options } = props.viewerProps?.markdown ?? {};
  return options;
});

const modelViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, ...options } = props.viewerProps?.model ?? {};
  return options;
});

const officeViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, title, ...options } = props.viewerProps?.office ?? {};
  return options;
});

const pdfViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, ...options } = props.viewerProps?.pdf ?? {};
  return options;
});

const videoViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { src, poster, ...options } = props.viewerProps?.audio ?? {};
  return options;
});

const hasError = ref(false);
const errorReason = ref<string | undefined>(undefined);
const viewerError = ref<unknown>();

const handleViewerReady = () => {
  emits("loading-end");
};

const setError = (reason?: string, error?: unknown) => {
  errorReason.value = reason;
  viewerError.value = error;
  hasError.value = true;

  emits("loading-error");
};

const handleViewerError = (e?: unknown) => {
  errorReason.value = undefined;
  viewerError.value = e;
  hasError.value = true;

  emits("loading-error");
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
      return props.customViewerMatcher.includes(fileMimeType.value);
    }
  }
  return false;
};

onMounted(() => {
  if (props.file?.source && props.file?.mimeType) {
  } else {
    hasError.value = true;
    errorReason.value = undefinedFileErrorMessage;

    emits("loading-error");
    return;
  }

  if (typeof props.file?.source === "string") {
    isBlob.value = false;
    fileUrl.value = props.file.source;
  } else if (props.file instanceof Blob) {
    isBlob.value = true;
    fileUrl.value = URL.createObjectURL(props.file.source);
  }
  emits("loading-start");
});

defineExpose({
  setError,
});
</script>

<template>
  <div>
    <slot
      v-if="hasError"
      name="error"
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
    <div v-else class="pangju-wh-100">
      <slot
        v-if="matchCustomViewer(file)"
        name="custom"
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
        name="audio"
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
        name="image"
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
        name="video"
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
        name="model"
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
        name="office"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <unknown-viewer
          v-if="isBlob"
          class="pangju-wh-100"
          :filename="filename"
          :src="fileUrl"
          :mime-type="fileMimeType"
          @ready="handleViewerReady"
        />
        <office-viewer
          v-else
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
        name="markdown"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <markdown-viewer
          v-bind="markdownViewerProps"
          :src="fileUrlWithFileEncoding"
          class="pangju-wh-100"
          @ready="handleViewerReady"
          @error="handleViewerError"
        />
      </slot>
      <slot
        v-else-if="isTargetMimeType(dxfMimeType, fileMimeType) && enableDxf"
        name="dxf"
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
        name="pdf"
        :tile="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <unknown-viewer
          v-if="isBlob"
          class="pangju-wh-100"
          :filename="filename"
          :src="fileUrl"
          :mime-type="fileMimeType"
          @ready="handleViewerReady"
        />
        <pdf-viewer
          v-else
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
        name="json"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <json-viewer
          v-bind="jsonViewerProps"
          class="pangju-wh-100"
          :src="fileUrlWithFileEncoding"
          @ready="handleViewerReady"
          @error="handleViewerError"
        />
      </slot>
      <slot
        v-else-if="isTextMimeType(fileMimeType) && enableText"
        name="text"
        :filename="filename"
        :file-url="fileUrl"
        :mime-type="fileMimeType"
        :file-encoding="fileEncoding"
      >
        <text-viewer
          v-bind="textViewerProps"
          class="pangju-wh-100"
          :src="fileUrlWithFileEncoding"
          @ready="handleViewerReady"
          @error="handleViewerError"
        />
      </slot>
      <slot
        v-else
        name="unknown"
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
    </div>
  </div>
</template>
