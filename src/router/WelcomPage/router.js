import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/select-role/",
        },
        {
            path: "/select-role",
            component: () => import("../../views/WelcomePage/Welcome_Page.vue"),
            meta: { title: "SelectRole" },
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});
router.beforeEach((to, from, next) => {
    if (from.path === "/select-role" && to.path === "/login") {
        const selectedRole = localStorage.getItem("selectedRole");
        if (selectedRole) {
            next();
        } else {
            next("/select-role");
        }
    } else {
        next();
    }
});
export default router;
