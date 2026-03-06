<script lang="ts" setup>
import { onMounted } from "vue";

const emits = defineEmits<{
  (e: "ready"): void;
}>();

onMounted(() => {
  emits("ready");
});
</script>

<template>
  <div class="not-support flex-center full-size">
    <img src="@/assets/images/not-support-preview.png" alt="" />
  </div>
</template>

<style scoped lang="less">
.not-support {
  > img {
    height: 100%;
  }
}
</style>
