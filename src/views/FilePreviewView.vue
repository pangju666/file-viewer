<script lang="ts" setup>
import FilePreview from "@/components/FilePreview.vue";
import { ref, watch } from "vue";
import { type AnyWebReadableStream, fileTypeFromStream } from "file-type";
import HanaMinAFont from "@/assets/fonts/HanaMinA.ttf";
import NanumGothicRegularFont from "@/assets/fonts/HanaMinA.ttf";
import NotoSansDisplaySemiCondensedLightItalicFont from "@/assets/fonts/HanaMinA.ttf";
import RobotoLightItalicFont from "@/assets/fonts/HanaMinA.ttf";
import type { FileItem } from "@/types/file.ts";

const props = withDefaults(
  defineProps<{
    id?: string;
    url: string;
    mimeType?: string;
    filename?: string;
  }>(),
  {
    id: undefined,
    mimeType: undefined,
    filename: undefined,
  },
);

const viewerOptions = {
  dxf: {
    fonts: [
      HanaMinAFont,
      NanumGothicRegularFont,
      NotoSansDisplaySemiCondensedLightItalicFont,
      RobotoLightItalicFont,
    ],
  },
  pdf: {
    id: import.meta.env.ONLY_OFFICE_ID,
    token: import.meta.env.ONLY_OFFICE_TOKEN ?? undefined,
    mode: import.meta.env.PDF_VIEWER_MODE,
    language: import.meta.env.PDF_VIEWER_LANGUAGE,
    pdfjsViewBaseUrl: import.meta.env.PDF_VIEWER_PDFJS_VIEW_BASE_URL,
    onlyOfficeServerUrl: import.meta.env.ONLY_OFFICE_SERVER_URL,
  },
  office: {
    id: import.meta.env.ONLY_OFFICE_ID,
    token: import.meta.env.ONLY_OFFICE_TOKEN ?? undefined,
    mode: import.meta.env.OFFICE_VIEWER_MODE,
    language: import.meta.env.OFFICE_VIEWER_LANGUAGE,
    microsoftViewBaseUrl: import.meta.env.OFFICE_VIEWER_MICROSOFT_VIEW_BASE_URL,
    onlyOfficeServerUrl: import.meta.env.ONLY_OFFICE_SERVER_URL,
  },
};

const fileItem = ref<FileItem>();
const loading = ref(false);

watch(
  () => props.mimeType,
  async (newVal) => {
    let mimeType: string;
    if (newVal) {
      mimeType = props.mimeType;
    } else if (props.url) {
      const response = await fetch(props.url);
      const fileType = await fileTypeFromStream(
        response.body as AnyWebReadableStream<Uint8Array>,
      );
      mimeType = fileType?.mime as string;
    }

    fileItem.value = {
      file: props.url,
      mimeType,
      id: props.id,
      name: props.filename,
    };
  },
  { immediate: true },
);
</script>

<template>
  <n-spin
    size="large"
    class="pangju-wh-100"
    content-class="pangju-wh-100"
    content-style="overflow: hidden"
    :show="loading"
  >
    <template #description> 正在加载中... </template>
    <file-preview
      v-if="fileItem"
      :file="fileItem"
      class="pangju-wh-100"
      :viewer-options="viewerOptions"
      @loading-start="loading = true"
      @loading-end="loading = false"
      @loading-error="loading = false"
    />
  </n-spin>
</template>
