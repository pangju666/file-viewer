<script lang="ts" setup>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import { onMounted, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    src: string;
    filename?: string;
    options?: Viewer.Options;
  }>(),
  {
    filename: undefined,
    options: () => ({
      inline: true,
      backdrop: true,
      button: true,
      focus: true,
      fullscreen: true,
      loading: true,
      loop: false,
      keyboard: false,
      movable: true,
      navbar: false,
      rotatable: true,
      scalable: true,
      slideOnTouch: true,
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
      tooltip: true,
      transition: true,
      zoomable: true,
      zoomOnTouch: true,
      zoomOnWheel: true,
    }),
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

onMounted(() => {
  const imageElement = document.getElementById("image");
  if (!imageElement) {
    return;
  }

  viewer = new Viewer(imageElement, {
    ...props.options,
    title:
      props.options?.title ??
      ((image: HTMLImageElement, imageData: unknown) =>
        `(${props.filename ?? ""} ${imageData.naturalWidth} × ${imageData.naturalHeight})`),
    viewed: props.options?.viewed ?? (() => emits("ready")),
  });
});

onUnmounted(() => {
  viewer?.destroy();
  viewer = null;
});

let viewer: Viewer | null = null;
</script>

<template>
  <div class="full-size">
    <img id="image" class="display-none" :src="src" />
  </div>
</template>
