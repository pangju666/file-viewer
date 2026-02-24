<script lang="ts" setup>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import { onMounted, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    url: string;
    filename?: string | null;
  }>(),
  {
    filename: null,
  },
);

const emits = defineEmits<{
  (e: "finished"): void;
}>();

onMounted(() => {
  const imageElement = document.getElementById("image");
  if (!imageElement) return;
  viewer = new Viewer(imageElement, {
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
    title: (_image: HTMLImageElement, imageData: Viewer.ImageData) =>
      `(${props.filename ?? ""} ${imageData.naturalWidth} × ${imageData.naturalHeight})`,
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
    viewed: () => {
      emits("finished");
    },
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
    <img id="image" class="display-none" :src="url" />
  </div>
</template>

<style scoped lang="less"></style>
