<script lang="ts" setup>
import { computed, onMounted, watch, ref } from "vue";
import { downloadFile, formatFileSize, getResult } from "@/utils/utils.ts";
import { NEllipsis } from "naive-ui";
import type { FileItem } from "@/types/file.ts";
import { SearchRound } from "@vicons/material";
import type { FileItemListProps } from "@/types/viewer.ts";
import "@/assets/css/pangju.css";

const props = withDefaults(defineProps<FileItemListProps>(), {
  title: "文件列表",
  showSkeleton: true,
  showBackTop: true,
  showSearch: true,
  showTitle: true,
  coverHeight: 150,
  coverObjectFit: "fill",
  showTypeFilter: true,
  fileTypes: () => [],
  staticFileList: () => [],
  load: undefined,
  fileMatcher: undefined,
  noMore: undefined,
});

const emits = defineEmits<{
  (e: "click-file", file: FileItem): void;
}>();

const currentPage = ref<number>(1);
const loading = ref<boolean>(false);
const fileItemList = ref<FileItem[]>([]);
const internalNoMore = ref<boolean>(false);

const inputValue = ref<string>();
const selectFileTypes = ref<string[]>([]);

const isEmpty = computed(
  () => fileItemList.value.length === 0 && !loading.value,
);

const isNoMore = computed(() => {
  if (!props.load) {
    return true;
  }
  if (props.noMore != null) {
    return props.noMore;
  }
  return internalNoMore.value;
});

const fileTypeOptions = computed(() =>
  props.fileTypes.map((item) => ({ label: item, value: item })),
);

onMounted(() => {
  if (!props.load) {
    fileItemList.value = props.staticFileList ?? [];
  } else {
    internalNoMore.value = false;
    loadFileList(inputValue.value, selectFileTypes.value, true);
  }
});

watch(
  () => selectFileTypes.value,
  (val) => {
    if (!props.load) {
      filterStaticFileList(inputValue.value, val);
    } else {
      loadFileList(inputValue.value, val, true);
    }
  },
);

const loadFileList = async (
  keyword?: string,
  types?: string[],
  reset = false,
) => {
  if (!props.load) {
    return;
  }
  if (!reset && loading.value) {
    return;
  }
  if (!reset && isNoMore.value) {
    return;
  }

  if (reset) {
    fileItemList.value = [];
    currentPage.value = 1;
    internalNoMore.value = false;
  }

  loading.value = true;
  try {
    const result = await getResult(
      props.load(currentPage.value, types, keyword),
    );

    if (result.length === 0) {
      internalNoMore.value = true;
    } else {
      fileItemList.value.push(...result);
      ++currentPage.value;
    }
  } catch (e) {
    if (reset) {
      fileItemList.value = [];
    }
    throw e;
  } finally {
    loading.value = false;
  }
};

const searchFileList = () => {
  if (!props.load) {
    filterStaticFileList(inputValue.value, selectFileTypes.value);
  } else {
    loadFileList(inputValue.value, selectFileTypes.value, true);
  }
};

const filterStaticFileList = (keyword?: string, types?: string[]) => {
  fileItemList.value = (props.staticFileList ?? []).filter((item) => {
    if (!props.fileMatcher) {
      let flag = true;
      if (keyword) {
        flag = item.filename?.includes(keyword) ?? false;
      }
      if (types && types.length > 0) {
        flag = types.includes(item.type ?? "");
      }
      return flag;
    }
    return props.fileMatcher(item, types, keyword);
  });
};

const handleScrollLoad = () => {
  if (isNoMore.value || !props.load || loading.value) {
    return;
  }
  loadFileList(inputValue.value, selectFileTypes.value, false);
};

const handleClickDownload = (fileUrl: string, filename?: string) => {
  downloadFile(fileUrl, filename ?? "");
};
</script>

