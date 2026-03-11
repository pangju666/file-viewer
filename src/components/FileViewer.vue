<script lang="ts" setup>
import { ref, computed } from "vue";
import FileItemList from "@/components/FileItemList.vue";
import type { FileItem } from "@/types/file.ts";
import FilePreview from "@/components/FilePreview.vue";
import type { FileItemListProps, FilePreviewProps } from "@/types/viewer.ts";
import { getResult } from "@/utils/utils.ts";
import { type AnyWebReadableStream, fileTypeFromStream } from "file-type";

const props = withDefaults(
  defineProps<
    FileItemListProps &
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

const fileItemListProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { options, ...fileItemListProps } = props;
  return fileItemListProps;
});

const filePreviewProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { staticFileList, fileTypes, ...filePreviewProps } = props;
  return filePreviewProps;
});

const handleClickFile = async (file: FileItem) => {
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
</script>

<template>
  <div class="full-size">
    <n-split
      direction="horizontal"
      class="h-100"
      :default-size="defaultSplitSize"
      :max="maxSplitSize"
      :min="minSplitSize"
    >
      <template #1>
        <slot name="file-preview" :current-file="currentFile">
          <file-preview
            v-if="currentFile"
            v-bind="filePreviewProps"
            :file="currentFile"
          />
        </slot>
      </template>
      <template #2>
        <slot name="file-item-list">
          <file-item-list
            v-bind="fileItemListProps"
            @click-file="handleClickFile"
          />
        </slot>
      </template>
    </n-split>
  </div>
</template>
