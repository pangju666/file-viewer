<script setup>
import { onMounted, ref } from "vue";
import { FileApi } from "@/apis/FileApi.js";
import DxfViewer from "@/components/custom/DxfViewer.vue";
import VideoViewer from "@/components/custom/VideoViewer.vue";
import AudioViewer from "@/components/custom/AudioViewer.vue";
import PlainTextViewer from "@/components/custom/PlainTextViewer.vue";
import MarkdownViewer from "@/components/custom/MarkdownViewer.vue";
import KmlViewer from "@/components/custom/KmlViewer.vue";
import ImageViewer from "@/components/custom/ImageViewer.vue";
import JsonBoxedViewer from "@/components/custom/JsonBoxedViewer.vue";
import ThreeDModelViewer from "@/components/custom/ThreeDModelViewer.vue";
import UnknownViewer from "@/components/custom/UnknownViewer.vue";
import SphereImageViewer from "@/components/custom/SphereImageViewer.vue";
import { useRoute } from "vue-router";
import { get } from "@/apis/base.js";
import OfficeViewer from "@/components/custom/OfficeViewer.vue";

const route = useRoute();

const unSupportMimeTypes = ["image/vnd.dwg"];
const officeMimeTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/msword",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint",
];
const modelMimeTypes = [
    "model/obj",
    /*"model/fbx",*/
    "model/gltf-binary",
    "model/x.stl-binary",
];

const props = defineProps({
    fileMd5: {
        type: String,
        required: true,
    },
});

const loading = ref(true);
const mimeType = ref(null);
const filename = ref(null);
const sphere = ref(false);

onMounted(async () => {
    try {
        loading.value = true;
        const fileInfo = await FileApi.getInfo(props.fileMd5);
        document.title = fileInfo.filename;
        const fileMimeType = fileInfo.mimeType;
        filename.value = fileInfo.filename;
        sphere.value = route.query?.sphere ?? false;

        if (unSupportMimeTypes.includes(fileMimeType)) {
            mimeType.value = "";
            loading.value = false;
        } else if (fileMimeType === "application/pdf") {
            const fileDownloadUrl = await get(
                FileApi.getDownloadUrl(props.fileMd5, false),
            );
            location.href = `${
                import.meta.env.VITE_PDF_VIEWER_URL
            }?file=${encodeURIComponent(fileDownloadUrl)}`;
        } /*else if (officeMimeTypes.includes(fileMimeType)) {
            const fileDownloadUrl = await get(
                FileApi.getDownloadUrl(props.fileMd5, false),
            );
            location.href = `${
                import.meta.env.VITE_OFFICE_VIEW_URL
            }?src=${encodeURIComponent(fileDownloadUrl)}`;
        } */ else {
            mimeType.value = fileMimeType;
        }
    } catch {
        mimeType.value = "";
        loading.value = false;
    }
});
</script>

<template>
    <n-spin
        :show="loading"
        description="正在加载中"
        class="h-center h-100"
        content-class="full-size"
    >
        <div v-if="mimeType !== null" class="viewer full-size">
            <kml-viewer
                v-if="mimeType === 'application/vnd.google-earth.kml+xml'"
                :file-md5="fileMd5"
                @finished="loading = false"
            />
            <markdown-viewer
                v-else-if="mimeType === 'text/x-web-markdown'"
                :file-md5="fileMd5"
                @finished="loading = false"
            />
            <dxf-viewer
                v-else-if="mimeType.startsWith('image/vnd.dxf')"
                :file-md5="fileMd5"
                @finished="loading = false"
            />
            <plain-text-viewer
                v-else-if="mimeType.startsWith('text/')"
                :file-md5="fileMd5"
                @finished="loading = false"
            />
            <json-boxed-viewer
                v-else-if="mimeType.startsWith('application/json')"
                :file-md5="fileMd5"
                @finished="loading = false"
            />
            <sphere-image-viewer
                v-else-if="mimeType.startsWith('image/') && sphere"
                :file-md5="fileMd5"
                @finished="loading = false"
            />
            <image-viewer
                v-else-if="mimeType.startsWith('image/')"
                :file-md5="fileMd5"
                @finished="loading = false"
            />
            <video-viewer
                v-else-if="mimeType.startsWith('video/')"
                :file-md5="fileMd5"
                @finished="loading = false"
            />
            <audio-viewer
                v-else-if="mimeType.startsWith('audio/')"
                :file-md5="fileMd5"
                @finished="loading = false"
            />
            <three-d-model-viewer
                v-else-if="modelMimeTypes.includes(mimeType)"
                :file-md5="fileMd5"
                :filename="filename"
                :mime-type="mimeType"
                @finished="loading = false"
            />
            <office-viewer
                v-else-if="officeMimeTypes.includes(mimeType)"
                :file-md5="fileMd5"
                :filename="filename"
                @finished="loading = false"
            />
            <unknown-viewer v-else @finished="loading = false" />
        </div>
        <div
            v-else-if="mimeType === ''"
            class="not-exist flex-center full-size"
        >
            <img src="https://assets.changtech.cn/image/file-not-exist.jpg" />
        </div>
    </n-spin>
</template>

<style lang="less" scoped>
.not-exist {
    > img {
        height: 100%;
    }
}
</style>
