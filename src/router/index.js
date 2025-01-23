import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/:fileMd5",
        name: "FileView",
        props: true,
        component: () => import("@/views/FileView.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
