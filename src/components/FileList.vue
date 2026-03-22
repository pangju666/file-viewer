<script lang="ts" setup>
import { computed, onMounted, watch, ref } from "vue";
import { downloadFile, formatFileSize, getResult } from "@/utils/utils.ts";
import type { FileItem, FileTag, FileType } from "@/types/file.ts";
import { Image, Search } from "@vicons/ionicons5";
import type { FileListProps } from "@/types/options.ts";
import "@/assets/css/file-viewer.css";

const props = withDefaults(defineProps<FileListProps>(), {
  title: "文件列表",
  showBackTop: true,
  showSearch: true,
  showTitle: true,
  showFilter: true,
  coverHeight: 150,
  coverObjectFit: "fill",
  coverFallbackSrc: undefined,
  coverFallbackIcon: Image,
  coverPlaceholderSrc: undefined,
  coverPlaceholderIcon: Image,
  coverLazy: false,
  types: undefined,
  cardSize: "small",
  cardHoverable: true,
  cardBordered: true,
  data: undefined,
  onLoad: undefined,
  filter: undefined,
  noMore: undefined,
  customDownload: undefined,
});

const emits = defineEmits<{
  (e: "click-file", file: FileItem): void;
}>();

const sourceFileItems = ref<FileItem[]>([]);

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
  if (!props.onLoad) {
    return true;
  }
  if (props.noMore != null) {
    return props.noMore;
  }
  return internalNoMore.value;
});

watch(
  () => props.data,
  async (newVal) => {
    if (!props.onLoad && newVal) {
      sourceFileItems.value = (await getResult<FileItem[]>(newVal)) ?? [];
      fileItemList.value = sourceFileItems.value;
      if (!props.types) {
        fileTypesOptions.value = fileItemList.value.map((item) => ({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          label: item?.label ?? item?.value ?? item,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value: item?.value ?? item,
        }));
      }
    }
  },
);

watch(
  () => props.types,
  async (newVal) => {
    if (newVal) {
      const fileTypes = await getResult<FileType[]>(newVal);
      fileTypesOptions.value = fileTypes.map((item) => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        label: item?.label ?? item?.value ?? item,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value: item?.value ?? item,
      }));
    }
  },
);

