import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/Login",
        },
        {
            path: "/Login",
            component: () => import("./views/Admin/Auth/Login/login.vue"),
            meta: { title: "Login" },
        },
        {
            path: "/Login/ForgetPass",
            component: () =>
                import("./views/Admin/Auth/Forget_Password/Forget.vue"),
            meta: { title: "Forget" },
        },
        {
            path: "/resetPassword/:token",
            component: () =>
                import("./views/Admin/Auth/Reset_Password/reset.vue"),
            meta: { title: "reset" },
            props:true
        },
        {
            path: "/Admin/Home",
            component: () => import("./views/Admin/Services/Home/home.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
            },
        },
        {
            path: "/Admin/Schools",
            component: () =>
                import("./views/Admin/Services/Schools/schools.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
            },
        },
        {
            path: "/Admin/Schools/addSchool",
            component: () =>
                import(
                    "./views/Admin/Services/Schools/Add_School/addSchool.vue"
                ),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
            },
        },
        {
            path: "/Admin/Schools/updateSchool/:index",
            component: () =>
                import(
                    "./views/Admin/Services/Schools/Update_School/updateSchool.vue"
                ),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props:true
            },
        },
        {
            path: "/Admin/Schools/InfoSchool/:index",
            component: () =>
                import(
                    "./views/Admin/Services/Schools/Info_School/InfoSchool.vue"
                ),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props:true
            },
        },
        {
            path: "/SchoolDashboard",
            component: () => import("./views/School/Dashboard/dashboard.vue"),
            meta: {
                title: "SchoolDashboard",
                requiresAuth: true,
                roles: ["school"],
            },
        },
    ],
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