<template>
  <div class="container">
    <slot name="title">
      <div v-if="showTitle" class="title">{{ title }}</div>
    </slot>
    <slot name="search">
      <div v-if="showSearch" class="search-input">
        <n-input
          v-model:value="inputValue"
          round
          placeholder="请输入文件名"
          @keydown.enter="searchFileList"
        >
          <template #suffix>
            <n-icon
              :size="24"
              class="pangju-cursor-pointer"
              @click="searchFileList"
            >
              <SearchRound />
            </n-icon>
          </template>
        </n-input>
      </div>
    </slot>
    <slot name="types">
      <div v-if="showTypeFilter" class="type-select">
        <n-select
          v-model:value="selectFileTypes"
          multiple
          placeholder="请选择文件类型"
          :options="fileTypeOptions"
        />
      </div>
    </slot>
    <div class="file-card-list">
      <n-infinite-scroll
        class="pangju-h-100"
        :distance="10"
        @load="handleScrollLoad"
      >
        <slot name="file-item" :file-list="fileItemList">
          <n-card
            v-for="(fileItem, i) in fileItemList"
            :key="i"
            class="file-card pangju-cursor-pointer"
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
            <template #header>
              <slot name="file-card-header" :file-item="fileItem">
                <div v-if="fileItem?.name" class="pangju-mr-10">
                  <n-ellipsis>
                    {{ fileItem?.name ?? fileItem.filename }}
                  </n-ellipsis>
                </div>
              </slot>
            </template>
            <template #header-extra>
              <slot name="file-card-header-extra" :file-item="fileItem">
                <n-tag
                  v-if="fileItem.type"
                  :bordered="false"
                  type="info"
                  size="small"
                >
                  {{ fileItem.type }}
                </n-tag>
              </slot>
            </template>
            <template #cover>
              <slot name="file-card-cover" :file-item="fileItem">
                <div v-if="fileItem.cover" class="pangju-p-10 pangju-h-center">
                  <n-image
                    lazy
                    preview-disabled
                    :object-fit="coverObjectFit"
                    :height="coverHeight"
                    :src="fileItem.cover"
                  />
                </div>
              </slot>
            </template>
            <template #footer>
              <slot name="file-card-footer" :file-item="fileItem">
                <div
                  v-if="fileItem.createTime || fileItem.size"
                  class="pangju-flex-space-between"
                >
                  <n-time
                    v-if="fileItem.createTime"
                    :time="fileItem.createTime"
                  />
                  <div v-if="fileItem.size">
                    {{ formatFileSize(fileItem.size) }}
                  </div>
                </div>
              </slot>
            </template>
            <template #action>
              <slot name="file-card-action" :file-item="fileItem">
                <n-button
                  size="tiny"
                  class="pangju-mr-10"
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
                <slot name="file-card-action-extra" :file-item="fileItem">
                </slot>
              </slot>
            </template>
            <template #default>
              <slot name="file-card-default" :file-item="fileItem">
                <div v-if="fileItem?.descriptions" class="file-descriptions">
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
              </slot>
            </template>
          </n-card>
        </slot>
        <slot name="loading" :loading="loading">
          <n-spin v-if="loading && !showSkeleton" class="pangju-flex-center">
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
              <div class="pangju-flex">
                <n-skeleton width="30px" class="pangju-mr-10"> </n-skeleton>
                <n-skeleton width="30px"> </n-skeleton>
              </div>
            </template>
            <template #default>
              <n-skeleton class="pangju-mb-5"> </n-skeleton>
              <n-skeleton class="pangju-mb-5"> </n-skeleton>
              <n-skeleton> </n-skeleton>
            </template>
          </n-card>
        </slot>
        <slot name="empty" :is-empty="isEmpty">
          <n-empty
            v-if="isEmpty"
            class="pangju-h-100 pangju-flex-center"
            description="文件列表为空"
          >
          </n-empty>
        </slot>
        <slot name="noMore">
          <div v-if="isNoMore" class="pangju-h-center">没有更多了</div>
        </slot>
        <slot name="backTop">
          <n-back-top v-if="showBackTop" :right="20" style="z-index: 9999" />
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
