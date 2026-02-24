<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import zhCN from "video.js/dist/lang/zh-CN.json";

videojs.addLanguage("zh-CN", zhCN);

interface VideoOptions {
  language?: string;
  autoplay?: boolean;
  controls?: boolean;
}

const props = withDefaults(
  defineProps<{
    url: string;
    mimeType?: string | null;
    options?: VideoOptions;
  }>(),
  {
    mimeType: null,
    options: () => ({
      language: "zh-CN",
      autoplay: false,
      controls: true,
    }),
  },
);

const emits = defineEmits<{
  (e: "finished"): void;
  (e: "error"): void;
}>();

const videoPlayRef = ref<HTMLVideoElement | null>(null);
const videoPlayer = ref<any>(null);

const playerOptions = computed(() => ({
  ...props.options,
  language: props.options?.language ?? "zh-CN",
  autoplay: props.options?.autoplay ?? false,
  controls: props.options?.controls ?? true,
  sources: [
    {
      src: props.url,
      type: props.mimeType,
    },
  ],
}));

onMounted(() => {
  if (!videoPlayRef.value) return;
  videoPlayer.value = videojs(
    videoPlayRef.value,
    playerOptions.value as any,
    () => {
      emits("finished");
    },
  );
  videoPlayer.value.on("error", () => {
    if (videoPlayer.value?.error()) {
      //const error = player.error();
      emits("error");
    }
  });
});
onUnmounted(() => {
  videoPlayer.value?.dispose();
});
</script>

<template>
  <div class="flex-center full-size">
    <video ref="videoPlayRef" class="video-js full-size"></video>
  </div>
</template>

<style scoped lang="less"></style>
