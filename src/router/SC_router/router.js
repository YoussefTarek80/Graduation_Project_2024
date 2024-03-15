import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/School/Login",
        },
        {
            path: "/School/Login",
            component: () => import("../../views/School/Auth/Login/login.vue"),
            meta: { title: "Login" },
        },
        {
            path: "/School/Home",
            component: () => import("../../views/School/Services/Home/home.vue"),
            meta: {
                title: "ManagerDashboard",
                requiresAuth: true,
                roles: ["Manager"],
            },
        },
        {
            path: "/Manager/profile",
            component: () => import("../../views/School/Profile/profile.vue"),
            meta: {
                title: "ManagerProfile",
                requiresAuth: true,
                roles: ["Manager"],
            },
        },
        {
            path: "/School/Students",
            component: () => import("../../views/School/Services/Students/students.vue"),
            meta: {
                title: "SchoolStudents",
                requiresAuth: true,
                roles: ["SchoolStudents"],
            },
        },
        {
            path: "/School/Teachers",
            component: () => import("../../views/School/Profile/profile.vue"),
            meta: {
                title: "SchoolTeachers",
                requiresAuth: true,
                roles: ["SchoolTeachers"],
            },
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "Your Default Title";
    const isAuthenticated = localStorage.getItem("token");
    const userRole = localStorage.getItem("user");
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next("/");
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;
