<script lang="ts" setup>
import "@/assets/css/file-viewer.css";
import { type } from "node:os";

withDefaults(
  defineProps<{
    title?: string;
    filename?: string;
    url?: string;
    mimeType?: string;
  }>(),
  {
    title: "不支持预览该文件",
    filename: undefined,
    url: undefined,
    mimeType: undefined,
  },
);
</script>

<template>
  <div class="pangju-flex-center pangju-wh-100">
    <n-result status="403" size="huge" :title="title" class="unknown-viewer">
      <div class="descriptions">
        <div v-show="filename" class="description-item">
          <div class="title">文件名：</div>
          <n-ellipsis>
            {{ filename }}
          </n-ellipsis>
        </div>
        <div v-show="type" class="description-item">
          <div class="title">类&nbsp;&nbsp;&nbsp;型：</div>
          <n-ellipsis>{{ type }}</n-ellipsis>
        </div>
        <div v-show="url" class="description-item">
          <div class="title">链&nbsp;&nbsp;&nbsp;接：</div>
          <n-ellipsis>
            <a :href="url" target="_blank">
              {{ url }}
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
