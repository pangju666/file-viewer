<template>
  <n-config-provider
    :date-locale="dateZhCN"
    :locale="zhCN"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
    class="full-size"
  >
    <n-notification-provider>
      <n-loading-bar-provider>
        <file-viewer :on-load="onLoad" />
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { dateZhCN, zhCN } from "naive-ui";
import "@/assets/css/pangju.less";
import FileViewer from "@/components/FileViewer.vue";
import { type FileItem, testFiles } from "@/utils/mock";
import { ref } from "vue";

const noMore = ref(false);

const onLoad = (): Promise<FileItem[]> => {
  return new Promise((resolve) => {
    if (noMore.value) {
      resolve([]);
      return;
    }
    setTimeout(() => {
      resolve(testFiles);
      noMore.value = true;
    }, 1000);
  });
};
</script>
