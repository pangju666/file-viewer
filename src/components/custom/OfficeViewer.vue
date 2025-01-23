<script setup>
import { onMounted } from "vue";
import { StringUtils } from "pangju-utils";
import { get } from "@/apis/base.js";
import { FileApi } from "@/apis/FileApi.js";

const props = defineProps({
    fileMd5: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["finished"]);

onMounted(async () => {
    // 配置文档查看器
    const baseName = StringUtils.substringBeforeLast(props.filename, ".");
    const extension = StringUtils.substringAfterLast(props.filename, ".");
    const url = await get(FileApi.getDownloadUrl(props.fileMd5, false)); // 文档的URL

    let documentType = null;
    switch (props.mimeType) {
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        case "application/msword":
            documentType = "word";
            break;
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        case "application/vnd.ms-excel":
            documentType = "cell";
            break;
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        case "application/vnd.ms-powerpoint":
            documentType = "slide";
            break;
    }

    // eslint-disable-next-line no-undef
    window.docEditor = new DocsAPI.DocEditor("only-office-container", {
        documentType: documentType,
        type: "desktop",
        height: "100%",
        width: "100%",
        document: {
            fileType: extension,
            key: props.fileMd5,
            title: baseName,
            url: url,
            permissions: {
                copy: true,
                download: true,
                print: true,
            },
        },
        editorConfig: {
            customization: {
                anonymous: {
                    request: false,
                },
                chat: false,
                comments: false,
            },
            lang: "zh",
            mode: "view",
        },
    });

    emits("finished");
});
</script>

<template>
    <div id="only-office-container"></div>
</template>
