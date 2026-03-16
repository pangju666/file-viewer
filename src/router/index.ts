import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/preview",
    name: "FilePreviewView",
    props: (route) => ({
      id: route.query.id
        ? decodeURIComponent(route.query.id as string)
        : undefined,
      url: route.query.src
        ? decodeURIComponent(route.query.src as string)
        : undefined,
      mimeType: route.query.type
        ? decodeURIComponent(route.query.type as string)
        : undefined,
      filename: route.query.name
        ? decodeURIComponent(route.query.name as string)
        : undefined,
    }),
    component: () => import("@/views/FilePreviewView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
