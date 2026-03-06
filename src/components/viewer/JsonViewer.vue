<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import VueJsonViewer from "vue-json-viewer";
import "vue-json-viewer/style.css";
import { utf8Charset } from "@/utils/constants.ts";

const props = withDefaults(
  defineProps<{
    src: string;
    fileEncoding?: string;
  }>(),
  {
    fileEncoding: utf8Charset,
  },
);

const emits = defineEmits<{
  (e: "ready"): void;
}>();

const content = ref<string>();

onMounted(async () => {
  const response = await axios.get<string>(props.src, {
    responseType: "json",
    responseEncoding: props.fileEncoding ?? utf8Charset,
  });
  content.value = response.data;
  emits("ready");
});

watch(
  () => props.src,
  async (newVal: string) => {
    const response = await axios.get<string>(newVal, {
      responseType: "json",
      responseEncoding: props.fileEncoding ?? utf8Charset,
    });
    content.value = response.data;
    emits("ready");
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
