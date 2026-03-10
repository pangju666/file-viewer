<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import zhCN from "video.js/dist/lang/zh-CN.json";
import type { UrlWithMimeType } from "@/types/file.ts";

videojs.addLanguage("zh-CN", zhCN);

const props = withDefaults(
  defineProps<{
    src: UrlWithMimeType | string;
    poster?: string;
    options?: Record<string, unknown>;
    onError?: (error: MediaError) => void;
    onProgress?: (player: unknown) => void;
  }>(),
  {
    options: () => ({
      language: "zh-CN",
      autoplay: false,
      controls: true,
    }),
    poster: undefined,
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
      videoPlayer?.src(normalizeSource(newVal));
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
    ...props.options,
    language: props.options?.language ?? "zh-CN",
    autoplay: props.options?.autoplay ?? false,
    controls: props.options?.controls ?? true,
    sources: props.src ? [normalizeSource(props.src)] : [],
  });

  videoPlayer?.on("loadeddata", () => {
    emits("ready");
  });

  videoPlayer?.on("error", () => {
    const error = videoPlayer?.error();
    if (props.onError && error) {
      props.onError(error);
    }
  });

  videoPlayer?.on("progress", () => {
    if (props.onProgress) {
      props.onProgress(videoPlayer);
    }
  });
});

onUnmounted(() => {
  videoPlayer?.dispose();
  videoPlayer = null;
});
</script>

<template>
  <div class="full-size">
    <video
      ref="videoPlayRef"
      class="video-js full-size"
      :poster="poster"
    ></video>
  </div>
</template>
