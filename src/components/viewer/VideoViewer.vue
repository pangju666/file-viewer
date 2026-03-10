<script lang="ts" setup>
import { onMounted, watch, onUnmounted, ref } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import zhCN from "video.js/dist/lang/zh-CN.json";
import { useMessage } from "naive-ui";
import type { UrlWithMimeType } from "@/types/file.ts";

videojs.addLanguage("zh-CN", zhCN);

const message = useMessage();

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
    if (error) {
      if (props.onError) {
        props.onError(error);
      } else {
        switch (error?.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            // 视频加载被用户主动中断
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            // 网络错误：视频下载过程中断
            message.error("视频加载失败，请检查网络后重试。");
            break;
          case MediaError.MEDIA_ERR_DECODE:
            // 解码错误：视频文件损坏或格式不兼容
            message.error("视频文件损坏或格式不支持");
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            // 源不支持：无效的视频地址或格式
            message.error("无效的视频链接或格式不支持");
            break;
          default:
            break;
        }
      }
    }

    emits("ready");
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
