<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    filename?: string;
  }>(),
  {
    filename: undefined,
    src: undefined,
  },
);

const description = computed(() =>
  props.filename ? `文件：${props.filename}` : "",
);
</script>

<template>
  <div class="flex-center full-size">
    <n-result
      status="500"
      size="huge"
      title="文件不支持预览"
      :description="description"
    >
    </n-result>
  </div>
</template>

<style scoped lang="less"></style>
