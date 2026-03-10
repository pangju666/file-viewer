import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "FileView",
    props: (route) => ({
      fileUrl: decodeURIComponent(route.query.src as string),
      mimeType: decodeURIComponent(route.query.type as string),
      filename: decodeURIComponent(route.query.filename as string),
    }),
    component: () => import("@/views/FileView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
