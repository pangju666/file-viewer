<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { DxfViewer, type LayerInfo } from "dxf-viewer";
import * as THREE from "three";
import { utf8Charset } from "@/utils/constants.ts";
import type { DxfPreviewOptions } from "@/types/options.ts";
import "@/assets/css/file-viewer.css";
import RobotoLightItalicFont from "@/assets/fonts/Roboto-LightItalic.ttf";

const props = withDefaults(
  defineProps<
    DxfPreviewOptions & {
      src: string;
      onProgress?:
        | ((
            phase: "font" | "fetch" | "parse" | "prepare",
            processedSize: number,
            totalSize: number,
          ) => void)
        | null;
      onError?: (error: Error) => void;
    }
  >(),
  {
    showLayerList: true,
    layerListWidth: 300,
    fonts: () => [RobotoLightItalicFont],
    viewerOptions: () => ({
      fileEncoding: utf8Charset,
      clearColor: new THREE.Color("#fff"),
      autoResize: true,
      colorCorrection: true,
      sceneOptions: {
        wireframeMesh: true,
      },
    }),
    onProgress: null,
    onError: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

let dxfViewer: DxfViewer | null = null;

const dxfContainerRef = ref<HTMLElement>();
const showAll = ref(true);
const layers = ref<LayerInfo[]>([]);

const initViewer = () => {
  dxfViewer = new DxfViewer(
    dxfContainerRef.value as HTMLElement,
    props.viewerOptions,
  );
  dxfViewer.Subscribe("loaded", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const dxfLayers = Array.from(dxfViewer?.GetLayers(true) ?? []);
    dxfLayers.forEach((dxfLayer: LayerInfo) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dxfLayer.isVisible = true;
    });
    layers.value = dxfLayers;
    emits("ready");
  });
};

const handleToggleLayer = (layer: LayerInfo, newState: boolean) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  layer.isVisible = newState;
  if (dxfViewer) {
    dxfViewer.ShowLayer(layer.name, newState);
  }
};

const handleToggleAll = (newState: boolean) => {
  showAll.value = newState;
  for (const layer of layers.value) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (layer?.isVisible !== newState) {
      handleToggleLayer(layer, newState);
    }
  }
};

const loadDxf = (dxfUrl: string) => {
  dxfViewer
    ?.Load({
      url: dxfUrl,
      fonts: props.fonts,
      progressCbk: props.onProgress,
      //workerFactory: DxfViewer.SetupWorker()
    })
    .catch((error) => {
      if (props.onError && error) {
        props.onError(error);
      }
    });
};

onMounted(() => {
  initViewer();

  if (props.src) {
    loadDxf(props.src);
  }
});

onUnmounted(() => {
  dxfViewer?.Destroy();
  dxfViewer = null;
});

watch(
  () => props.src,
  (newVal) => {
    showAll.value = true;
    layers.value = [];

    if (newVal) {
      loadDxf(newVal);
    }
  },
);
</script>

<template>
  <n-layout :has-sider="showLayerList" class="pangju-wh-100">
    <n-layout-sider v-if="showLayerList" :width="layerListWidth" bordered>
      <div class="pangju-wh-100">
        <div class="layer-list-title">图 层</div>
        <n-scrollbar style="max-height: calc(100% - 18px - 16px - 16px)">
          <div v-show="layers.length > 0" class="layer-list-item">
            <n-checkbox
              v-model:checked="showAll"
              label="全部图层"
              @update:checked="handleToggleAll"
            />
          </div>
          <n-flex vertical align="start">
            <div
              v-for="layer in layers"
              :key="layer.name"
              class="layer-list-item"
            >
              <n-checkbox
                v-model:checked="layer.isVisible"
                @update:checked="handleToggleLayer(layer, $event)"
              >
                <n-ellipsis>
                  {{ layer.displayName }}
                </n-ellipsis>
              </n-checkbox>
            </div>
          </n-flex>
        </n-scrollbar>
      </div>
    </n-layout-sider>
    <n-layout-content>
      <div ref="dxfContainerRef" class="pangju-wh-100"></div>
    </n-layout-content>
  </n-layout>
</template>

<style lang="less" scoped>
.layer-list-title {
  padding: 16px;
  font-size: 16px;
  color: #757575;
  font-weight: bold;
  line-height: 18px;
}

.layer-list-item {
  display: flex;
  padding: 2px 16px;
}
</style>
