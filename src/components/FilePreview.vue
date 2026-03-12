<script lang="ts" setup>
import { defineComponent, h, ref } from "vue";
import { useLoadingBar } from "naive-ui";
import type { FileItem } from "@/types/file.ts";
import type { FilePreviewProps } from "@/types/viewer.ts";
import "@/assets/css/pangju.css";
import FilePreviewBase from "@/components/FilePreviewBase.vue";

const props = withDefaults(
  defineProps<
    FilePreviewProps & {
      file: FileItem;
    }
  >(),
  {
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
  },
);

const loadingBarTargetRef = ref<undefined | HTMLElement>(undefined);

const LoadingBarTrigger = defineComponent(() => {
  const loadingBar = useLoadingBar();
  return () => {
    return h(FilePreviewBase, {
      ...props,
      onLoadingStart: () => loadingBar.start(),
      onLoadingEnd: () => loadingBar.finish(),
      onLoadingError: () => loadingBar.error(),
    });
  };
});
</script>

<template>
  <n-loading-bar-provider
    :to="loadingBarTargetRef"
    container-style="position: absolute;"
  >
    <div ref="loadingBarTargetRef" class="loading-bar-target" />
    <LoadingBarTrigger />
  </n-loading-bar-provider>
</template>

<style lang="less" scoped>
.loading-bar-target {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: var(--n-border-radius);
  pointer-events: none;
}
</style>
