<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  ImportMeshAsync,
  Scene,
  StandardMaterial,
  Vector3,
  Color4,
} from "babylonjs";
import "babylonjs-loaders";
import { modelViewerSupportedTypes, stlMimeType } from "@/utils/constants.ts";
import type {
  ISceneLoaderAsyncResult,
  ISceneLoaderProgressEvent,
} from "babylonjs/Loading/sceneLoader";

const props = withDefaults(
  defineProps<{
    src: string;
    mimeType?: string;
    backgroundColor?: string;
    onProgress?: (loaded: number, total: number) => void;
  }>(),
  {
    onProgress: () => {},
    mimeType: undefined,
    backgroundColor: "#FF000000",
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
  (e: "error", error: Error): void;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);

let engine: Engine | null = null;
let scene: Scene | null = null;
let camera: ArcRotateCamera | null = null;
/*let currentMeshes: AbstractMesh[] = [];
let backLight: HemisphericLight | null = null;*/

onMounted(() => {
  if (modelViewerSupportedTypes.includes(props.mimeType)) {
    return;
  }

  initBabylon();
  if (props.mimeType !== stlMimeType && scene) {
    // 从下方补光
    new HemisphericLight("back", new Vector3(0, -1, 0), scene);
  }
  window.addEventListener("resize", resizeEngine);

  loadMesh(props.src);
});

onUnmounted(() => {
  if (modelViewerSupportedTypes.includes(props.mimeType)) {
    return;
  }

  window.removeEventListener("resize", resizeEngine);
  destroyBabylon();
});

/*watch(
  () => props.src,
  (newVal: string) => {
    currentMeshes.forEach((mesh) => mesh.dispose());
    currentMeshes = [];

    loadMesh(newVal);
  },
);

watch(
  () => props.mimeType,
  (newVal?: string) => {
    if (newVal === stlMimeType) {
      backLight?.dispose();
    } else if (scene) {
      // 从下方补光
      backLight = new HemisphericLight("back", new Vector3(0, -1, 0), scene);
    }
  },
);*/

const initBabylon = () => {
  // 获取画布元素
  const canvas = canvasRef.value;
  if (!canvas) {
    return;
  }
  // 创建引擎
  engine = new Engine(canvas, true);
  scene = new Scene(engine);
  scene.clearColor = Color4.FromHexString(props.backgroundColor);

  // 创建相机和灯光
  camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    30,
    Vector3.Zero(),
    scene,
  );
  camera.attachControl(canvas, true);
  new HemisphericLight("front", new Vector3(0, 1, 0), scene);

  engine?.runRenderLoop(() => scene?.render());
};

const destroyBabylon = () => {
  // 1. 停止渲染循环
  engine?.stopRenderLoop();

  // 2. 销毁场景（会自动 dispose 所有 mesh、材质、灯光、相机等）
  scene?.dispose();
  scene = null;

  // 3. 销毁引擎（释放 WebGL 上下文）
  engine?.dispose();
  engine = null;
};

const loadMesh = (url: string) => {
  if (!scene) {
    return;
  }

  ImportMeshAsync(url, scene, {
    onProgress: (event: ISceneLoaderProgressEvent) => {
      props.onProgress?.(event.loaded, event.total);
    },
  })
    .then((result: ISceneLoaderAsyncResult) => {
      result.meshes.forEach((mesh) => {
        // 如果没有材质（或 .mtl 缺失），手动添加一个默认材质
        if (mesh.material == null) {
          mesh.material = new StandardMaterial("objFallbackMat", scene!);
        }
        if (mesh.material) {
          mesh.material.backFaceCulling = false; // 关闭剔除
        }
      });

      // 可选：调整模型位置/缩放（OBJ 单位可能很大或很小）
      const worldExtends = scene!.getWorldExtends();
      const size = Vector3.Distance(worldExtends.min, worldExtends.max);
      if (size > 0 && camera) {
        // 自动聚焦到模型
        const center = worldExtends.min.add(worldExtends.max).scaleInPlace(0.5);
        camera.setTarget(center);
        camera.radius = size * 2;
      }

      /* currentMeshes = result.meshes;*/

      const observer = scene!.onAfterRenderObservable.add(() => {
        emits("ready");
        scene!.onAfterRenderObservable.remove(observer);
      });
    })
    .catch((e: Error) => {
      emits("error", e);
    });
};

const resizeEngine = () => {
  engine?.resize();
};
</script>

<template>
  <model-viewer
    v-if="modelViewerSupportedTypes.includes(mimeType as string)"
    :src="src"
    class="full-size"
    camera-controls
    touch-action="pan-y"
    @load="$emit('ready')"
  />
  <div v-else class="full-size">
    <canvas ref="canvasRef" class="full-size"></canvas>
  </div>
</template>
