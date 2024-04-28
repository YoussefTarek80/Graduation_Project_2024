import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/SelectRole",
        },
        {
            path: "/SelectRole",
            component: () => import("../../views/WelcomePage/Welcome_Page.vue"),
            meta: { title: "SelectRole" },
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});
router.beforeEach((to, from, next) => {
    if (from.path === "/SelectRole" && to.path === "/Login") {
        const selectedRole = localStorage.getItem("selectedRole");
        if (selectedRole) {
            next();
        } else {
            next("/SelectRole");
        }
    } else {
        next();
    }
});
export default router;
