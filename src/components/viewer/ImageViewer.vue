<script lang="ts" setup>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import { nextTick, onUnmounted, ref, watch } from "vue";
import type { UrlWithFilename } from "@/types/file.ts";
import "@/assets/css/pangju.css";

const props = withDefaults(
  defineProps<{
    src: UrlWithFilename | string;
    options?: Viewer.Options;
    onError?: (e: Event) => void;
  }>(),
  {
    filename: undefined,
    options: () => ({
      inline: true,
      button: false,
      loop: false,
      navbar: false,
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
    onError: undefined,
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
    ...props.options,
    title:
      props.options?.title ??
      ((image: HTMLImageElement, imageData: unknown) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        `(${filename ?? ""}${filename ? " " : ""}${imageData.naturalWidth} × ${imageData.naturalHeight})`),
    viewed: (event: CustomEvent) => {
      if (props?.options?.viewed) {
        props.options.viewed(event);
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
