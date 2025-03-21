<script setup>
import { onMounted, nextTick, ref } from "vue";
import "@google/model-viewer";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

const props = defineProps({
    fileUrl: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["finished"]);

const canvasRef = ref();

onMounted(() => {
    if (props.mimeType === "model/gltf-binary") {
        emits("finished");
    } else {
        nextTick(async () => {
            // 获取画布元素
            const canvas = canvasRef.value;
            // 创建引擎
            const engine = new BABYLON.Engine(canvas, true);
            const scene = new BABYLON.Scene(engine);

            // 创建相机
            const camera = new BABYLON.ArcRotateCamera(
                "camera1",
                Math.PI / 2,
                Math.PI / 2,
                5,
                BABYLON.Vector3.Zero(),
                scene,
            );
            camera.attachControl(canvas, true);

            // 创建光源
            const light = new BABYLON.HemisphericLight(
                "light1",
                BABYLON.Vector3.Up(),
                scene,
            );
            light.intensity = 0.7;

            try {
                // 加载模型
                const result = await BABYLON.SceneLoader.ImportMeshAsync(
                    "",
                    props.fileUrl, // 替换为模型路径
                    props.filename, // 替换为模型文件名
                    scene,
                );
                // 模型加载完成后的操作
                const meshes = result.meshes;

                // 合并所有网格的边界框
                let minimum = new BABYLON.Vector3(
                    Number.MAX_VALUE,
                    Number.MAX_VALUE,
                    Number.MAX_VALUE,
                );
                let maximum = new BABYLON.Vector3(
                    -Number.MAX_VALUE,
                    -Number.MAX_VALUE,
                    -Number.MAX_VALUE,
                );

                meshes.forEach((mesh) => {
                    const boundingBox = mesh.getBoundingInfo().boundingBox;
                    minimum = BABYLON.Vector3.Minimize(
                        minimum,
                        boundingBox.minimumWorld,
                    );
                    maximum = BABYLON.Vector3.Maximize(
                        maximum,
                        boundingBox.maximumWorld,
                    );
                });

                // 计算模型的中心和大小
                const center = minimum.add(maximum).scale(0.5);
                const size = maximum.subtract(minimum);
                const maxSize = Math.max(size.x, size.y, size.z);

                // 设置相机目标和距离
                camera.target = center;
                camera.radius = maxSize * 2; // 调整相机的距离

                // 设置相机裁剪平面
                camera.minZ = maxSize / 100; // 根据模型大小动态调整
                camera.maxZ = maxSize * 10;

                // 启动渲染循环
                engine.runRenderLoop(() => {
                    scene.render();
                });

                emits("finished");
            } catch (error) {
                console.error("模型加载失败:", error);
            }

            // 窗口尺寸变化时调整画布大小
            window.addEventListener("resize", () => {
                engine.resize();
            });
        });
    }
});
</script>

<template>
    <model-viewer
        v-if="mimeType === 'model/gltf-binary'"
        class="model-viewer"
        :src="fileUrl"
        shadow-intensity="1"
        camera-controls
    ></model-viewer>
    <div v-else class="model-viewer">
        <canvas ref="canvasRef" style="width: 100%; height: 100vh"></canvas>
    </div>
</template>

<style scoped lang="less">
.model-viewer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
