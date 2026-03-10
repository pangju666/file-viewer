<script lang="ts" setup>
import { ref } from "vue";
import { MusicNoteRound } from "@vicons/material";

const props = withDefaults(
  defineProps<{
    src: string;
    cover?: string;
    title?: string;
    autoplay?: boolean;
    controls?: boolean;
    onError?: (error: MediaError) => void;
  }>(),
  {
    cover: "coverIcon",
    autoplay: false,
    controls: true,
    title: undefined,
    onError: undefined,
  },
);

defineEmits<{
  (e: "ready"): void;
}>();

const coverAnimationClasses = ref<string[]>([]);

const addCoverAnimation = () => {
  coverAnimationClasses.value = ["cover-animation"];
};

const removeCoverAnimation = () => {
  coverAnimationClasses.value = [];
};

const handleError = (e: Event) => {
  const error: MediaError | null = (e.target as HTMLAudioElement)?.error;
  if (props.onError && error) {
    props.onError(error);
  }
};
</script>

<template>
  <div class="audio-viewer full-size">
    <n-image
      :src="cover"
      :width="300"
      :height="300"
      preview-disabled
      object-fit="cover"
      class="cover mb-10"
      :class="coverAnimationClasses"
    >
      <template #error>
        <n-icon :size="100">
          <MusicNoteRound />
        </n-icon>
      </template>
    </n-image>
    <n-ellipsis class="mb-10">
      <span class="title">{{ title }}</span>
    </n-ellipsis>
    <audio
      :src="src"
      :controls="controls"
      :autoplay="autoplay"
      class="w-100"
      @play="addCoverAnimation"
      @pause="removeCoverAnimation"
      @playing="$emit('ready')"
      @error="handleError"
    />
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
    border-radius: 999px;
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
