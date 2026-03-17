<script lang="ts" setup>
import { computed, ref } from "vue";
import { MusicNoteRound } from "@vicons/material";
import type { AudioPreviewOptions } from "@/types/options.ts";
import "@/assets/css/file-viewer.css";

const props = withDefaults(
  defineProps<
    AudioPreviewOptions & {
      src: string;
      title?: string;
      cover?: string;
    }
  >(),
  {
    title: undefined,
    cover: "coverIcon",
    coverSize: 180,
    coverObjectFit: "cover",
    autoplay: false,
    controls: true,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "error", error: MediaError): void;
}>();

const coverAnimationClasses = ref<string[]>([]);

const coverMarginBottomStyle = computed(() => ({
  marginBottom: `${props.coverSize / 2}px`,
}));

const addCoverAnimation = () => {
  coverAnimationClasses.value = ["cover-animation"];
};

const removeCoverAnimation = () => {
  coverAnimationClasses.value = [];
};

const handleError = (e: Event) => {
  const error: MediaError | null = (e.target as HTMLAudioElement)?.error;
  if (error) {
    emits("error", error);
  }
};
</script>

<template>
  <div class="audio-viewer">
    <slot name="cover">
      <n-image
        :src="cover"
        :style="coverMarginBottomStyle"
        :object-fit="coverObjectFit"
        :width="coverSize"
        :height="coverSize"
        preview-disabled
        class="cover"
        :class="coverAnimationClasses"
      >
        <template #error>
          <n-icon :size="coverSize">
            <MusicNoteRound />
          </n-icon>
        </template>
        <template #placeholder>
          <n-icon :size="coverSize">
            <MusicNoteRound />
          </n-icon>
        </template>
      </n-image>
    </slot>
    <slot name="title" :title="title">
      <n-ellipsis class="pangju-mb-10">
        <span class="title">{{ title }}</span>
      </n-ellipsis>
    </slot>
    <slot>
      <audio
        :src="src"
        :controls="controls"
        :autoplay="autoplay"
        class="pangju-w-100"
        @play="addCoverAnimation"
        @pause="removeCoverAnimation"
        @canplay="$emit('ready')"
        @error="handleError"
      />
    </slot>
  </div>
</template>

<style scoped lang="less">
.audio-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
  flex-direction: column;

  .title {
    font-size: 24px;
    text-align: center;
    color: #3c3c3c;
    line-height: 30px;
    font-weight: bold;
  }

  .cover {
    display: block;
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
