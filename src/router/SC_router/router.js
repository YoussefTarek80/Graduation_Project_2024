import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
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
                roles: ["ManagerProfile"],
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
            path: "/School/Services/Students/InfoStudent/:id",
            component: () => import("../../views/School/Services/Students/Info_Student/InfoStudent.vue"),
            meta: {
                title: "SchoolStudentInfo",
                requiresAuth: true,
                props: true,
                roles: ["SchoolStudenInfo"],
            },
        },
        {
            path: "/School/Teachers",
            component: () => import("../../views/School/Services/Teachers/Teachers.vue"),
            meta: {
                title: "SchoolTeachers",
                requiresAuth: true,
                roles: ["SchoolTeachers"],
            },
        },
        {
            path: "/School/Services/Requests",
            component: () => import("../../views/School/Services/Requests/Requests.vue"),
            meta: {
                title: "SchoolRequests",
                requiresAuth: true,
                roles: ["SchoolRequests"],
            },
        },
        {
            path: "/School/Services/Subjects",
            component: () => import("../../views/School/Services/Subjects/Subjects.vue"),
            meta: {
                title: "SchoolSubjects",
                requiresAuth: true,
                roles: ["SchoolSubjects"],
            },
        },
        {
            path: "/School/Services/Events",
            component: () => import("../../views/School/Services/Events/Events.vue"),
            meta: {
                title: "SchoolEvents",
                requiresAuth: true,
                roles: ["SchoolEvents"],
            },
        },
        {
            path: "/School/Services/Complaints",
            component: () => import("../../views/School/Services/Complaints/Complaints.vue"),
            meta: {
                title: "SchoolComplaints",
                requiresAuth: true,
                roles: ["SchoolComplaints"],
            },
        },
        {
            path: "/School/Services/Controllers",
            component: () => import("../../views/School/Services/Controllers/Controllers.vue"),
            meta: {
                title: "SchoolControllers",
                requiresAuth: true,
                roles: ["SchoolControllers"],
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
