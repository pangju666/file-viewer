import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "FileView",
    props: (route) => ({
      file: {
        url: decodeURIComponent(route.query.src as string),
        mimeType: decodeURIComponent(route.query.type as string),
        filename: decodeURIComponent(route.query.filename as string),
        password: decodeURIComponent(route.query.password as string),
      },
    }),
    component: () => import("@/components/FilePreview.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
