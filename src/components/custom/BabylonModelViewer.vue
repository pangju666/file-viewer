<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import "@google/model-viewer";
import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  ImportMeshAsync,
  Scene,
  StandardMaterial,
  Vector3,
} from "babylonjs";
import "babylonjs-loaders";

const props = withDefaults(
  defineProps<{
    url: string;
    mimeType: string;
    onProgress?: (loaded: number, total: number) => void;
  }>(),
  {
    onProgress: () => {},
  },
);

const emits = defineEmits<{
  (e: "finished"): void;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);

let engine: Engine | null = null;
let scene: Scene | null = null;
let camera: ArcRotateCamera | null = null;
let currentMeshes: any[] = [];
let backLight: HemisphericLight | null = null;

onMounted(() => {
  initBabylon();
  if (props.mimeType !== "model/x.stl-binary" && scene) {
    // 从下方补光
    backLight = new HemisphericLight("back", new Vector3(0, -1, 0), scene);
  }
  window.addEventListener("resize", onResize);

  loadMesh(props.url);
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  destroyBabylon();
});

watch(
  () => props.url,
  (newVal: string) => {
    currentMeshes.forEach((mesh) => mesh.dispose());
    currentMeshes = [];

    loadMesh(newVal);
  },
);
watch(
  () => props.mimeType,
  (newVal: string) => {
    if (newVal === "model/x.stl-binary") {
      backLight?.dispose();
    } else if (scene) {
      // 从下方补光
      backLight = new HemisphericLight("back", new Vector3(0, -1, 0), scene);
    }
  },
);

const initBabylon = () => {
  // 获取画布元素
  const canvas = canvasRef.value;
  if (!canvas) return;
  // 创建引擎
  engine = new Engine(canvas, true);
  scene = new Scene(engine);

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

  engine.runRenderLoop(() => scene?.render());
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
  if (!scene) return;
  (ImportMeshAsync as any)(url, scene, {
    onProgress: (loaded: number, total: number) => {
      props?.onProgress?.(loaded, total);
    },
  }).then(({ meshes }: { meshes: any[] }) => {
    meshes.forEach((mesh) => {
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

    currentMeshes = meshes;

    scene!.onAfterRenderObservable.addOnce(() => {
      emits("finished");
    });
  });
};
const onResize = () => {
  engine?.resize();
};
</script>

<template>
  <div class="full-size">
    <canvas ref="canvasRef" class="full-size"></canvas>
  </div>
</template>

<style scoped lang="less"></style>
