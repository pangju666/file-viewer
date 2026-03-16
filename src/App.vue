<template>
  <n-config-provider
    :date-locale="dateZhCN"
    :locale="zhCN"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
    class="pangju-wh-100"
  >
    <router-view />
  </n-config-provider>
</template>

<script lang="ts" setup>
import { dateZhCN, zhCN } from "naive-ui";
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
