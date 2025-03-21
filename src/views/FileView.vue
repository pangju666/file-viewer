<script setup>
import { onMounted, ref } from "vue";
import DxfViewer from "@/components/custom/DxfViewer.vue";
import VideoViewer from "@/components/custom/VideoViewer.vue";
import AudioViewer from "@/components/custom/AudioViewer.vue";
import PlainTextViewer from "@/components/custom/PlainTextViewer.vue";
import MarkdownViewer from "@/components/custom/MarkdownViewer.vue";
import KmlViewer from "@/components/custom/KmlViewer.vue";
import ImageViewer from "@/components/custom/ImageViewer.vue";
import JsonObjectViewer from "@/components/custom/JsonObjectViewer.vue";
import Model3DViewer from "@/components/custom/Model3DViewer.vue";
import UnknownViewer from "@/components/custom/UnknownViewer.vue";
import SphereImageViewer from "@/components/custom/SphereImageViewer.vue";
import { useRoute } from "vue-router";
import OfficeViewer from "@/components/custom/OfficeViewer.vue";
import { StringUtils } from "pangju-utils";
import { fileTypeFromBlob } from "file-type";
import axios from "axios";

const route = useRoute();

const unSupportMimeTypes = [
    "image/vnd.dwg",
    "image/tiff",
    "image/x-raw-nikon",
    "image/x-raw-adobe",
    "model/fbx",
];
const officeMimeTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/msword",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint",
];
const audioMimeTypes = [
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/x-aac",
    "audio/x-flac",
];
const videoMimeTypes = ["video/mp4", "video/ogg", "video/webm"];
const modelMimeTypes = ["model/obj", "model/gltf-binary", "model/x.stl-binary"];

const loading = ref(true);
const fileUrl = ref(null);
const mimeType = ref(null);
const filename = ref(null);
const sphere = ref(false);

onMounted(async () => {
    loading.value = true;

    fileUrl.value = route.query?.url;
    if (StringUtils.isNotBlank(filename.value)) {
        loading.value = false;
        return;
    }
    fileUrl.value = decodeURIComponent(fileUrl.value);

    mimeType.value = route.query?.type;
    if (StringUtils.isBlank(fileUrl, mimeType)) {
        mimeType.value = (
            await fileTypeFromBlob(
                axios.get(fileUrl.value, { responseType: "blob" }),
            )
        ).mime;
    }
    mimeType.value = decodeURIComponent(mimeType.value);

    filename.value = route.query?.name;
    if (StringUtils.isNotBlank(filename.value)) {
        document.title = filename.value;
        filename.value = decodeURIComponent(filename.value);
    }

    sphere.value = route.query?.sphere ?? false;
    if (unSupportMimeTypes.includes(mimeType.value)) {
        loading.value = false;
    }

    // 需要自己部署pdfjs服务
    /*if (mimeType.value === "application/pdf") {
        location.href = `${
            import.meta.env.VITE_PDF_VIEWER_URL
        }?file=${encodeURIComponent(fileUrl.value)}`;
    }*/
});
</script>

<template>
    <n-spin
        :show="loading"
        description="正在加载中"
        class="h-center h-100"
        content-class="full-size"
    >
        <div
            v-if="StringUtils.isNoneEmpty(fileUrl, mimeType)"
            class="viewer full-size"
        >
            <unknown-viewer
                v-if="unSupportMimeTypes.includes(mimeType)"
                @finished="loading = false"
            />
            <kml-viewer
                v-else-if="mimeType === 'application/vnd.google-earth.kml+xml'"
                :file-url="fileUrl"
                @finished="loading = false"
            />
            <markdown-viewer
                v-else-if="mimeType === 'text/x-web-markdown'"
                :file-url="fileUrl"
                @finished="loading = false"
            />
            <dxf-viewer
                v-else-if="mimeType.startsWith('image/vnd.dxf')"
                :file-url="fileUrl"
                @finished="loading = false"
            />
            <plain-text-viewer
                v-else-if="mimeType.startsWith('text/')"
                :file-url="fileUrl"
                @finished="loading = false"
            />
            <json-object-viewer
                v-else-if="mimeType.startsWith('application/json')"
                :file-url="fileUrl"
                @finished="loading = false"
            />
            <sphere-image-viewer
                v-else-if="mimeType.startsWith('image/') && sphere"
                :file-url="fileUrl"
                @finished="loading = false"
            />
            <image-viewer
                v-else-if="mimeType.startsWith('image/')"
                :file-url="fileUrl"
                @finished="loading = false"
            />
            <video-viewer
                v-else-if="videoMimeTypes.includes(mimeType)"
                :file-url="fileUrl"
                @finished="loading = false"
            />
            <audio-viewer
                v-else-if="audioMimeTypes.includes(mimeType)"
                :file-url="fileUrl"
                @finished="loading = false"
            />
            <Model3DViewer
                v-else-if="modelMimeTypes.includes(mimeType)"
                :file-url="fileUrl"
                :filename="filename"
                :mime-type="mimeType"
                @finished="loading = false"
            />
            <office-viewer
                v-else-if="officeMimeTypes.includes(mimeType)"
                :file-url="fileUrl"
                :mime-type="mimeType"
                :filename="filename"
                @finished="loading = false"
            />
            <unknown-viewer v-else @finished="loading = false" />
        </div>
        <div v-else class="not-exist flex-center full-size">
            <img src="@/assets/images/file-not-exist.jpg" />
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
