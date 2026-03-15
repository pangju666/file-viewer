<script lang="ts" setup>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import { nextTick, onUnmounted, ref, watch } from "vue";
import type { UrlWithFilename } from "@/types/file.ts";
import "@/assets/css/file-viewer.css";
import type { ImagePreviewOptions } from "@/types/options.ts";

const props = withDefaults(
  defineProps<
    ImagePreviewOptions & {
      src: UrlWithFilename | string;
      onError?: (e: Event) => void;
    }
  >(),
  {
    onError: undefined,
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
}>();

let viewer: Viewer | null = null;

const imageRef = ref<HTMLImageElement>();
const imageUrl = ref<string>();

const initViewer = (filename?: string) => {
  viewer = new Viewer(imageRef.value as HTMLImageElement, {
    ...(props.viewerOptions ?? {}),
    inline: true,
    navbar: false,
    button: false,
    title: (image: HTMLImageElement, imageData: unknown) =>
      props.viewerOptions?.title ??
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `(${filename ?? ""}${filename ? " " : ""}${imageData.naturalWidth} × ${imageData.naturalHeight})`,
    viewed: (event: CustomEvent) => {
      if (props.viewerOptions?.viewed) {
        props.viewerOptions.viewed(event);
      }
      emits("ready");
    },
  });
};

const handleError = (e: Event) => {
  if (props.onError && e) {
    props.onError(e);
  }
};

watch(
  () => props.src,
  (val) => {
    let filename = undefined;
    if (!val) {
      imageUrl.value = undefined;
    } else if (typeof props.src === "string") {
      imageUrl.value = props.src;
    } else {
      imageUrl.value = props.src.url;
      filename = props.src?.filename;
    }

    viewer?.destroy();
    if (val) {
      if (imageRef.value) {
        initViewer(filename);
      } else {
        nextTick(() => {
          initViewer(filename);
        });
      }
    }
  },
  { immediate: true, deep: true },
);

onUnmounted(() => {
  viewer?.destroy();
  viewer = null;
});
</script>

<template>
  <div class="pangju-wh-100">
    <img v-show="false" ref="imageRef" :src="imageUrl" @error="handleError" />
  </div>
</template>
