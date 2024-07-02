import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/DarbAdmins",
        },
        {
            path: "/DarbAdmins",
            component: () => import("../../views/Parent/WelcomePage/Welcome_Page.vue"),
            meta: { title: "DarbAdmins" },
        },
    ],
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
