<script lang="ts" setup>
import FilePreview from "@/components/FilePreview.vue";
import { onMounted, ref, watch } from "vue";
import { type AnyWebReadableStream, fileTypeFromStream } from "file-type";
import HanaMinAFont from "@/assets/fonts/HanaMinA.ttf";
import NanumGothicRegularFont from "@/assets/fonts/HanaMinA.ttf";
import NotoSansDisplaySemiCondensedLightItalicFont from "@/assets/fonts/HanaMinA.ttf";
import RobotoLightItalicFont from "@/assets/fonts/HanaMinA.ttf";
import type { FileItem } from "@/types/file.ts";

const props = withDefaults(
  defineProps<{
    id?: string;
    url?: string;
    mimeType?: string;
    filename?: string;
  }>(),
  {
    url: undefined,
    id: undefined,
    mimeType: undefined,
    filename: undefined,
  },
);

watch(
  props,
  async (val) => {
    if (!val.url) {
      return;
    }

    let mimeType: string;
    if (val.mimeType) {
      mimeType = val.mimeType;
    } else {
      const response = await fetch(val.url);
      const fileType = await fileTypeFromStream(
        response.body as AnyWebReadableStream<Uint8Array>,
      );
      mimeType = fileType?.mime as string;
    }

    fileItem.value = {
      source: val.url,
      mimeType,
      id: val.id,
      name: val.filename,
    };
  },
  { deep: true },
);

const viewerOptions = ref({
  dxf: {
    fonts: [
      HanaMinAFont,
      NanumGothicRegularFont,
      NotoSansDisplaySemiCondensedLightItalicFont,
      RobotoLightItalicFont,
    ],
  },
  pdf: {
    id: import.meta.env.VITE_ONLY_OFFICE_ID,
    token: import.meta.env.VITE_ONLY_OFFICE_TOKEN ?? undefined,
    mode: import.meta.env.VITE_PDF_VIEWER_MODE,
    language: import.meta.env.VITE_PDF_VIEWER_LANGUAGE,
    region: import.meta.env.VITE_PDF_VIEWER_REGION,
    pdfjsViewBaseUrl: import.meta.env.VITE_PDF_VIEWER_PDFJS_VIEW_BASE_URL,
    onlyOfficeServerUrl:
      import.meta.env.VITE_ONLY_OFFICE_SERVER_URL ?? undefined,
  },
  office: {
    id: import.meta.env.VITE_ONLY_OFFICE_ID,
    token: import.meta.env.VITE_ONLY_OFFICE_TOKEN ?? undefined,
    mode: import.meta.env.VITE_OFFICE_VIEWER_MODE,
    language: import.meta.env.VITE_OFFICE_VIEWER_LANGUAGE,
    region: import.meta.env.VITE_OFFICE_VIEWER_REGION,
    microsoftViewBaseUrl: import.meta.env
      .VITE_OFFICE_VIEWER_MICROSOFT_VIEW_BASE_URL,
    onlyOfficeServerUrl:
      import.meta.env.VITE_ONLY_OFFICE_SERVER_URL ?? undefined,
  },
});

const loading = ref(false);
const fileItem = ref<FileItem>();

onMounted(async () => {
  if (!props.url) {
    return;
  }

  let mimeType: string;
  if (props.mimeType) {
    mimeType = props.mimeType;
  } else {
    const response = await fetch(props.url);
    const fileType = await fileTypeFromStream(
      response.body as AnyWebReadableStream<Uint8Array>,
    );
    mimeType = fileType?.mime as string;
  }

  fileItem.value = {
    source: props.url,
    mimeType,
    id: props.id,
    name: props.filename,
  };
});
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
      :file="fileItem"
      class="pangju-wh-100"
      :viewer-props="viewerOptions"
      @loading-start="loading = true"
      @loading-end="loading = false"
      @loading-error="loading = false"
    />
  </n-spin>
</template>
