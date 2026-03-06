<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { DxfViewer, type DxfViewerOptions, type LayerInfo } from "dxf-viewer";
import * as THREE from "three";
import HanaMinAFont from "@/assets/fonts/HanaMinA.ttf";
import NanumGothicRegularFont from "@/assets/fonts/HanaMinA.ttf";
import NotoSansDisplaySemiCondensedLightItalicFont from "@/assets/fonts/HanaMinA.ttf";
import RobotoLightItalicFont from "@/assets/fonts/HanaMinA.ttf";
import { utf8Charset } from "@/utils/constants.ts";

const props = withDefaults(
  defineProps<{
    src: string;
    fileEncoding?: string;
    fonts?: string[];
    options?: DxfViewerOptions;
    onProgress?: (processedSize: number, totalSize: number) => void;
  }>(),
  {
    fileEncoding: utf8Charset,
    fonts: () => [
      HanaMinAFont,
      NanumGothicRegularFont,
      NotoSansDisplaySemiCondensedLightItalicFont,
      RobotoLightItalicFont,
    ],
    options: () => ({
      clearColor: new THREE.Color("#fff"),
      autoResize: true,
      colorCorrection: true,
      sceneOptions: {
        wireframeMesh: true,
      },
    }),
    onProgress: () => {},
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

let dxfViewer: DxfViewer | null = null;

const dxfContainerRef = ref<HTMLElement>();
const showAll = ref(true);
const layers = ref<LayerInfo[]>([]);

onMounted(() => {
  if (!dxfContainerRef.value) {
    return;
  }

  dxfViewer = new DxfViewer(dxfContainerRef.value, {
    ...props?.options,
    clearColor: props?.options?.clearColor ?? new THREE.Color("#fff"),
    autoResize: props?.options?.autoResize ?? true,
    colorCorrection: props?.options?.colorCorrection ?? true,
    fileEncoding: props?.fileEncoding ?? utf8Charset,
    sceneOptions: {
      wireframeMesh: props?.options?.sceneOptions?.wireframeMesh ?? true,
    },
  });
  dxfViewer.Subscribe("loaded", () => {
    const dxfLayers = Array.from(dxfViewer?.GetLayers(true) ?? []);
    dxfLayers.forEach((dxfLayer: LayerInfo) => {
      dxfLayer.isVisible = true;
    });
    layers.value = dxfLayers;
    emits("ready");
  });
  if (props.src != null) {
    loadDxf(props.src);
  }
});

onUnmounted(() => {
  dxfViewer?.Destroy();
  dxfViewer = null;
});

watch(
  () => props.src,
  (newVal: string) => {
    loadDxf(newVal);
  },
);

const handleToggleLayer = (layer: LayerInfo, newState: boolean) => {
  layer.isVisible = newState;
  if (dxfViewer) {
    dxfViewer.ShowLayer(layer.name, newState);
  }
};

const handleToggleAll = (newState: boolean) => {
  showAll.value = newState;
  for (const layer of layers.value) {
    if (layer?.isVisible !== newState) {
      handleToggleLayer(layer, newState);
    }
  }
};

const loadDxf = (dxfUrl: string) => {
  if (dxfViewer) {
    dxfViewer.Load({
      url: dxfUrl,
      fonts: props.fonts,
      progressCbk: (
        phase: string,
        processedSize: number,
        totalSize: number,
      ) => {
        if (phase === "fetch") {
          props.onProgress?.(processedSize, totalSize);
        }
      },
      //workerFactory: DxfViewer.SetupWorker()
    });
  }
};
</script>

<template>
  <n-layout has-sider class="full-size">
    <n-layout-sider :width="300" bordered>
      <div>
        <n-scrollbar>
          <div class="layer-list-title">图 层</div>
          <div v-show="layers.length > 0" class="display-flex layer-list-item">
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
      <div ref="dxfContainerRef" class="full-size"></div>
    </n-layout-content>
  </n-layout>
</template>

<style lang="less" scoped>
.layer-list-title {
  padding: 16px;
  font-size: 16px;
  color: #757575;
  font-weight: bold;
}

.layer-list-item {
  padding: 2px 16px;
}
</style>
