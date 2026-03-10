<script lang="ts" setup>
withDefaults(
  defineProps<{
    reason?: string;
    filename?: string;
    url?: string;
    type?: string;
  }>(),
  {
    reason: "文件不支持预览",
    filename: undefined,
    url: undefined,
    type: undefined,
  },
);
</script>

<template>
  <div class="flex-center full-size">
    <n-result status="500" size="huge" :title="reason" class="w-100">
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
.descriptions {
  margin: 0 auto;
  width: 80%;
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
</style>
