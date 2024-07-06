import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/darb-system",
        },
        {
            path: "/darb-system",
            component: () => import("../../views/WelcomePage/Welcome_Page.vue"),
            meta: { title: "نظام درب التعليمي" },
        },
    ],
});
router.beforeEach((to, from, next) => {
    const selectedRole = localStorage.getItem("role");
    if (from.path === "/darb-system" && to.path === "/login") {
        if (selectedRole) {
            next();
        } else {
            next("/darb-system");
        }
    } else {
        next();
    }
});
export default router;
