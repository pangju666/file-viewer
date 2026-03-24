<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import "@babylonjs/viewer";
import "@/assets/css/file-viewer.css";
import type { UrlWithMimeType } from "@/types/file.ts";
import type { ModelPreviewOptions } from "@/types/options.ts";
import { getSrcFromUrl } from "@/utils/utils.ts";

const props = withDefaults(
  defineProps<
    ModelPreviewOptions & {
      src: UrlWithMimeType | string;
    }
  >(),
  {
    showProgressBar: true,
    babylonViewerAttributes: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "progress", loadingProgress: number): void;
  (e: "error", error?: Error, errorMessage?: string): void;
}>();

watch(
  () => props.src,
  (newVal) => {
    if (typeof newVal === "string" || newVal?.url) {
      source.value = getSrcFromUrl(newVal);

      if (typeof newVal === "string") {
        extension.value = undefined;
      } else {
        extension.value = getExtension(newVal?.mimeType);
      }
    } else {
      source.value = undefined;
      extension.value = undefined;
    }
  },
  { deep: true },
);

const bindBabylonViewerAttributes = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { source, extension, ...options } = props.babylonViewerAttributes ?? {};
  return options;
});

const viewerRef = ref<HTMLElement>();

const source = ref<string>();
const extension = ref<string>();

const getExtension = (mimeType?: string) => {
  switch (mimeType) {
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
};

const handleError = (error: ErrorEvent) => {
  if (error) {
    emits("error", error?.error, error?.message);
  }
};

const handleProgressChange = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof viewerRef.value?.loadingProgress === "number") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    emits("progress", viewerRef.value.loadingProgress);
  }
};

const handleModelChange = (e: Event) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (e?.detail) {
    emits("ready");
  }
};

const handleViewerReady = () => {
  if (props.src) {
    source.value = getSrcFromUrl(props.src);
  }
};

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (props.src?.mimeType) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    extension.value = getExtension(props.src.mimeType);
  }
});
</script>

<template>
  <babylon-viewer
    ref="viewerRef"
    v-bind="bindBabylonViewerAttributes"
    :source="source"
    :extension="extension"
    @loadingprogresschange="handleProgressChange"
    @modelerror="handleError"
    @viewerready="handleViewerReady"
    @modelchange="handleModelChange"
  >
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div v-if="!showProgressBar" slot="progress-bar"></div>
  </babylon-viewer>
</template>
