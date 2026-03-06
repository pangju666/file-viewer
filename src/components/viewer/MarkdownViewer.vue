<script lang="ts" setup>
import { mavonEditor } from "mavon-editor";
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import "mavon-editor/dist/css/index.css";
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

const content = ref<string | null>(null);

onMounted(async () => {
  const response = await axios.get<string>(props.src, {
    responseType: "text",
    responseEncoding: props.fileEncoding ?? utf8Charset,
  });
  content.value = response.data;
  emits("ready");
});

watch(
  () => props.src,
  async (newVal: string) => {
    const response = await axios.get<string>(newVal, {
      responseType: "text",
    });
    content.value = response.data;
    emits("ready");
  },
);
</script>

<template>
  <div class="md-viewer">
    <mavon-editor
      v-model="content"
      :subfield="false"
      default-open="preview"
      :editable="false"
      :toolbars-flag="false"
      :scroll-style="true"
    />
  </div>
</template>

<style scoped lang="less">
.md-viewer {
  overflow: auto;
  height: 100%;
}
</style>
