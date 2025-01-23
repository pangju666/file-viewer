<script setup>
import { FileApi } from "@/apis/FileApi.js";

const props = defineProps({
    fileMd5: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["finished"]);
</script>

<template>
    <div class="image-viewer">
        <n-image
            :src="FileApi.getImagePreviewUrl(props.fileMd5)"
            :preview-src="FileApi.getDownloadUrl(props.fileMd5)"
            object-fit="scale-down"
            :on-load="emits('finished')"
        />
    </div>
</template>

<style scoped lang="less">
.image-viewer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
