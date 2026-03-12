<script lang="ts" setup>
import { ref, watch, computed, onMounted, onBeforeMount, reactive } from "vue";
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
import type { FilePreviewProps, ViewerError } from "@/types/viewer.ts";
import "@/assets/css/pangju.css";

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
    jsonFetcher: undefined,
    textFetcher: undefined,
    markdownFetcher: undefined,
    customViewerMatcher: undefined,
    options: undefined,
  },
);

const emits = defineEmits<{
  (e: "loading-start"): void;
  (e: "loading-end"): void;
  (e: "loading-error"): void;
}>();

const hasError = ref(false);
const errorReason = ref<string | undefined>(undefined);
const error = ref<ViewerError>();

watch(
  () => props.file,
  () => {
    hasError.value = false;
    errorReason.value = undefined;
    error.value = undefined;
    emits("loading-start");
  },
);

const viewerCheckedFlag = ref(false);
const viewerAvailable = reactive({
  image: false,
  video: false,
  model: false,
  pdf: false,
  markdown: false,
  json: false,
  dxf: false,
});

const filename = computed(() => props.file.name ?? props.file.filename);

const fileEncoding = computed(() => {
  return getMimeTypeCharset(props.file.mimeType, utf8Charset);
});

const checkViewerAvailability = async (packageName: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await import(/* @vite-ignore */ packageName);
    return true;
  } catch {
    console.warn(
      `[FilePreview] Missing dependency: ${packageName}. Feature disabled.`,
    );
    return false;
  }
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

const handleViewerReady = () => {
  emits("loading-end");
};

const handleViewerError = (e: ViewerError) => {
  errorReason.value = typeof e === "string" ? e : undefined;
  error.value = e;
  hasError.value = true;
  emits("loading-error");
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

onBeforeMount(async () => {
  const tasks = [];
  if (props.enableImage) {
    tasks.push(
      checkViewerAvailability("viewerjs").then(
        (res) => (viewerAvailable.image = res),
      ),
    );
  }
  if (props.enableVideo) {
    tasks.push(
      checkViewerAvailability("video.js").then(
        (res) => (viewerAvailable.video = res),
      ),
    );
  }
  if (props.enableModel) {
    tasks.push(
      checkViewerAvailability("@babylonjs/viewer").then(
        (res) => (viewerAvailable.model = res),
      ),
    );
  }
  if (props.enablePdf) {
    tasks.push(
      checkViewerAvailability("vue3-pdf-app").then(
        (res) => (viewerAvailable.pdf = res),
      ),
    );
  }
  if (props.enableMarkdown) {
    tasks.push(
      checkViewerAvailability("mavon-editor").then(
        (res) => (viewerAvailable.markdown = res),
      ),
    );
  }
  if (props.enableJson) {
    tasks.push(
      checkViewerAvailability("vue-json-viewer").then(
        (res) => (viewerAvailable.json = res),
      ),
    );
  }
  if (props.enableDxf) {
    tasks.push(
      checkViewerAvailability("dxf-viewer").then(
        (res) => (viewerAvailable.dxf = res),
      ),
    );
  }
  await Promise.all(tasks);

  viewerCheckedFlag.value = true;
});

onMounted(() => {
  if (props.file?.url && props.file?.mimeType) {
    return;
  }
  hasError.value = true;
  errorReason.value = "未定义文件链接或类型";
});
</script>

<template>
  <div v-if="viewerCheckedFlag" class="pangju-wh-100">
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
          v-bind="options?.audio"
          :src="file.url"
          :title="filename"
          :cover="file?.cover"
          :on-error="handleAudioViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="
          supportedImageMimeTypes.includes(file.mimeType) &&
          enableImage &&
          viewerAvailable.image
        "
        name="image-viewer"
      >
        <image-viewer
          :options="options?.image"
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
          supportedVideoMimeTypes.includes(file.mimeType) &&
          enableVideo &&
          viewerAvailable.video
        "
        name="video-viewer"
      >
        <video-viewer
          :options="options?.video"
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
        v-else-if="
          supportedModelTypes.includes(file.mimeType) &&
          enableModel &&
          viewerAvailable.model
        "
        name="model-viewer"
      >
        <model-viewer
          :options="options?.model"
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
          v-bind="options?.office"
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
          isTargetMimeType(markdownMimType, file.mimeType) &&
          enableMarkdown &&
          viewerAvailable.markdown
        "
        name="markdown-viewer"
      >
        <markdown-viewer
          :options="options?.markdown"
          :src="{
            url: file.url,
            fileEncoding: fileEncoding,
          }"
          :fetcher="markdownFetcher"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="
          isTargetMimeType(dxfMimeType, file.mimeType) &&
          enableDxf &&
          viewerAvailable.dxf
        "
        name="dxf-viewer"
      >
        <dxf-viewer
          v-bind="options?.dxf"
          :src="file.url"
          :file-encoding="fileEncoding"
          :on-error="handleViewerError"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="
          pdfMimeType === file.mimeType && enablePdf && viewerAvailable.pdf
        "
        name="pdf-viewer"
      >
        <pdf-viewer
          v-bind="options?.pdf"
          :src="{
            url: file.url,
            filename: filename,
          }"
          @ready="handleViewerReady"
        />
      </slot>
      <slot
        v-else-if="
          isTargetMimeType(jsonMimeType, file.mimeType) &&
          enableJson &&
          viewerAvailable.json
        "
        name="json-viewer"
      >
        <json-viewer
          :options="options?.json"
          :src="{
            url: file.url,
            fileEncoding: fileEncoding,
          }"
          :fetcher="jsonFetcher"
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
          :fetcher="textFetcher"
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
