<script setup>
defineProps({
    fileUrl: {
        type: String,
        required: true,
    },
});

defineEmits(["finished"]);
</script>

<template>
    <div class="audio-viewer">
        <audio
            controls
            autoplay
            :src="fileUrl"
            @loadeddata="$emit('finished')"
        ></audio>
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
