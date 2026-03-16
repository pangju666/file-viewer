<script lang="ts" setup>
import { computed, onMounted, watch, ref } from "vue";
import { downloadFile, formatFileSize, getResult } from "@/utils/utils.ts";
import type { FileItem, FileTag, FileType } from "@/types/file.ts";
import { SearchRound } from "@vicons/material";
import type { FileListProps } from "@/types/options.ts";
import "@/assets/css/file-viewer.css";

const props = withDefaults(defineProps<FileListProps>(), {
  title: "文件列表",
  showSkeleton: true,
  showBackTop: true,
  showSearch: true,
  showTitle: true,
  coverHeight: 150,
  coverObjectFit: "fill",
  showTypeFilter: true,
  fileTypes: undefined,
  cardSize: "small",
  cardHoverable: true,
  cardBordered: true,
  tagSize: "small",
  fileItems: () => [],
  load: undefined,
  fileMatcher: undefined,
  noMore: undefined,
  customDownload: undefined,
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
const fileTypesOptions = ref<{ label: string; value: string }[]>([]);

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

watch(
  () => props.fileTypes,
  async (newVal) => {
    if (newVal) {
      const fileLabels = await getResult<FileType[]>(newVal);
      fileTypesOptions.value = fileLabels.map((item) => ({
        label: item?.label ?? item?.value ?? item,
        value: item?.value ?? item,
      }));
    }
  },
);

watch(
  () => selectFileTypes.value,
  (val) => {
    if (!props.load) {
      filterFileItems(inputValue.value, val);
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
      props.load(currentPage.value, types ?? [], keyword),
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
    filterFileItems(inputValue.value, selectFileTypes.value);
  } else {
    loadFileList(inputValue.value, selectFileTypes.value, true);
  }
};

const filterFileItems = (keyword?: string, types?: string[]) => {
  fileItemList.value = (props.fileItems ?? []).filter((item) => {
    if (!props.fileMatcher) {
      let flag = true;
      if (keyword) {
        flag = item.name?.includes(keyword) ?? false;
      }
      if (types && types.length > 0) {
        if (typeof item?.type === "string") {
          flag = types.includes(item.type);
        } else if (item?.type?.value) {
          flag = types.includes(item.type.value);
        }
      }
      return flag;
    }
    return props.fileMatcher(item, types ?? [], keyword);
  });
};

const existFileType = (file?: FileItem) => {
  if (!file?.type) {
    return false;
  } else if (typeof file.type === "string") {
    return file.type;
  } else {
    return file.type?.label;
  }
};

const existFileTag = (tag?: FileTag) => {
  if (!tag) {
    return false;
  } else if (typeof tag === "string") {
    return tag;
  } else {
    return tag.value;
  }
};

const handleScrollLoad = () => {
  if (isNoMore.value || !props.load || loading.value) {
    return;
  }
  loadFileList(inputValue.value, selectFileTypes.value, false);
};

const handleClickDownload = (fileItem: FileItem) => {
  if (props.customDownload) {
    props.customDownload(fileItem);
  } else {
    if (typeof fileItem?.file === "string") {
      downloadFile(fileItem?.file, fileItem?.name ?? "");
    } else if (fileItem?.file instanceof Blob) {
      const downloadUrl = URL.createObjectURL(fileItem?.file);
      downloadFile(downloadUrl, fileItem?.name ?? "");
      URL.revokeObjectURL(downloadUrl);
    }
  }
};

onMounted(() => {
  if (!props.load) {
    fileItemList.value = props.fileItems ?? [];
  } else {
    internalNoMore.value = false;
    loadFileList(inputValue.value, selectFileTypes.value, true);
  }
});
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
    <slot name="filter">
      <div v-if="showTypeFilter" class="label-select">
        <n-select
          v-model:value="selectFileTypes"
          multiple
          placeholder="请选择文件类型"
          :options="fileTypesOptions"
        />
      </div>
    </slot>
    <div class="file-card-list">
      <n-infinite-scroll
        class="pangju-h-100"
        :distance="10"
        @load="handleScrollLoad"
      >
        <slot :file-list="fileItemList">
          <n-card
            v-for="(fileItem, i) in fileItemList"
            :key="i"
            class="file-card pangju-cursor-pointer"
            :hoverable="cardHoverable"
            :bordered="cardBordered"
            embedded
            :size="cardSize"
            :segmented="{
              content: true,
              footer: true,
              action: true,
            }"
            @click="emits('click-file', fileItem)"
          >
            <template #header>
              <slot name="file-card-header" :file-item="fileItem">
                <div
                  v-if="fileItem?.name || fileItem?.file?.name"
                  class="pangju-mr-10"
                >
                  <n-ellipsis>
                    {{ fileItem?.name ?? fileItem?.file?.name }}
                  </n-ellipsis>
                </div>
              </slot>
            </template>
            <template #header-extra>
              <slot name="file-card-header-extra" :file-item="fileItem">
                <n-tag
                  v-if="existFileType(fileItem)"
                  :bordered="false"
                  type="info"
                  size="small"
                >
                  {{ fileItem.type?.label ?? fileItem.type }}
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
                <n-space v-if="fileItem.tags" class="file-tags">
                  <n-tag
                    v-for="(tag, j) in fileItem?.tags"
                    :key="'file-item-tag-' + i + '-' + j"
                    :type="tag?.type ?? 'info'"
                    :size="tagSize"
                  >
                    <span v-if="existFileTag(tag)">{{
                      tag?.value ?? tag
                    }}</span>
                  </n-tag>
                </n-space>
              </slot>
            </template>
            <template #action>
              <div class="pangju-flex-space-between">
                <div>
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
                      @click.stop="handleClickDownload(fileItem)"
                      >下载</n-button
                    >
                  </slot>
                </div>
                <slot name="file-card-action-extra" :file-item="fileItem">
                  <div v-if="fileItem.size">
                    {{ formatFileSize(fileItem.size) }}
                  </div>
                </slot>
              </div>
            </template>
            <template #default>
              <slot name="file-card-default" :file-item="fileItem">
                <div v-if="fileItem?.descriptions" class="file-descriptions">
                  <div
                    v-for="(description, j) in fileItem?.descriptions"
                    :key="'file-item-description-' + i + '-' + j"
                    class="file-description-item"
                  >
                    <div
                      v-if="description?.name"
                      class="file-description-item-name"
                    >
                      {{ description.name }}
                    </div>
                    <n-ellipsis v-if="description?.value">
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
            :hoverable="cardHoverable"
            :bordered="cardBordered"
            embedded
            :size="cardSize"
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
              <div style="display: flex">
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
        <slot name="noMore" :no-more="isNoMore">
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

  .label-select {
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

      .file-tags {
        margin-top: 10px;
      }
    }
  }
}
</style>
