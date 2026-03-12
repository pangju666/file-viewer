<script lang="ts" setup>
import { ref } from "vue";
import FileList from "@/components/FileList.vue";
import type { FileItem } from "@/types/file.ts";
import FilePreview from "@/components/FilePreview.vue";
import type { FileListProps, FilePreviewProps } from "@/types/viewer.ts";
import { getResult } from "@/utils/utils.ts";
import { type AnyWebReadableStream, fileTypeFromStream } from "file-type";
import "@/assets/css/pangju.css";

const props = withDefaults(
  defineProps<
    FileListProps &
      FilePreviewProps & {
        minSplitSize?: number | string;
        maxSplitSize?: number | string;
        defaultSplitSize?: number | string;
        autoDetectType?: boolean;
        detectFileType?: (file: FileItem) => string | Promise<string>;
      }
  >(),
  {
    minSplitSize: 0.1,
    maxSplitSize: 0.9,
    defaultSplitSize: 0.8,
    autoDetectType: true,
    detectFileType: undefined,
    title: undefined,
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
    showSkeleton: undefined,
    showBackTop: undefined,
    showSearch: undefined,
    showTitle: undefined,
    coverHeight: undefined,
    coverObjectFit: undefined,
    showTypeFilter: undefined,
    fileTypes: undefined,
    staticFileList: undefined,
  },
);

const currentFile = ref<FileItem>();

const changeFile = async (file: FileItem) => {
  currentFile.value = undefined;

  if (file && file.url && !file.mimeType && props.autoDetectType) {
    if (props.detectFileType) {
      file.mimeType = await getResult(props.detectFileType(file));
    } else {
      const response = await fetch(file.url);
      const fileType = await fileTypeFromStream(
        response.body as AnyWebReadableStream<Uint8Array>,
      );
      file.mimeType = fileType?.mime as string;
    }
  }

  currentFile.value = file;
};

defineExpose({
  changeFile,
});
</script>

<template>
  <div class="pangju-wh-100">
    <n-split
      direction="horizontal"
      class="pangju-h-100"
      :default-size="defaultSplitSize"
      :max="maxSplitSize"
      :min="minSplitSize"
    >
      <template #1>
        <slot name="preview" :current-file="currentFile">
          <file-preview
            v-if="currentFile"
            :enable-image="enableImage"
            :enable-video="enableVideo"
            :enable-audio="enableAudio"
            :enable-pdf="enablePdf"
            :enable-office="enableOffice"
            :enable-model="enableModel"
            :enable-markdown="enableMarkdown"
            :enable-text="enableText"
            :enable-json="enableJson"
            :enable-dxf="enableDxf"
            :custom-viewer-matcher="customViewerMatcher"
            :json-fetcher="jsonFetcher"
            :text-fetcher="textFetcher"
            :markdown-fetcher="markdownFetcher"
            :options="options"
            :file="currentFile"
          />
        </slot>
      </template>
      <template #2>
        <slot name="list">
          <file-list
            :title="title"
            :static-file-list="staticFileList"
            :show-skeleton="showSkeleton"
            :show-back-top="showBackTop"
            :show-search="showSearch"
            :show-title="showTitle"
            :show-type-filter="showTypeFilter"
            :cover-height="coverHeight"
            :cover-object-fit="coverObjectFit"
            :file-types="fileTypes"
            :file-matcher="fileMatcher"
            :load="load"
            :no-more="noMore"
            @click-file="changeFile"
          />
        </slot>
      </template>
    </n-split>
  </div>
</template>
