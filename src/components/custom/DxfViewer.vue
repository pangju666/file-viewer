<script lang="ts" setup>
import { ref, toRaw, onMounted, onUnmounted, watch } from "vue";
import { DxfViewer } from "dxf-viewer";
import * as THREE from "three";
import HanaMinAFont from "@/assets/fonts/HanaMinA.ttf";
import NanumGothicRegularFont from "@/assets/fonts/HanaMinA.ttf";
import NotoSansDisplaySemiCondensedLightItalicFont from "@/assets/fonts/HanaMinA.ttf";
import RobotoLightItalicFont from "@/assets/fonts/HanaMinA.ttf";

interface DxfOptions {
  clearColor?: THREE.Color;
  autoResize?: boolean;
  colorCorrection?: boolean;
  sceneOptions?: {
    wireframeMesh?: boolean;
  };
}

const props = withDefaults(
  defineProps<{
    url: string;
    fileEncoding?: string;
    fonts?: string[];
    options?: DxfOptions;
    onProgress?: (processedSize: number, totalSize: number) => void;
  }>(),
  {
    fileEncoding: "utf-8",
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
  (e: "finished"): void;
}>();

const dxfContainerRef = ref<HTMLElement | null>(null);
const showAll = ref(true);
const dxfViewer = ref<DxfViewer | null>(null);
const layers = ref<any[]>([]);

onMounted(() => {
  if (!dxfContainerRef.value) return;
  dxfViewer.value = new DxfViewer(dxfContainerRef.value, {
    ...props.options,
    clearColor: props.options?.clearColor ?? new THREE.Color("#fff"),
    autoResize: props.options?.autoResize ?? true,
    colorCorrection: props.options?.colorCorrection ?? true,
    fileEncoding: props.fileEncoding ?? "utf-8",
    sceneOptions: {
      wireframeMesh: props.options?.sceneOptions?.wireframeMesh ?? true,
    },
  });
  dxfViewer.value.Subscribe("loaded", () => {
    const dxfLayers = dxfViewer.value?.GetLayers(true) ?? [];
    dxfLayers.forEach((dxfLayer: any) => (dxfLayer.isVisible = true));
    layers.value = dxfLayers;
    emits("finished");
  });
  if (props.url != null) {
    loadDxf(props.url);
  }
});
onUnmounted(() => {
  dxfViewer.value?.Destroy();
  dxfViewer.value = null;
});

watch(
  () => props.url,
  (newVal: string) => {
    loadDxf(newVal);
  },
);

const onToggleLayer = (layer: any, newState: boolean) => {
  layer.isVisible = newState;
  if (dxfViewer.value) {
    toRaw(dxfViewer.value).ShowLayer(layer.name, newState);
  }
};
const onToggleAll = (newState: boolean) => {
  showAll.value = newState;
  for (const layer of layers.value) {
    if (layer?.isVisible !== newState) {
      onToggleLayer(layer, newState);
    }
  }
};

const loadDxf = (dxfUrl: string) => {
  if (dxfViewer.value) {
    toRaw(dxfViewer.value).Load({
      url: dxfUrl,
      fonts: props.fonts,
      progressCbk: (
        phase: string,
        processedSize: number,
        totalSize: number,
      ) => {
        if (phase === "fetch") {
          props?.onProgress?.(processedSize, totalSize);
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
              @update:checked="onToggleAll"
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
                @update:checked="(e) => onToggleLayer(layer, e)"
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
