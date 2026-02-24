<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import VueJsonViewer from "vue-json-viewer";
import "vue-json-viewer/style.css";

const props = withDefaults(
  defineProps<{
    url: string;
    fileEncoding?: string;
  }>(),
  {
    fileEncoding: "utf-8",
  },
);

const emits = defineEmits<{
  (e: "finished"): void;
}>();

const content = ref<any>(null);

onMounted(async () => {
  const response = await axios.get<any>(props.url, {
    responseType: "json",
    responseEncoding: props.fileEncoding ?? "utf-8",
  });
  content.value = response.data;
  emits("finished");
});

watch(
  () => props.url,
  async (newVal: string) => {
    const response = await axios.get<any>(newVal, {
      responseType: "json",
      responseEncoding: props.fileEncoding ?? "utf-8",
    });
    content.value = response.data;
    emits("finished");
  },
);
</script>

<template>
  <div class="json-viewer">
    <vue-json-viewer
      :value="content"
      copyable
      :expand-depth="10"
      expanded
      show-array-index
    />
  </div>
</template>

<style scoped lang="less">
.json-viewer {
  overflow: auto;
  height: 100%;
}
</style>
