<script setup>
import { Ellipsoid, Ion, KmlDataSource, Viewer } from "cesium";
import { onMounted } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";

const props = defineProps({
    fileUrl: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["finished"]);

onMounted(() => {
    Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;
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
        //sceneMode: SceneMode.SCENE2D,
        ellipsoid: Ellipsoid.WGS84,
    });

    viewer.dataSources
        .add(
            KmlDataSource.load(props.fileUrl, {
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
