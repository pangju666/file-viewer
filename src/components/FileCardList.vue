<script lang="ts" setup>
import { computed, onMounted, watch, ref } from "vue";
import { downloadFile, formatFileSize, getResult } from "@/utils/utils.ts";
import { NEllipsis } from "naive-ui";
import type { FileItem } from "@/types/file.ts";
import { SearchRound } from "@vicons/material";

const props = withDefaults(
  defineProps<{
    showSkeleton?: boolean;
    showBackTop?: boolean;
    showSearch?: boolean;
    showTitle?: boolean;
    showTypeFilter?: boolean;
    coverHeight?: number | string;
    coverObjectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
    fileTypes?: string[];
    onLoad: (
      page: number,
      types?: string[],
      keyword?: string,
    ) => Promise<FileItem[]> | FileItem[];
    noMore: boolean;
  }>(),
  {
    showSkeleton: true,
    showBackTop: true,
    showSearch: true,
    showTitle: true,
    coverHeight: 150,
    coverObjectFit: "fill",
    showTypeFilter: true,
    fileTypes: () => [],
  },
);

const emits = defineEmits<{
  (e: "click-file", file: FileItem): void;
}>();

const currentPage = ref<number>(1);
const loading = ref<boolean>(false);
const fileItemList = ref<FileItem[]>([]);

const inputValue = ref<string>();
const selectFileTypes = ref<string[]>([]);

const isEmpty = computed(
  () => fileItemList.value.length === 0 && !loading.value,
);

const fileTypeOptions = computed(() =>
  props.fileTypes.map((item) => ({ label: item, value: item })),
);

onMounted(() => {
  loadFileList(inputValue.value, selectFileTypes.value, true);
});

watch(
  () => selectFileTypes.value,
  (val) => {
    loadFileList(inputValue.value, val, true);
  },
);

const loadFileList = async (
  keyword?: string,
  types?: string[],
  reset = false,
) => {
  if (reset) {
    fileItemList.value = [];
    currentPage.value = 1;
  }

  if (!reset && loading.value) {
    return;
  }

  loading.value = true;

  try {
    const result = await getResult(
      props.onLoad(currentPage.value, types, keyword),
    );

    fileItemList.value.push(...result);
    ++currentPage.value;
  } catch (e) {
    if (reset) {
      fileItemList.value = [];
    }
    throw e;
  } finally {
    loading.value = false;
  }
};

const searchFileList = (keyword?: string, types?: string[]) => {
  loadFileList(keyword, types, true);
};

const handleScrollLoad = () => {
  loadFileList(inputValue.value, selectFileTypes.value, false);
};

const handleClickDownload = (fileUrl: string, filename?: string) => {
  downloadFile(fileUrl, filename ?? "");
};

defineExpose({
  searchFileList,
});
</script>

