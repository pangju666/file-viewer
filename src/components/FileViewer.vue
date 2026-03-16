<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, ref } from "vue";
import FileList from "@/components/FileList.vue";
import type { FileItem } from "@/types/file.ts";
import FilePreview from "@/components/FilePreview.vue";
import type { FileListProps, FilePreviewProps } from "@/types/options.ts";
import { getResult } from "@/utils/utils.ts";
import {
  type AnyWebReadableStream,
  fileTypeFromBlob,
  fileTypeFromStream,
} from "file-type";
import "@/assets/css/file-viewer.css";

const props = withDefaults(
  defineProps<
    FileListProps &
      FilePreviewProps & {
        minSplitSize?: number | string;
        maxSplitSize?: number | string;
        defaultSplitSize?: number | string;
        autoDetectType?: boolean;
        detectFileType?: (file: FileItem) => string | Promise<string>;
        showLoading?: boolean;
        loadingText?: string;
        loadingSize?: "small" | "medium" | "large" | number;
      }
  >(),
  {
    minSplitSize: 0.1,
    maxSplitSize: 0.9,
    defaultSplitSize: 0.8,
    autoDetectType: true,
    detectFileType: undefined,
    showLoading: true,
    loadingText: "正在加载中...",
    loadingSize: "large",
    /* File Preview 属性 */
    enableImage: undefined,
    enableVideo: undefined,
    enableAudio: undefined,
    enablePdf: undefined,
    enableOffice: undefined,
    enableModel: undefined,
    enableMarkdown: undefined,
    enableText: undefined,
    enableJson: undefined,
    enableDxf: undefined,
    jsonContentLoader: undefined,
    textContentLoader: undefined,
    markdownContentLoader: undefined,
    customViewerMatcher: undefined,
    viewerOptions: undefined,
    /* File List 属性 */
    title: undefined,
    showSkeleton: undefined,
    showBackTop: undefined,
    showSearch: undefined,
    showTitle: undefined,
    coverHeight: undefined,
    coverObjectFit: undefined,
    showTypeFilter: undefined,
    fileTypes: undefined,
    cardSize: undefined,
    cardHoverable: undefined,
    cardBordered: undefined,
    tagSize: undefined,
    fileItems: undefined,
    load: undefined,
    fileMatcher: undefined,
    noMore: undefined,
    customDownload: undefined,
  },
);

const emits = defineEmits<{
  (e: "loading-start"): void;
  (e: "loading-end"): void;
  (e: "loading-error"): void;
  (e: "click-file", file: FileItem): void;
}>();

const previewProps = computed(() => {
  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    file,
    minSplitSize,
    maxSplitSize,
    defaultSplitSize,
    autoDetectType,
    detectFileType,
    title,
    fileItems,
    showSkeleton,
    showBackTop,
    showSearch,
    showTitle,
    showTypeFilter,
    coverHeight,
    coverObjectFit,
    cardSize,
    cardHoverable,
    cardBordered,
    tagSize,
    fileTypes,
    fileMatcher,
    load,
    noMore,
    customDownload,
    ...options
  } = props;
  return options;
});

const listProps = computed(() => {
  const {
    minSplitSize,
    maxSplitSize,
    defaultSplitSize,
    autoDetectType,
    detectFileType,
    enableImage,
    enableVideo,
    enableAudio,
    enablePdf,
    enableOffice,
    enableModel,
    enableMarkdown,
    enableText,
    enableJson,
    enableDxf,
    customViewerMatcher,
    jsonContentLoader,
    textContentLoader,
    markdownContentLoader,
    viewerOptions,
    ...options
  } = props;
  return options;
});

const loading = ref(false);
const currentFile = ref<FileItem>();

const changeFile = async (file: FileItem) => {
  currentFile.value = undefined;
  if (file && file?.file && !file?.mimeType && props.autoDetectType) {
    if (props.detectFileType) {
      file.mimeType = await getResult(props.detectFileType(file));
    } else {
      if (file?.file instanceof Blob) {
        const fileType = await fileTypeFromBlob(file?.file);
        file.mimeType = fileType?.mime as string;
      } else {
        const response = await fetch(file.file);
        const fileType = await fileTypeFromStream(
          response.body as AnyWebReadableStream<Uint8Array>,
        );
        file.mimeType = fileType?.mime as string;
      }
    }
  }
  currentFile.value = file;

  emits("click-file", file);
};

defineExpose({
  changeFile,
});
</script>

<template>
  <div>
    <n-split
      direction="horizontal"
      class="pangju-h-100"
      :default-size="defaultSplitSize"
      :max="maxSplitSize"
      :min="minSplitSize"
    >
      <template #1>
        <n-spin
          v-if="showLoading"
          :size="loadingSize"
          class="pangju-wh-100"
          content-class="pangju-wh-100"
          :show="loading"
        >
          <template #description>
            {{ loadingText }}
          </template>
          <file-preview
            v-if="currentFile"
            v-bind="previewProps"
            :file="currentFile"
            class="pangju-wh-100"
            @loading-start="loading = true"
            @loading-end="loading = false"
            @loading-error="loading = false"
          />
        </n-spin>
        <slot v-else name="viewer" :current-file="currentFile">
          <file-preview
            v-if="currentFile"
            v-bind="previewProps"
            :file="currentFile"
            class="pangju-wh-100"
            @loading-start="$emit('loading-start')"
            @loading-end="$emit('loading-end')"
            @loading-error="$emit('loading-error')"
          />
        </slot>
      </template>
      <template #2>
        <slot name="file-list">
          <file-list v-bind="listProps" @click-file="changeFile" />
        </slot>
      </template>
    </n-split>
  </div>
</template>
