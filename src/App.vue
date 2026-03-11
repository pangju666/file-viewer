<template>
  <n-config-provider
    :date-locale="dateZhCN"
    :locale="zhCN"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
    class="full-size"
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <file-viewer :no-more="noMore" :file-types="fileTypes" :load="onLoad" />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { dateZhCN, zhCN } from "naive-ui";
import "@/assets/css/pangju.less";
import { testFiles } from "@/utils/mock";
import { onMounted, ref } from "vue";
import type { FileItem } from "@/types/file.ts";
import FileViewer from "@/components/FileViewer.vue";

const noMore = ref(false);
const fileTypes = ref<string[]>([]);

onMounted(() => {
  fileTypes.value = Array.from(
    new Set(testFiles.map((item) => item.type)).values(),
  );
});

const onLoad = (
  page: number,
  types?: string[],
  keyword?: string,
): Promise<FileItem[]> => {
  return new Promise((resolve) => {
    /*if (noMore.value) {
      resolve([]);
      return;
    }*/
    setTimeout(() => {
      let result = testFiles.filter(
        (item: FileItem) => types?.length === 0 || types?.includes(item.type),
      );
      if (keyword) {
        result = result.filter((item: FileItem) =>
          item.name?.includes(keyword),
        );
      }
      resolve(result);
      noMore.value = (types ?? []).length > 0;
      /* if (page === 10) {
        noMore.value = true;
      }*/
    }, 100);
  });
};
</script>
