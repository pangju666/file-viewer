<script lang="ts" setup>
import "@/assets/css/file-viewer.css";
import { watch } from "vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    filename?: string;
    src?: string;
    mimeType?: string;
  }>(),
  {
    src: undefined,
    title: "不支持预览该文件",
    filename: undefined,
    mimeType: undefined,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

watch(
  () => props.src,
  () => emits("ready"),
  { immediate: true },
);
</script>

<template>
  <div class="pangju-flex-center">
    <n-result status="403" size="huge" :title="title" class="unknown-viewer">
      <div class="descriptions">
        <div v-show="filename" class="description-item">
          <div class="title">文件名：</div>
          <n-ellipsis>
            {{ filename }}
          </n-ellipsis>
        </div>
        <div v-show="mimeType" class="description-item">
          <div class="title">类&nbsp;&nbsp;&nbsp;型：</div>
          <n-ellipsis>{{ mimeType }}</n-ellipsis>
        </div>
        <div v-show="src" class="description-item">
          <div class="title">链&nbsp;&nbsp;&nbsp;接：</div>
          <n-ellipsis>
            <a :href="src" target="_blank">
              {{ src }}
            </a>
          </n-ellipsis>
        </div>
      </div>
    </n-result>
  </div>
</template>

<style lang="less" scoped>
.unknown-viewer {
  padding: 0 15px;
  max-width: 100%;

  .descriptions {
    margin: 0 auto;
    max-width: 80%;
    font-size: 16px;

    .description-item {
      display: flex;
      margin-bottom: 15px;

      .title {
        width: 65px;
        font-weight: bold;
        word-break: keep-all;
      }
    }
  }
}
</style>
