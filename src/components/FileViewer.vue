<script lang="ts" setup>
import { ref } from "vue";
import FileItemList from "@/components/FileItemList.vue";
import type { FileItem } from "@/types/file.ts";
import FilePreview from "@/components/FilePreview.vue";

withDefaults(
  defineProps<{
    fileTypes?: string[];
    customViewerMatcher?: string[] | ((file: FileItem) => boolean);
    staticFileList?: FileItem[];
    load: (
      page: number,
      types?: string[],
      keyword?: string,
    ) => Promise<FileItem[]> | FileItem[];
    noMore: boolean;
  }>(),
  {
    staticFileList: () => [],
    fileTypes: () => [],
    customViewerMatcher: undefined,
  },
);

const currentFile = ref<FileItem>();

const handleClickFile = (file: FileItem) => {
  currentFile.value = file;
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
        <slot name="file-preview" :current-file="currentFile">
          <file-preview v-if="currentFile" :file="currentFile" />
        </slot>
      </template>
      <template #2>
        <slot name="file-list">
          <file-item-list
            :file-types="fileTypes"
            :static-file-list="staticFileList"
            :no-more="noMore"
            :load="load"
            @click-file="handleClickFile"
          />
        </slot>
      </template>
    </n-split>
  </div>
</template>
