import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/DarbSystem",
            redirect: "/Darb/Dashboard"
        },
        {
            path: "/Darb",
            component: () => import("../../views/Parent/Services/Home/Home.vue"),
            meta: { title: "Darb" },
        },
        {
            path: "/Darb/Login",
            component: () => import("../../views/Parent/Auth/Login/login.vue"),
            meta: { title: "Darb" },
        },
        {
            path: "/Darb/Signup",
            component: () => import("../../views/Parent/Auth/Signup/signup.vue"),
            meta: { title: "Darb" },
        },
        {
            path: "/Darb/ExtraInfoSignup",
            component: () => import("../../views/Parent/Auth/Signup/Final_Signup/ExtraInfo.vue"),
            meta: { title: "Darb" },
        },
        {
            path: "/Darb/Dashboard",
            component: () => import("../../views/Parent/Services/Dashboard/dashboard.vue"),
            meta: { title: "Darb", auth: true },
        },
        {
            path: "/Darb/Profile",
            component: () => import("../../views/Parent/Profile/profile.vue"),
            meta: { title: "Darb", auth: true },
        },
        {
            path: "/Darb/AI",
            component: () => import("../../views/Parent/Services/AI/ai.vue"),
            meta: { title: "Darb", auth: true },
        },
        {
            path: "/Darb/Dashboard/Children",
            component: () => import("../../views/Parent/Services/Dashboard/Children/ShowChlid/showChild.vue"),
            meta: { title: "Darb", auth: true },
        },
        {
            path: "/Darb/Dashboard/Children/AddChild",
            component: () => import("../../views/Parent/Services/Dashboard/Children/AddChild/addChild.vue"),
            meta: { title: "Darb", auth: true },
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },

});

export function routerGuardParent(to, from, next) {
    const token = localStorage.getItem("token");
    const requiresAuth = to.matched.some(record => record.meta.auth);
    if (requiresAuth && !token) {
        next("/Darb");
    } else {
        next();
    }
}

export default router;