watch(
  () => selectFileTypes.value,
  (val) => {
    if (!props.onLoad) {
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
  if (!props.onLoad) {
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
      props.onLoad(currentPage.value, types ?? [], keyword),
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

const refreshData = () => {
  if (!props.onLoad) {
    filterFileItems(inputValue.value, selectFileTypes.value);
  } else {
    loadFileList(inputValue.value, selectFileTypes.value, true);
  }
};

const filterFileItems = (keyword?: string, types?: string[]) => {
  fileItemList.value = sourceFileItems.value.filter((item) => {
    if (!props.filter) {
      let flag = true;
      if (item?.name && keyword) {
        flag = item.name.includes(keyword) ?? false;
      }
      if (item?.type && types && types.length > 0) {
        if (typeof item.type === "string") {
          flag = types.includes(item.type);
        } else if (item.type?.value) {
          flag = types.includes(item.type.value);
        }
      }
      return flag;
    } else {
      return props.filter(item, types ?? [], keyword);
    }
  });
};

const existFileType = (fileItem?: FileItem) => {
  if (!fileItem?.type) {
    return false;
  } else if (typeof fileItem.type === "string") {
    return fileItem.type;
  } else {
    return fileItem.type?.label;
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

const getCoverSrc = (fileItem?: FileItem) => {
  return fileItem?.cover ?? null;
};

const handleScrollLoad = () => {
  if (isNoMore.value || !props.onLoad || loading.value) {
    return;
  }
  loadFileList(inputValue.value, selectFileTypes.value, false);
};

const handleClickDownload = (fileItem: FileItem) => {
  if (props.customDownload) {
    props.customDownload(fileItem);
  } else {
    if (typeof fileItem?.source === "string") {
      downloadFile(fileItem?.source, fileItem?.name ?? "");
    } else if (fileItem?.source instanceof Blob) {
      const downloadUrl = URL.createObjectURL(fileItem?.source);
      downloadFile(downloadUrl, fileItem?.name ?? "");
      URL.revokeObjectURL(downloadUrl);
    }
  }
};

onMounted(async () => {
  if (props.types) {
    const fileTypes = await getResult<FileType[]>(props.types);
    fileTypesOptions.value = fileTypes.map((item) => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      label: item?.label ?? item?.value ?? item,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value: item?.value ?? item,
    }));
  }

  if (!props.onLoad && props.data) {
    sourceFileItems.value = (await getResult<FileItem[]>(props.data)) ?? [];
    fileItemList.value = sourceFileItems.value;
    if (!props.types) {
      fileTypesOptions.value = fileItemList.value.map((item) => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        label: item?.label ?? item?.value ?? item,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value: item?.value ?? item,
      }));
    }
  } else {
    internalNoMore.value = false;
    await loadFileList(inputValue.value, selectFileTypes.value, true);
  }
});

defineExpose({
  refreshData,
});
</script>

<template>
  <div class="container">
    <slot v-if="showTitle" name="title">
      <div class="title">{{ title }}</div>
    </slot>
    <slot v-if="showSearch" name="search">
      <div class="search-input">
        <n-input
          v-model:value="inputValue"
          round
          placeholder="请输入文件名"
          @keydown.enter="refreshData"
        >
          <template #suffix>
            <n-icon
              :size="24"
              class="pangju-cursor-pointer"
              @click="refreshData"
            >
              <Search />
            </n-icon>
          </template>
        </n-input>
      </div>
    </slot>
    <slot v-if="showFilter" name="filter">
      <div class="label-select">
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
        <slot name="list" :file-list="fileItemList">
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
              <slot name="file-name" :file-item="fileItem">
                <div
                  v-if="fileItem?.name || fileItem?.source?.name"
                  class="pangju-mr-10"
                >
                  <n-ellipsis>
                    {{ fileItem?.name ?? fileItem?.source?.name }}
                  </n-ellipsis>
                </div>
              </slot>
            </template>
            <template #header-extra>
              <slot name="file-type" :file-item="fileItem">
                <n-tag
                  v-if="existFileType(fileItem)"
                  :bordered="false"
                  type="info"
                  size="small"
                >
                  {{ fileItem?.type?.label ?? fileItem?.type }}
                </n-tag>
              </slot>
            </template>
            <template #cover>
              <slot name="file-cover" :file-item="fileItem">
                <div class="pangju-p-10 pangju-h-center">
                  <n-image
                    :lazy="coverLazy"
                    preview-disabled
                    :object-fit="coverObjectFit"
                    :height="coverHeight"
                    :src="getCoverSrc(fileItem)"
                  >
                    <template v-if="coverLazy" #placeholder>
                      <img
                        v-if="coverPlaceholderSrc"
                        :src="coverPlaceholderSrc"
                        :height="coverHeight"
                        :style="{ objectFit: coverObjectFit }"
                      />
                      <n-icon
                        v-else
                        :size="coverHeight"
                        :component="coverPlaceholderIcon"
                      />
                    </template>
                    <template v-else #error>
                      <img
                        v-if="coverFallbackSrc"
                        :src="coverFallbackSrc"
                        :height="coverHeight"
                        :style="{ objectFit: coverObjectFit }"
                      />
                      <n-icon
                        v-else
                        :size="coverHeight"
                        :component="coverFallbackIcon"
                      />
                    </template>
                  </n-image>
                </div>
              </slot>
            </template>
            <template #footer>
              <slot name="file-tags" :file-item="fileItem">
                <n-space v-if="fileItem?.tags" class="file-tags">
                  <n-tag
                    v-for="(tag, j) in fileItem?.tags"
                    :key="'file-item-tag-' + i + '-' + j"
                    :type="tag?.type ?? 'info'"
                    size="small"
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
                  <slot name="file-action" :file-item="fileItem">
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
                  <slot name="file-action-extra" :file-item="fileItem"></slot>
                </div>
                <slot name="file-size" :file-item="fileItem">
                  <div v-if="fileItem?.size || fileItem?.source?.size">
                    {{
                      formatFileSize(fileItem?.size || fileItem?.source?.size)
                    }}
                  </div>
                </slot>
              </div>
            </template>
            <template #default>
              <slot name="file-descriptions" :file-item="fileItem">
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
        <slot v-if="loading" name="loading">
          <n-card
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
        <slot v-if="isEmpty" name="empty">
          <n-empty
            class="pangju-h-100 pangju-flex-center"
            description="文件列表为空"
          >
          </n-empty>
        </slot>
        <slot v-if="isNoMore" name="noMore">
          <div class="pangju-h-center">没有更多了</div>
        </slot>
        <slot v-if="showBackTop" name="backTop">
          <n-back-top :right="20" style="z-index: 9999" />
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
