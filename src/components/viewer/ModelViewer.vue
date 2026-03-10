<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import "@babylonjs/viewer";

const props = withDefaults(
  defineProps<{
    src: string;
    mimeType?: string;
    options?: Record<string, unknown>;
    onProgress?: (loadingProgress: number) => void;
    onError?: (error: Error) => void;
  }>(),
  {
    options: undefined,
    mimeType: undefined,
    onProgress: undefined,
    onError: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

const extension = computed(() => {
  switch (props?.mimeType) {
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

const viewerRef = ref<HTMLElement>();
const source = ref<string>();

const handleError = (error: Error) => {
  if (error && props.onError) {
    props.onError(error?.error);
  }
};

const handleProgressChange = () => {
  if (props.onProgress && viewerRef.value) {
    props.onProgress(viewerRef.value?.loadingProgress);
  }
};

const handleViewerReady = () => {
  if (props.src && viewerRef.value) {
    source.value = props.src;
  }
};

const handleModelChange = (e: Event) => {
  if (e?.detail) {
    emits("ready");
  }
};

watch(
  () => props.src,
  (newVal) => {
    source.value = newVal;
  },
);
</script>

<template>
  <babylon-viewer
    ref="viewerRef"
    class="full-size"
    :source="source"
    :extension="extension"
    v-bind="options"
    @loadingprogresschange="handleProgressChange"
    @modelerror="handleError"
    @viewerready="handleViewerReady"
    @modelchange="handleModelChange"
  >
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="progress-bar"></div>
  </babylon-viewer>
</template>
