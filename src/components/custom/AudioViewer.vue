<script lang="ts" setup>
import AudioPlayer from "vue3-audio-player";
import "vue3-audio-player/dist/style.css";
import { computed } from "vue";

interface AudioOptions {
  title?: string | null;
  coverImage?: string | null;
  coverRotate?: boolean;
  progressBarColor?: string | null;
  indicatorColor?: string | null;
}

const props = withDefaults(
  defineProps<{
    url: string;
    filename?: string | null;
    options?: AudioOptions;
  }>(),
  {
    filename: null,
    options: () => ({
      title: null,
      coverImage: null,
      coverRotate: true,
      progressBarColor: null,
      indicatorColor: null,
    }),
  },
);

const emits = defineEmits<{
  (e: "finished"): void;
  (e: "error"): void;
}>();

const playerOption = computed(() => ({
  ...props.options,
  src: props.url,
  title: props.options?.title ?? props.filename,
  coverRotate: props.options?.coverRotate ?? true,
}));
</script>

<template>
  <div class="flex-center full-size">
    <audio-player
      :option="playerOption"
      @play="$emit('finished')"
      @play-error="$emit('error')"
    />
  </div>
</template>

<style scoped lang="less">
.audio-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
