<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref, computed } from "vue";
import { DxfViewer, type LayerInfo } from "dxf-viewer";
import { Color } from "three";
import { utf8Charset } from "@/utils/constants.ts";
import type { DxfPreviewOptions } from "@/types/options.ts";
import "@/assets/css/file-viewer.css";

const props = withDefaults(
  defineProps<
    DxfPreviewOptions & {
      src: string;
    }
  >(),
  {
    showProgressBar: true,
    showLayerList: true,
    layerListWidth: 300,
    fonts: () => [],
    dxfViewerOptions: () => ({
      fileEncoding: utf8Charset,
      clearColor: new Color("#fff"),
      autoResize: true,
      colorCorrection: true,
      sceneOptions: {
        wireframeMesh: true,
      },
    }),
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "error", error: Error): void;
  (
    e: "progress",
    phase: "font" | "fetch" | "parse" | "prepare",
    processedSize: number,
    totalSize: number,
  ): void;
}>();

watch(
  () => props.src,
  (newVal) => {
    reset();

    if (newVal) {
      loadDxf(newVal);
    }
  },
);

let dxfViewer: DxfViewer | null = null;

const dxfContainerRef = ref<HTMLElement>();
const showAll = ref(true);
const layers = ref<LayerInfo[]>([]);

const initViewer = () => {
  dxfViewer = new DxfViewer(
    dxfContainerRef.value as HTMLElement,
    props.dxfViewerOptions,
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

const loadDxf = (dxfUrl: string) => {
  dxfViewer
    ?.Load({
      url: dxfUrl,
      fonts: props.fonts,
      progressCbk: (
        phase: "font" | "fetch" | "parse" | "prepare",
        processedSize: number,
        totalSize: number,
      ) => {
        const percentage = (processedSize / totalSize) * 100;
        currentProgress.value = Math.min(Math.floor(percentage), 100);
        if (currentProgress.value === 100) {
          status.value = undefined;
        }
        switch (phase) {
          case "font":
            status.value = "正在加载字体...";
            break;
          case "prepare":
            status.value = "准备渲染数据...";
            break;
          case "fetch":
            status.value = "正在加载文件...";
            break;
          case "parse":
            status.value = "正在解析文件...";
            break;
        }

        emits("progress", phase, processedSize, totalSize);
      },
      //workerFactory: DxfViewer.SetupWorker()
    })
    .catch((error) => {
      if (error) {
        reset();
        emits("error", error);
      }
    });
};

const reset = () => {
  status.value = undefined;
  currentProgress.value = 0;
  showAll.value = true;
  layers.value = [];
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

const currentProgress = ref<number>(0);
const status = ref<string>();

const loading = computed(() => currentProgress.value === 100);

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
</script>

<template>
  <div>
    <div v-if="showProgressBar" style="position: relative">
      <n-progress
        v-show="loading"
        class="progress-bar"
        type="line"
        :percentage="currentProgress"
        indicator-placement="inside"
        processing
      >
        {{ status }}
      </n-progress>
    </div>
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
  </div>
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

.progress-bar {
  position: absolute;
  z-index: 9999;
}
</style>
