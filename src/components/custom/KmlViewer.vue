<script setup>
import {
    Ellipsoid,
    ImageryLayer,
    Ion,
    KmlDataSource,
    SceneMode,
    UrlTemplateImageryProvider,
    Viewer,
} from "cesium";
import { onMounted } from "vue";
import { FileApi } from "@/apis/FileApi.js";

Ion.defaultAccessToken = import.meta.env.VITE_BASE_CESIUM_TOKEN;

const props = defineProps({
    fileMd5: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["finished"]);

onMounted(() => {
    const viewer = new Viewer("cesium-container", {
        animation: false, //左下角的动画仪表盘
        baseLayerPicker: false, //右上角的图层选择按钮
        homeButton: false, //home按钮
        sceneModePicker: false, //模式切换按钮
        timeline: false, //底部的时间轴
        geocoder: false,
        navigationHelpButton: false, //右上角的帮助按钮，
        fullscreenButton: false, //右下角的全屏按钮
        selectionIndicator: false, //原生自带绿色选择框，双击显示的绿框
        infoBox: false, //点击要素之后显示的信息窗口
        sceneMode: SceneMode.SCENE2D,
        a: Ellipsoid.WGS84,
        baseLayer: new ImageryLayer(
            new UrlTemplateImageryProvider({
                url: `${
                    import.meta.env.VITE_TMS_TILE_BASE_URL
                }/tile/world2022/tms/{z}/{x}/{reverseY}?v=v4&token=Bearer%20${
                    import.meta.env.VITE_TMS_TILE_TOKEN
                }`,
                minimumLevel: 5,
                maximumLevel: 18,
            }),
            {},
        ),
    });

    viewer.dataSources
        .add(
            KmlDataSource.load(FileApi.getDownloadUrl(props.fileMd5), {
                camera: viewer.scene.camera,
                canvas: viewer.scene.canvas,
                screenOverlayContainer: viewer.container,
            }),
        )
        .then((dataSource) => {
            viewer.flyTo(dataSource.entities);
        });
    emits("finished");
});
</script>

<template>
    <div id="cesium-container" class="kml-viewer"></div>
</template>

<!--suppress Stylelint -->
<style scoped lang="less">
.kml-viewer {
    width: 100%;
    height: 100%;

    :deep(.cesium-credit-logoContainer) {
        display: none !important;
    }
}
</style>
