<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import zhCN from "video.js/dist/lang/zh-CN.json";
import type { UrlWithMimeType } from "@/types/file.ts";
import "@/assets/css/file-viewer.css";
import type { VideoPreviewOptions } from "@/types/options.ts";

videojs.addLanguage("zh-CN", zhCN);

const props = withDefaults(
  defineProps<
    VideoPreviewOptions & {
      src: UrlWithMimeType | string;
      cover?: string;
      onError?: (error: MediaError) => void;
      onProgress?: (player: unknown) => void;
    }
  >(),
  {
    viewerOptions: () => ({
      language: "zh-CN",
      autoplay: false,
      controls: true,
    }),
    cover: undefined,
    onError: undefined,
    onProgress: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

let videoPlayer: unknown = null;
const videoPlayRef = ref<HTMLVideoElement | null>(null);

const normalizeSource = (src: UrlWithMimeType | string) => {
  if (typeof src === "string") {
    return { src: src };
  }
  return { src: src.url, type: src.mimeType };
};

watch(
  () => props.src,
  (newVal) => {
    if (newVal) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      videoPlayer?.src(normalizeSource(newVal));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      videoPlayer?.load();
    }
  },
  { deep: true },
);

onMounted(() => {
  if (!videoPlayRef.value) {
    return;
  }

  videoPlayer = videojs(videoPlayRef.value, {
    ...props.viewerOptions,
    sources: props.src ? [normalizeSource(props.src)] : [],
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  videoPlayer?.on("loadeddata", () => {
    emits("ready");
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  videoPlayer?.on("error", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const error = videoPlayer?.error();
    if (props.onError && error) {
      props.onError(error);
    }
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  videoPlayer?.on("progress", () => {
    if (props.onProgress) {
      props.onProgress(videoPlayer);
    }
  });
});

onUnmounted(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  videoPlayer?.dispose();
  videoPlayer = null;
});
</script>

<template>
  <div class="pangju-wh-100">
    <video
      ref="videoPlayRef"
      class="video-js pangju-wh-100"
      :poster="cover"
    ></video>
  </div>
</template>
