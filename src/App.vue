<template>
  <n-config-provider
    :date-locale="dateZhCN"
    :locale="zhCN"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
    class="full-size"
  >
    <n-notification-provider>
      <n-loading-bar-provider>
        <file-viewer
          :no-more="noMore"
          :file-types="fileTypes"
          :on-load="onLoad"
        />
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { dateZhCN, zhCN } from "naive-ui";
import "@/assets/css/pangju.less";
import FileViewer from "@/components/FileViewer.vue";
import { supportFileTypes, testFiles } from "@/utils/mock";
import { onMounted, ref } from "vue";
import { formatFileType } from "@/utils/utils.ts";
import type { FileItem } from "@/types/file.ts";

const noMore = ref(false);
const fileTypes = ref<string[]>([]);

onMounted(() => {
  setTimeout(() => {
    fileTypes.value = supportFileTypes;
  }, 3000);
});

const onLoad = (
  page: number,
  types?: string[],
  keyword?: string,
): Promise<FileItem[]> => {
  return new Promise((resolve) => {
    if (noMore.value) {
      resolve([]);
      return;
    }
    setTimeout(() => {
      let result = testFiles.filter(
        (item: FileItem) =>
          types?.length === 0 ||
          types?.includes(formatFileType(item?.mimeType as string)),
      );
      if (keyword) {
        result = result.filter((item: FileItem) =>
          item.name?.includes(keyword),
        );
      }
      result.forEach(
        (item) => (item.type = formatFileType(item?.mimeType as string)),
      );
      resolve(result);
      if (page === 10) {
        noMore.value = true;
      }
    }, 3000);
  });
};
</script>
