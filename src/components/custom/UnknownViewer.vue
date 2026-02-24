<script lang="ts" setup>
import { onMounted } from "vue";

const emits = defineEmits<{
  (e: "finished"): void;
}>();

onMounted(() => {
  emits("finished");
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
