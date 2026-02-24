<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  downloadFile,
  formatFileSize,
  formatFileType,
  getResult,
} from "@/utils/utils.ts";
import { NEllipsis } from "naive-ui";

const props = defineProps<{
  onLoad: (page?: number, pageSize?: number) => Promise<any> | any;
}>();

const emits = defineEmits<{
  (e: "click-file", file: any): void;
}>();

onMounted(() => {
  handleLoad();
});

const loading = ref(false);
const noMore = ref(false);
const fileList = ref<any[]>([]);

const handleLoad = async () => {
  if (loading.value || noMore.value) {
    return;
  }
  loading.value = true;
  const result = await getResult(props.onLoad);
  if (!Array.isArray(result) || result.length === 0) {
    noMore.value = true;
  } else {
    fileList.value.push(...result);
  }
  loading.value = false;
};
const onClickDownload = (file: any) => {
  downloadFile(file.src, "");
};
</script>

<template>
  <n-infinite-scroll class="h-100 p-15" :distance="10" @load="handleLoad">
    <n-card
      v-for="(file, i) in fileList"
      :key="i"
      class="file-card"
      hoverable
      embedded
      size="small"
      :segmented="{
        content: true,
        footer: true,
        action: true,
      }"
      @click="emits('click-file', file)"
    >
      <template v-if="file?.filename" #header>
        <div class="mr-10">
          <n-ellipsis>
            {{ file?.filename }}
          </n-ellipsis>
        </div>
      </template>
      <template v-if="file.type || file.mimeType" #header-extra>
        <n-tag :bordered="false" type="info" size="small">
          {{ file.type ?? formatFileType(file.mimeType) }}
        </n-tag>
      </template>
      <template v-if="file.cover" #cover>
        <div style="max-height: 120px" class="p-10">
          <n-image lazy preview-disabled object-fit="cover" :src="file.cover" />
        </div>
      </template>
      <template v-if="file.createTime || file.fileSize" #footer>
        <div v-if="file.createTime" class="flex-space-between">
          <n-time :time="file.createTime" />
          <div v-if="file.fileSize">
            {{ formatFileSize(file.fileSize) }}
          </div>
        </div>
      </template>
      <template #action>
        <n-button
          size="tiny"
          class="mr-10"
          type="info"
          @click.stop="emits('click-file', file)"
          >查看</n-button
        >
        <n-button size="tiny" type="success" @click.stop="onClickDownload(file)"
          >下载</n-button
        >
      </template>
      <template v-if="file?.descriptions" #default>
        <div class="file-descriptions">
          <div
            v-for="(description, j) in file?.descriptions"
            :key="j"
            class="file-description-item"
          >
            <div class="file-description-item-name">
              {{ description.name }}
            </div>
            <n-ellipsis>
              {{ description.value }}
            </n-ellipsis>
          </div>
        </div>
      </template>
    </n-card>
    <n-spin v-if="loading" class="flex-center">
      <template #description> 加载中... </template>
    </n-spin>
    <n-empty
      v-if="fileList.length === 0 && !loading"
      class="h-100 flex-center"
      description="文件列表为空"
    >
    </n-empty>
    <div v-if="noMore" class="h-center">没有更多了 🤪</div>
    <n-back-top :right="20" style="z-index: 100" />
  </n-infinite-scroll>
</template>

<style scoped lang="less">
.file-card {
  margin-bottom: 10px;
}

.file-descriptions {
  display: flex;
  flex-direction: column;

  .file-description-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .file-description-item-name {
      font-weight: bold;
      text-wrap: nowrap;
      margin-right: 15px;
    }
  }
}
</style>
