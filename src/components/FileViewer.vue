<script lang="ts" setup>
import { onMounted, ref } from "vue";
import MarkdownViewer from "@/components/custom/MarkdownViewer.vue";
import DxfViewer from "@/components/custom/DxfViewer.vue";
import PlainTextViewer from "@/components/custom/PlainTextViewer.vue";
import JsonViewer from "@/components/custom/JsonViewer.vue";
import ImageViewer from "@/components/custom/ImageViewer.vue";
import VideoViewer from "@/components/custom/VideoViewer.vue";
import AudioViewer from "@/components/custom/AudioViewer.vue";
import BabylonModelViewer from "@/components/custom/BabylonModelViewer.vue";
import OfficeViewer from "@/components/custom/OfficeViewer.vue";
import FileCardList from "@/components/FileCardList.vue";
import {
  audioMimeTypes,
  babylonSupportedTypes,
  dxfMimeType,
  imageMimeTypes,
  jsonMimeTypePrefix,
  markdownMimType,
  modelViewerSupportedTypes,
  officeMimeTypes,
  pdfMimeType,
  textMimeTypePrefix,
  videoMimeTypes,
} from "@/utils/constants.ts";
import { useLoadingBar } from "naive-ui";
import UnknownViewer from "@/components/custom/UnknownViewer.vue";

const loadingBar = useLoadingBar();

defineProps<{
  onLoad: (page?: number, pageSize?: number) => Promise<any> | any;
}>();

onMounted(() => {});

const currentFile = ref<any>(null);

const onClickFile = (file: any) => {
  currentFile.value = file;
  loadingBar.start();
};
const onFileFinished = () => {
  loadingBar.finish();
};
</script>

<template>
  <div class="full-size file-viewer">
    <n-split
      direction="horizontal"
      style="z-index: 100"
      class="h-100"
      :default-size="0.8"
      :max="0.9"
      :min="0.1"
    >
      <template #1>
        <div class="full-size">
          <markdown-viewer
            v-if="currentFile?.mimeType === markdownMimType"
            :url="currentFile?.url"
            @finished="onFileFinished"
          />
          <dxf-viewer
            v-else-if="currentFile?.mimeType === dxfMimeType"
            :url="currentFile?.url"
            @finished="onFileFinished"
          />
          <iframe
            v-else-if="currentFile?.mimeType === pdfMimeType"
            :src="`/viewer.html?file=${encodeURIComponent(currentFile?.url)}`"
            width="100%"
            height="100%"
            style="border: none"
          />
          <plain-text-viewer
            v-else-if="currentFile?.mimeType.startsWith(textMimeTypePrefix)"
            :url="currentFile?.url"
            @finished="onFileFinished"
          />
          <json-viewer
            v-else-if="currentFile?.mimeType.startsWith(jsonMimeTypePrefix)"
            :url="currentFile?.url"
            @finished="onFileFinished"
          />
          <!--                    <sphere-image-viewer
                    v-else-if="
                        sphereImageMimeTypes.includes(mimeType) && sphere
                    "
                    :file-url="fileUrl"
                    @finished="loading = false"
                />-->
          <image-viewer
            v-else-if="imageMimeTypes.includes(currentFile?.mimeType)"
            :url="currentFile?.url"
            @finished="onFileFinished"
          />
          <video-viewer
            v-else-if="videoMimeTypes.includes(currentFile?.mimeType)"
            :url="currentFile?.url"
            :mime-type="currentFile?.mimeType"
            @finished="onFileFinished"
          />
          <audio-viewer
            v-else-if="audioMimeTypes.includes(currentFile?.mimeType)"
            :url="currentFile?.url"
            :filename="currentFile?.filename"
            @finished="onFileFinished"
          />
          <model-viewer
            v-else-if="
              modelViewerSupportedTypes.includes(currentFile?.mimeType)
            "
            class="full-size"
            :src="currentFile?.url"
            camera-controls
            touch-action="pan-y"
            @load="onFileFinished"
          ></model-viewer>
          <babylon-model-viewer
            v-else-if="babylonSupportedTypes.includes(currentFile?.mimeType)"
            :url="currentFile?.url"
            :filename="currentFile?.filename"
            :mime-type="currentFile?.mimeType"
            @finished="onFileFinished"
          />
          <office-viewer
            v-else-if="officeMimeTypes.includes(currentFile?.mimeType)"
            :url="currentFile?.url"
            :mime-type="currentFile?.mimeType"
            :filename="currentFile?.filename"
            @finished="onFileFinished"
          />
          <unknown-viewer v-else @finished="onFileFinished" />
        </div>
      </template>
      <template #2>
        <file-card-list :on-load="onLoad" @click-file="onClickFile" />
      </template>
    </n-split>
  </div>
</template>

<style scoped lang="less">
.file-viewer {
  display: flex;
}
</style>
