<script setup>
import { FileApi } from "@/apis/FileApi.js";
import { onMounted, ref } from "vue";

const props = defineProps({
    fileMd5: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["finished"]);

const fileUrl = ref(null);

onMounted(async () => {
    fileUrl.value = FileApi.getDownloadUrl(props.fileMd5);
    emits("finished");
});
</script>

<template>
    <div class="audio-viewer">
        <audio controls autoplay :src="fileUrl"></audio>
    </div>
</template>

<style scoped lang="less">
.audio-viewer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
