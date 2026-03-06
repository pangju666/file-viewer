<script lang="ts" setup>
import { onMounted } from "vue";
import { Viewer } from "@photo-sphere-viewer/core";
import { CubemapAdapter } from "@photo-sphere-viewer/cubemap-adapter";
import LoaderGif from "@/assets/images/loader.gif";
import "@photo-sphere-viewer/core/index.css";

const props = defineProps<{
  fileUrl: string;
}>();

const emits = defineEmits<{
  (e: "finished"): void;
}>();

onMounted(async () => {
  emits("finished");
  const sliceUrls = props.fileUrl.split(",");
  const container = document.getElementById("viewer");
  if (!container) return;
  const config = {
    container: container,
    adapter: CubemapAdapter as any,
    panorama: {
      type: "separate",
      paths: {
        left: sliceUrls[0],
        front: sliceUrls[1],
        right: sliceUrls[2],
        back: sliceUrls[3],
        top: sliceUrls[4],
        bottom: sliceUrls[5],
      },
      flipTopBottom: true,
    } as any,
    loadingImg: LoaderGif,
    touchmoveTwoFingers: false,
    navbar: ["zoom", "move", "caption", "fullscreen"],
  };
  const viewer = new Viewer(config as any);
  viewer.addEventListener("ready", () => {}, { once: true });
});
</script>

<template>
  <div class="sphere-image-viewer">
    <div id="viewer"></div>
  </div>
</template>

<style lang="less" scoped>
.sphere-image-viewer {
  width: 100%;
  height: 100%;

  #viewer {
    width: 100%;
    height: 100%;
  }
}
</style>
