<script setup>
import { FileApi } from "@/apis/FileApi.js";
import { onMounted, ref } from "vue";
import axios from "axios";
import { JsonViewer } from "vue3-json-viewer";
import { get } from "@/apis/base.js";

const props = defineProps({
    fileMd5: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["finished"]);

const content = ref(null);

onMounted(async () => {
    const fileUrl = await get(FileApi.getDownloadUrl(props.fileMd5, false));
    content.value = (await axios.get(fileUrl)).data;
    emits("finished");
});
</script>

<template>
    <div class="image-viewer">
        <json-viewer :value="content" copyable boxed />
    </div>
</template>

<style scoped lang="less">
.image-viewer {
    width: 100%;
    height: 100%;
}
</style>
