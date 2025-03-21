<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

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
