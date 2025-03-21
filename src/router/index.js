import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "FileView",
        props: true,
        component: () => import("@/views/FileView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
