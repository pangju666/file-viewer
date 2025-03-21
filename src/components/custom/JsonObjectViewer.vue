<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import JsonViewer from "vue-json-viewer";
import "vue-json-viewer/style.css";

const props = defineProps({
    fileUrl: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["finished"]);

const content = ref(null);

onMounted(async () => {
    content.value = (
        await axios.get(props.fileUrl, {
            responseType: "json",
        })
    ).data;
    emits("finished");
});
</script>

<template>
    <div class="json-viewer">
        <json-viewer
            :value="content"
            copyable
            :expand-depth="10"
            expanded
            show-double-quotes
            show-array-index
        />
    </div>
</template>

<style scoped lang="less">
.json-viewer {
    width: 100%;
    height: 100%;
    text-align: left;
}
</style>
