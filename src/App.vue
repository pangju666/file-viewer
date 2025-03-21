<template>
    <n-config-provider
        :date-locale="dateZhCN"
        :locale="zhCN"
        :theme-overrides="{ common: { fontWeightStrong: '600' } }"
        class="full-size"
    >
        <n-notification-provider>
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </n-notification-provider>
    </n-config-provider>
</template>

<script setup>
import { dateZhCN, zhCN } from "naive-ui";
import "@/assets/css/pangju.less";
</script>

<style lang="less"></style>
