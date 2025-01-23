<script setup>
import { FileApi } from "@/apis/FileApi.js";
import { onMounted, ref } from "vue";
import { get, getDownload } from "@/apis/base.js";

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
    const data = (await getDownload(fileUrl)).data;
    const reader = new FileReader();
    reader.readAsText(data, "utf-8");
    reader.onload = () => {
        content.value = reader.result;
        emits("finished");
    };
});
</script>

<template>
    <div class="plain-text-viewer">
        <pre>{{ content }}</pre>
    </div>
</template>

<style scoped lang="less">
.plain-text-viewer {
    padding: 10px;
    width: 100%;
    height: 100%;

    > pre {
        font-size: 16px;
        text-align: left;
    }
}
</style>
