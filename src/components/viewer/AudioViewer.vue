<script lang="ts" setup>
import { useAVBars, useAVLine, useAVWaveform } from "vue-audio-visual";
import { ref, onMounted } from "vue";
import type { AudioViewerOption } from "@/types/viewer.ts";

const props = withDefaults(
  defineProps<{
    src: string;
    cover?: string;
    title?: string;
    visual?: boolean;
    mode?: "bars" | "waveform" | "line";
    option?: AudioViewerOption;
  }>(),
  {
    mode: "waveform",
    cover: undefined,
    title: undefined,
    visual: true,
    option: () => ({
      line: {},
      bars: {},
      circle: {},
      waveform: {
        playedLineColor: "lime",
        noplayedLineColor: "#CFCFCF",
        playtimeClickable: false,
        playtime: false,
      },
    }),
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "error", error: MediaError): void;
}>();

const width = ref<number>(300);

const audioRef = ref();
const canvasRef = ref();
const coverAnimationClasses = ref<string[]>([]);

onMounted(() => {
  if (props.visual) {
    switch (props.mode) {
      case "bars":
        useAVBars(audioRef, canvasRef, {
          canvasFillColor: props.option?.canvasFillColor,
          canvasWidth: props.option?.bars.canvasWidth,
          canvasHeight: props.option?.bars.canvasHeight,
          ...props.option?.bars,
        });
        break;
      case "waveform":
        useAVWaveform(audioRef, canvasRef, {
          src: props.src,
          canvasFillColor: props.option?.canvasFillColor,
          canvasWidth: props.option?.waveform.canvasWidth,
          canvasHeight: props.option?.waveform.canvasHeight,
          ...props.option?.waveform,
        });
        break;
      default:
        useAVLine(audioRef, canvasRef, {
          canvasFillColor: props.option?.canvasFillColor,
          canvasWidth: props.option?.line.canvasWidth,
          canvasHeight: props.option?.line.canvasHeight,
          ...props.option?.line,
        });
        break;
    }
  }
});

const addCoverAnimation = () => {
  coverAnimationClasses.value = ["cover-animation"];
};

const removeCoverAnimation = () => {
  coverAnimationClasses.value = [];
};

const handleAudioError = (e: Event) => {
  emits("error", (e.target as HTMLAudioElement).error as MediaError);
};
</script>

<template>
  <div v-if="width" class="audio-viewer full-size">
    <img
      v-if="cover"
      :src="cover"
      class="cover mb-10"
      :class="coverAnimationClasses"
    />
    <n-ellipsis class="mb-10">
      <span class="title">{{ title }}</span>
    </n-ellipsis>
    <audio
      ref="audioRef"
      :src="src"
      controls
      crossorigin="anonymous"
      class="mb-10 w-100"
      @play="addCoverAnimation"
      @pause="removeCoverAnimation"
      @playing="$emit('ready')"
      @error="handleAudioError"
    />
    <canvas v-if="visual" ref="canvasRef" class="w-100" />
  </div>
</template>

<style scoped lang="less">
.audio-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .title {
    font-size: 24px;
    text-align: center;
    color: #3c3c3c;
    line-height: 30px;
    font-weight: bold;
  }

  .cover {
    width: 300px;
    height: 300px;
    border-radius: 999px;
    object-fit: cover;
  }

  .cover-animation {
    animation: cover-rotate 5s linear infinite;
  }

  @keyframes cover-rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
