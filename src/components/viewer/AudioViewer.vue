<script lang="ts" setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { MusicNoteRound } from "@vicons/material";

const message = useMessage();

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

const emits = defineEmits<{
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
  if (error) {
    if (props.onError) {
      props.onError(error);
    } else {
      switch (error?.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          // 音频加载被用户主动中断
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          // 网络错误：音频下载过程中断
          message.error("音频加载失败，请检查网络后重试。");
          break;
        case MediaError.MEDIA_ERR_DECODE:
          // 解码错误：音频文件损坏或格式不兼容
          message.error("音频文件损坏或格式不支持");
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          // 源不支持：无效的音频地址或格式
          message.error("无效的音频链接或格式不支持");
          break;
        default:
          break;
      }
    }
  }

  emits("ready");
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
