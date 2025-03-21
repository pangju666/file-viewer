<script setup>
import { mavonEditor } from "mavon-editor";
import { onMounted, ref } from "vue";
import axios from "axios";
import "mavon-editor/dist/css/index.css";

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
            responseType: "text",
        })
    ).data;
    emits("finished");
});
</script>

<template>
    <div class="markdown-viewer">
        <mavon-editor
            v-model="content"
            :subfield="false"
            default-open="preview"
            :editable="false"
            :toolbars-flag="false"
        />
    </div>
</template>

<style scoped lang="less">
.markdown-viewer {
    width: 100%;
    height: 100%;
}
</style>
