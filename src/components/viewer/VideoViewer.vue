<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import zhCN from "video.js/dist/lang/zh-CN.json";

videojs.addLanguage("zh-CN", zhCN);

const props = withDefaults(
  defineProps<{
    src: string;
    mimeType?: string;
    options?: Record<string, unknown>;
  }>(),
  {
    mimeType: undefined,
    options: () => ({
      language: "zh-CN",
      autoplay: false,
      controls: true,
    }),
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

const videoPlayRef = ref<HTMLVideoElement | null>(null);
const videoPlayer = ref<unknown>();

onMounted(() => {
  if (!videoPlayRef.value) {
    return;
  }

  videoPlayer.value = videojs(
    videoPlayRef.value,
    {
      ...props.options,
      language: props.options?.language ?? "zh-CN",
      autoplay: props.options?.autoplay ?? false,
      controls: props.options?.controls ?? true,
      sources: [
        {
          src: props.src,
          type: props.mimeType,
        },
      ],
    },
    () => {
      emits("ready");
    },
  );
  /*videoPlayer.value.on("error", () => {
    if (videoPlayer.value?.error()) {
      //const error = player.error();
      emits("error");
    }
  });*/
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
