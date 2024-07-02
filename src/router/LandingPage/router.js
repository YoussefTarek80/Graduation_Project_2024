import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/DarbHome",
            component: () => import("../../views/LandingPage/landing-page.vue"),
            meta: { title: "DarbHome" },
        },
        {
            path: "/DarbHome/Login",
            component: () => import("../../views/LandingPage/DarbWeb/darb-web.vue"),
            meta: { title: "DarbHome" },
        },
        {
            path: "/Convert/Page",
            component: () => import("../../components/ConvertSystemPage/convert-page.vue"),
            meta: { title: "DarbHome" },
        },
        {
            path: "/DarbHome/Support",
            component: () => import("../../views/LandingPage/SupportPage/support.vue"),
            meta: { title: "DarbHome" },
        },
        {
            path: "/DarbHome/EnrollTeacher",
            component: () => import("../../views/LandingPage/EnrollTeacher/enroll-teacher.vue"),
            meta: { title: "DarbHome" },
        },
    ],
});
export default router;
