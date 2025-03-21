<script setup>
defineProps({
    fileUrl: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["finished"]);
</script>

<template>
    <div class="image-viewer">
        <n-image
            :src="fileUrl"
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
