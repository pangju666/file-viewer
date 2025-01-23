<script setup>
import { ref, toRaw, onMounted } from "vue";
import { DxfViewer } from "dxf-viewer";
import * as THREE from "three";
import { FileApi } from "@/apis/FileApi.js";

const props = defineProps({
    fileMd5: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["finished"]);

const dxfContainerRef = ref();
const showAll = ref(true);
const dxfViewer = ref(null);
const layers = ref([]);

onMounted(() => {
    dxfViewer.value = new DxfViewer(dxfContainerRef.value, {
        clearColor: new THREE.Color("white"),
        autoResize: true,
        colorCorrection: true,
        fileEncoding: "gbk",
        sceneOptions: {
            wireframeMesh: true,
        },
    });
    for (const eventName of ["loaded"]) {
        dxfViewer.value.Subscribe(eventName, () => {
            const dxfLayers = dxfViewer.value.GetLayers();
            dxfLayers.forEach((lyr) => (lyr["isVisible"] = true));
            layers.value = dxfLayers;
        });
    }
    toRaw(dxfViewer.value)
        .Load({
            url: FileApi.getDownloadUrl(props.fileMd5),
            fonts: ["https://assets.changtech.cn/font/simfang.ttf"],
        })
        .then(() => emits("finished"));
});

const onToggleLayer = (layer, newState) => {
    layer.isVisible = newState;
    toRaw(dxfViewer.value).ShowLayer(layer.name, newState);
};
const onToggleAll = (newState) => {
    showAll.value = newState;
    for (const layer of layers.value) {
        if (layer.isVisible !== newState) {
            onToggleLayer(layer, newState);
        }
    }
};
</script>

<template>
    <div class="dxf-viewer">
        <n-split
            direction="horizontal"
            :default-size="0.9"
            :max="0.9"
            :min="0.1"
        >
            <template #1>
                <div ref="dxfContainerRef" class="dxf-container"></div>
            </template>
            <template #2>
                <div class="layer-list">
                    <n-scrollbar>
                        <div
                            v-show="layers.length > 0"
                            class="mb-10 display-flex"
                        >
                            <n-checkbox
                                v-model:checked="showAll"
                                label="全部图层"
                                @update:checked="onToggleAll"
                            />
                        </div>
                        <n-flex vertical align="start">
                            <div v-for="layer in layers" :key="layer.name">
                                <n-checkbox
                                    v-model:checked="layer.isVisible"
                                    @update:checked="
                                        (e) => onToggleLayer(layer, e)
                                    "
                                >
                                    <n-ellipsis>
                                        {{ layer.displayName }}
                                    </n-ellipsis>
                                </n-checkbox>
                            </div>
                        </n-flex>
                    </n-scrollbar>
                </div>
            </template>
        </n-split>
    </div>
</template>

<style lang="less" scoped>
.dxf-viewer {
    width: 100%;
    height: 100%;

    .layer-list {
        padding: 10px;
    }

    .dxf-container {
        width: 100%;
        height: 100%;
    }
}
</style>
