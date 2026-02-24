<script lang="ts" setup>
import { mavonEditor } from "mavon-editor";
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import "mavon-editor/dist/css/index.css";

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

const content = ref<string | null>(null);

onMounted(async () => {
  const response = await axios.get<string>(props.url, {
    responseType: "text",
    responseEncoding: props.fileEncoding ?? "utf-8",
  });
  content.value = response.data;
  emits("finished");
});

watch(
  () => props.url,
  async (newVal: string) => {
    const response = await axios.get<string>(newVal, {
      responseType: "text",
    });
    content.value = response.data;
    emits("finished");
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
