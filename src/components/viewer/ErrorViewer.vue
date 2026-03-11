<script lang="ts" setup>
withDefaults(
  defineProps<{
    reason?: string;
    filename?: string;
    url?: string;
    mimeType?: string;
  }>(),
  {
    reason: "文件预览失败",
    filename: undefined,
    url: undefined,
    mimeType: undefined,
  },
);
</script>

<template>
  <div class="flex-center full-size">
    <n-result status="500" size="huge" :title="reason" class="error-viewer">
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
        <div v-show="url" class="description-item">
          <div class="title">链&nbsp;&nbsp;&nbsp;接：</div>
          <n-ellipsis class="w-100">
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
.error-viewer {
  padding: 0 15px;
  max-width: 100%;

  .descriptions {
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
