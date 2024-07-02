import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/Login",
            component: () => import("../../views/Admin/Auth/Login/login.vue"),
            meta: { title: "Login" },
        },
        {
            path: "/Login/ForgetPass",
            component: () =>
                import("../../views/Admin/Auth/Forget_Password/Forget.vue"),
            meta: { title: "Forget" },
        },
        {
            path: "/resetPassword/:token",
            component: () =>
                import("../../views/Admin/Auth/Reset_Password/reset.vue"),
            meta: { title: "reset" },
            props: true,
        },
        {
            path: "/Admin/Home",
            component: () => import("../../views/Admin/Services/Home/home.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
            },
        },
        {
            path: "/Admin/profile",
            component: () => import("../../views/Admin/Profile/profile.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
            },
        },
        {
            path: "/Admin/Schools",
            component: () =>
                import("../../views/Admin/Services/Schools/schools.vue"),
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
                    "../../views/Admin/Services/Schools/Add_School/addSchool.vue"
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
                    "../../views/Admin/Services/Schools/Update_School/updateSchool.vue"
                ),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Schools/InfoSchool/:index",
            component: () =>
                import(
                    "../../views/Admin/Services/Schools/Info_School/InfoSchool.vue"
                ),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Students",
            component: () =>
                import("../../views/Admin/Services/Students/students.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
            },
        },
        {
            path: "/Admin/Students/InfoStudent/:index",
            component: () => 
            import("../../views/Admin/Services/Students/Info_Student/InfoStudent.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Students/InfoStudent/studScores/:index",
            component: () =>
                import("../../views/Admin/Services/Students/Info_Student/ScoreData/score_data.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Teacher",
            component: () => 
            import("../../views/Admin/Services/Teachers/teacher.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Request",
            component: () => 
            import("../../views/Admin/Services/Requests/request.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Event",
            component: () => 
            import("../../views/Admin/Services/Events/event.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Event/AddEvent",
            component: () => 
            import("../../views/Admin/Services/Events/Add_Event/add_event.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Event/InfoEvent/:index",
            component: () =>
                import("../../views/Admin/Services/Events/Info_Event/infoEvent.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Event/UpdateEvent/:index",
            component: () =>
                import("../../views/Admin/Services/Events/Update_Event/updateEvent.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Notifications",
            component: () =>
                import("../../views/Admin/Notifications/Notify.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Subjects",
            component: () =>
                import("../../views/Admin/Services/Subjects/subjects.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Reports",
            component: () =>
                import("../../views/Admin/Services/Reports/report.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },
        {
            path: "/Admin/Reports/AddReport",
            component: () =>
                import("../../views/Admin/Services/Reports/Add-report/addReport.vue"),
            meta: {
                title: "AdminDashboard",
                requiresAuth: true,
                roles: ["admin"],
                props: true,
            },
        },

    ],
});
export function routerGuardAdmin(to, from, next){
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
}
export default router;
