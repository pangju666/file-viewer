<script setup>
import { onMounted } from "vue";
import { Viewer } from "@photo-sphere-viewer/core";
import { CubemapAdapter } from "@photo-sphere-viewer/cubemap-adapter";
import { FileApi } from "@/apis/FileApi.js";

const props = defineProps({
    fileMd5: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["finished"]);

onMounted(async () => {
    emits("finished");
    const config = {
        container: document.getElementById("viewer"),
        adapter: CubemapAdapter,
        panorama: {
            type: "separate",
            paths: {
                left: FileApi.getSphereCubeUrl(props.fileMd5, "left"),
                front: FileApi.getSphereCubeUrl(props.fileMd5, "front"),
                right: FileApi.getSphereCubeUrl(props.fileMd5, "right"),
                back: FileApi.getSphereCubeUrl(props.fileMd5, "back"),
                top: FileApi.getSphereCubeUrl(props.fileMd5, "top"),
                bottom: FileApi.getSphereCubeUrl(props.fileMd5, "bottom"),
            },
            flipTopBottom: true,
        },
        loadingImg: "https://assets.changtech.cn/image/gis-map/loader.gif",
        touchmoveTwoFingers: false,
        navbar: ["zoom", "move", "caption", "fullscreen"],
    };
    const viewer = new Viewer(config);
    viewer.addEventListener("ready", () => {}, { once: true });
});
</script>

<template>
    <div class="sphere-image-viewer">
        <div id="viewer"></div>
    </div>
</template>

<style lang="less" scoped>
.sphere-image-viewer {
    width: 100%;
    height: 100%;

    #viewer {
        width: 100%;
        height: 100%;
    }
}
</style>
