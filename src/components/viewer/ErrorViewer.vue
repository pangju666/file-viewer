<script lang="ts" setup>
import "@/assets/css/file-viewer.css";

withDefaults(
  defineProps<{
    reason?: string;
    filename?: string;
    src?: string;
    mimeType?: string;
  }>(),
  {
    reason: "文件预览失败",
    filename: undefined,
    src: undefined,
    mimeType: undefined,
  },
);
</script>

<template>
  <div class="pangju-flex-center">
    <n-result status="500" size="huge" :title="reason" class="error-viewer">
      <div class="descriptions">
        <div v-show="filename" class="description-item">
          <div class="title">文件名称：</div>
          <n-ellipsis>
            {{ filename }}
          </n-ellipsis>
        </div>
        <div v-show="mimeType" class="description-item">
          <div class="title">文件类型：</div>
          <n-ellipsis>{{ mimeType }}</n-ellipsis>
        </div>
        <div v-show="src" class="description-item">
          <div class="title">文件链接：</div>
          <n-ellipsis class="pangju-w-100">
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
.error-viewer {
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
        width: 80px;
        font-weight: bold;
        word-break: keep-all;
      }
    }
  }
}
</style>
