<script lang="ts" setup>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import "@/assets/css/file-viewer.css";
import type { ImagePreviewOptions } from "@/types/options.ts";

const props = withDefaults(
  defineProps<
    ImagePreviewOptions & {
      src: string;
      title?: string;
    }
  >(),
  {
    title: undefined,
    viewerOptions: () => ({
      toolbar: {
        flipHorizontal: true,
        flipVertical: true,
        next: false,
        oneToOne: true,
        play: false,
        prev: false,
        reset: true,
        rotateLeft: true,
        rotateRight: true,
        zoomIn: true,
        zoomOut: true,
      },
    }),
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "error"): void;
}>();

watch(
  () => props.src,
  (val) => {
    viewer?.destroy();

    if (val && imageRef.value) {
      nextTick(() => {
        initViewer();
      });
    }
  },
);

let viewer: Viewer | null = null;

const imageRef = ref<HTMLImageElement>();

const initViewer = () => {
  viewer = new Viewer(imageRef.value as HTMLImageElement, {
    ...(props.viewerOptions ?? {}),
    inline: true,
    navbar: false,
    button: false,
    title: (image: HTMLImageElement, imageData: unknown) =>
      props.viewerOptions?.title ??
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `(${props.title ?? ""}${props.title ? " " : ""}${imageData.naturalWidth} × ${imageData.naturalHeight})`,
    viewed: (event: CustomEvent) => {
      if (props.viewerOptions?.viewed) {
        props.viewerOptions.viewed(event);
      }
      emits("ready");
    },
  });
};

onMounted(() => {
  if (props.src) {
    nextTick(() => {
      initViewer();
    });
  }
});

onUnmounted(() => {
  viewer?.destroy();
  viewer = null;
});
</script>

<template>
  <div>
    <img v-show="false" ref="imageRef" :src="src" @error="$emit('error')" />
  </div>
</template>