<template>
  <div class="container">
    <div v-if="showTitle" class="title">
      <slot name="title">文件列表</slot>
    </div>
    <div v-if="showSearch" class="search-input">
      <slot name="search">
        <n-input
          v-model:value="inputValue"
          round
          placeholder="请输入文件名"
          @keydown.enter="searchFileList(inputValue, selectFileTypes)"
        >
          <template #suffix>
            <n-icon
              :size="24"
              class="cursor-pointer"
              @click="searchFileList(inputValue, selectFileTypes)"
            >
              <SearchRound />
            </n-icon>
          </template>
        </n-input>
      </slot>
    </div>
    <div v-if="showTypeFilter" class="type-select">
      <slot name="types">
        <n-select
          v-model:value="selectFileTypes"
          multiple
          placeholder="请选择文件类型"
          :options="fileTypeOptions"
        />
      </slot>
    </div>
    <div class="file-card-list">
      <n-infinite-scroll class="h-100" :distance="10" @load="handleScrollLoad">
        <slot name="file-card" :file-list="fileItemList">
          <n-card
            v-for="(fileItem, i) in fileItemList"
            :key="i"
            class="file-card cursor-pointer"
            hoverable
            embedded
            size="small"
            :segmented="{
              content: true,
              footer: true,
              action: true,
            }"
            @click="emits('click-file', fileItem)"
          >
            <template v-if="fileItem?.name" #header>
              <div class="mr-10">
                <n-ellipsis>
                  {{ fileItem?.name ?? fileItem.filename }}
                </n-ellipsis>
              </div>
            </template>
            <template v-if="fileItem.type" #header-extra>
              <n-tag :bordered="false" type="info" size="small">
                {{ fileItem.type }}
              </n-tag>
            </template>
            <template v-if="fileItem.cover" #cover>
              <div class="p-10 h-center">
                <n-image
                  lazy
                  preview-disabled
                  :object-fit="coverObjectFit"
                  :height="coverHeight"
                  :src="fileItem.cover"
                />
              </div>
            </template>
            <template v-if="fileItem.createTime || fileItem.size" #footer>
              <div v-if="fileItem.createTime" class="flex-space-between">
                <n-time :time="fileItem.createTime" />
                <div v-if="fileItem.size">
                  {{ formatFileSize(fileItem.size) }}
                </div>
              </div>
            </template>
            <template #action>
              <n-button
                size="tiny"
                class="mr-10"
                type="info"
                @click.stop="emits('click-file', fileItem)"
                >查看</n-button
              >
              <n-button
                size="tiny"
                type="success"
                @click.stop="handleClickDownload(fileItem.url, fileItem.name)"
                >下载</n-button
              >
            </template>
            <template v-if="fileItem?.descriptions" #default>
              <div class="file-descriptions">
                <div
                  v-for="(description, j) in fileItem?.descriptions"
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
        </slot>
        <slot name="loading" :loading="loading">
          <n-spin v-if="loading && !showSkeleton" class="flex-center">
            <template #description> 加载中... </template>
          </n-spin>
          <n-card
            v-if="loading && showSkeleton"
            embedded
            size="small"
            :segmented="{
              content: true,
              footer: true,
              action: true,
            }"
          >
            <template #header>
              <n-skeleton width="90%"> </n-skeleton>
            </template>
            <template #header-extra>
              <n-skeleton width="50px"> </n-skeleton>
            </template>
            <template #cover>
              <n-skeleton :height="coverHeight"> </n-skeleton>
            </template>
            <template #footer>
              <n-skeleton> </n-skeleton>
            </template>
            <template #action>
              <div class="display-flex">
                <n-skeleton width="30px" class="mr-10"> </n-skeleton>
                <n-skeleton width="30px"> </n-skeleton>
              </div>
            </template>
            <template #default>
              <n-skeleton class="mb-5"> </n-skeleton>
              <n-skeleton class="mb-5"> </n-skeleton>
              <n-skeleton> </n-skeleton>
            </template>
          </n-card>
        </slot>
        <slot name="empty" :is-empty="isEmpty">
          <n-empty
            v-if="isEmpty"
            class="h-100 flex-center"
            description="文件列表为空"
          >
          </n-empty>
        </slot>
        <slot name="noMore">
          <div v-if="noMore" class="h-center">没有更多了</div>
        </slot>
        <slot name="backTop">
          <n-back-top v-if="showBackTop" :right="20" style="z-index: 100" />
        </slot>
      </n-infinite-scroll>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  padding: 5px 10px;
  height: 100%;
  flex-direction: column;
  box-sizing: border-box;
  gap: 16px;

  .title {
    font-size: 24px;
    line-height: 30px;
    font-weight: bold;
    color: #333;
    flex-shrink: 0;
  }

  .search-input {
    flex-shrink: 0;
  }

  .type-select {
    flex-shrink: 0;
  }

  .file-card-list {
    flex: 1;
    min-height: 550px;

    .file-card {
      margin-bottom: 10px;

      .file-descriptions {
        display: flex;
        flex-direction: column;
        gap: 5px;

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
    }
  }
}
</style>
