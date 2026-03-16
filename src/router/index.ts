import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "FilePreviewView",
    props: (route) => ({
      file: {
        id: route.query.id as string,
        url: decodeURIComponent(route.query.src as string),
        mimeType: decodeURIComponent(route.query.type as string),
        filename: decodeURIComponent(route.query.name as string),
      },
    }),
    component: () => import("@/views/FilePreviewView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
