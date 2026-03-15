<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import "@babylonjs/viewer";
import "@/assets/css/file-viewer.css";
import type { UrlWithMimeType } from "@/types/file.ts";
import { getSrcFromUrl } from "@/utils/utils.ts";
import type { ModelPreviewOptions } from "@/types/options.ts";

const props = withDefaults(
  defineProps<
    ModelPreviewOptions & {
      src: UrlWithMimeType | string;
      onProgress?: (loadingProgress: number) => void;
      onError?: (error: Error) => void;
    }
  >(),
  {
    viewerOptions: undefined,
    onProgress: undefined,
    onError: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

const extension = computed(() => {
  if (props.src === "string") {
    return undefined;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  switch (props.src?.mimeType) {
    case "model/gltf-binary":
      return ".glb";
    case "model/gltf+json":
      return ".gltf";
    case "model/obj":
      return ".obj";
    case "model/x.stl-binary":
      return ".stl";
    default:
      return undefined;
  }
});

const babylonViewerProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { source, extension, ...options } = props.viewerOptions ?? {};
  return options;
});

const viewerRef = ref<HTMLElement>();
const source = ref<string>();

const handleError = (error: Error) => {
  if (error && props.onError) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    props.onError(error?.error);
  }
};

const handleProgressChange = () => {
  if (props.onProgress && viewerRef.value) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    props.onProgress(viewerRef.value?.loadingProgress);
  }
};

const handleViewerReady = () => {
  if (props.src && viewerRef.value) {
    source.value = getSrcFromUrl(props.src);
  }
};

const handleModelChange = (e: Event) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (e?.detail) {
    emits("ready");
  }
};

watch(
  () => props.src,
  (newVal) => {
    source.value = getSrcFromUrl(newVal);
  },
);
</script>

<template>
  <babylon-viewer
    ref="viewerRef"
    class="pangju-wh-100"
    v-bind="babylonViewerProps"
    :source="source"
    :extension="extension"
    @loadingprogresschange="handleProgressChange"
    @modelerror="handleError"
    @viewerready="handleViewerReady"
    @modelchange="handleModelChange"
  >
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="progress-bar"></div>
  </babylon-viewer>
</template>
