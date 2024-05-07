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
            path: "/School/Login/ForgetPass",
            component: () =>
                import("../../views/School/Auth/Forget_Password/Forget.vue"),
            meta: { title: "Forget" },
        },
        {
            path: "/School/resetPassword/:token",
            component: () =>
                import("../../views/School/Auth/Reset_Password/reset.vue"),
            meta: { title: "reset" },
            props: true,
        },
        {
            path: "/School/Home",
            component: () => import("../../views/School/Services/Home/home.vue"),
            meta: {
                title: "ManagerDashboard",
                requiresAuth: true,
                roles: ["ManagerDashboard"],
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
                roles: ["SchoolStudentInfo"],
            },
        },
        {
            path: "/School/Services/Students/add-n-stud",
            component: () => import("../../views/School/Services/Students/Add_Student/add-n-stud.vue"),
            meta: {
                title: "SchoolStudentAddNewSudent",
                requiresAuth: true,
                roles: ["SchoolStudentAddNewSudent"],
            },
        },
        {
            path: "/School/Services/enroll-requests",
            component: () => import("../../views/School/Services/Requests/enroll-requests.vue"),
            meta: {
                title: "school-enroll-requests",
                requiresAuth: true,
                roles: ["school-enroll-requests"],
            },
        },
        {
            path: "/school/services/requests/enroll-request/:id",
            component: () => import("../../views/School/Services/Requests/Request/enroll-request.vue"),
            meta: {
                title: "enroll-req-page",
                requiresAuth: true,
                props: true,
                roles: ["enroll-req-Page"],
            },
        },
        {
            path: "/School/Services/transfer-requests",
            component: () => import("../../views/School/Services/Requests/transfer-requests.vue"),
            meta: {
                title: "school-transfer-requests",
                requiresAuth: true,
                roles: ["school-transfer-requests"],
            },
        },
        {
            path: "/school/services/requests/transfer-request/:id",
            component: () => import("../../views/School/Services/Requests/Request/transfer-request.vue"),
            meta: {
                title: "transfer-req-page",
                requiresAuth: true,
                props: true,
                roles: ["transfer-req-Page"],
            },
        },
        {
            path: "/School/Services/Teachers",
            component: () => import("../../views/School/Services/Teachers/Teachers.vue"),
            meta: {
                title: "SchoolTeachers",
                requiresAuth: true,
                roles: ["SchoolTeachers"],
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
            path: "/School/Services/Events/AddEvent",
            component: () => import("../../views/School/Services/Events/Add_Event/add_event.vue"),
            meta: {
                title: "AddEvent",
                requiresAuth: true,
                roles: ["AddEvent"],
            },
        },
        {
            path: "/School/Services/Events/InfoEvent/:id",
            component: () => import("../../views/School/Services/Events/Info_Event/infoEvent.vue"),
            meta: {
                title: "Info_Event",
                requiresAuth: true,
                props: true,
                roles: ["Info_Event"],
            },
        },
        {
            path: "/School/Services/Events/UpdateEvent/:id",
            component: () => import("../../views/School/Services/Events/Update_Event/updateEvent.vue"),
            meta: {
                title: "Update_Event",
                requiresAuth: true,
                roles: ["Update_Event"],
            },
        },
        {
            path: "/School/Teachers",
            component: () => import("../../views/School/Services/Teachers/Teachers.vue"),
            meta: {
                title: "Teachers",
                requiresAuth: true,
                props: true,
                roles: ["Teachers"],
            },
        },
        {
            path: "/School/Teachers/AddEvent",
            component: () => import("../../views/School/Services/Teachers/Add_Teacher/AddTeacher.vue"),
            meta: {
                title: "AddTeacher",
                requiresAuth: true,
                roles: ["AddTeacher"],
            },
        },
        {
            path: "/School/Teachers/TeacherInfo/:id",
            component: () => import("../../views/School/Services/Teachers/Info_Teacher/TeacherInfo.vue"),
            meta: {
                title: "Info_Teacher",
                requiresAuth: true,
                props: true,
                roles: ["Info_Teacher"],
            },
        },
        {
            path: "/School/Teachers/EditTeacherInfo/:id",
            component: () => import("../../views/School/Services/Teachers/Edit_Teacher/Edit_TeacherInfo.vue"),
            meta: {
                title: "Edit_TeacherInfo",
                requiresAuth: true,
                props: true,
                roles: ["Edit_TeacherInfo"],
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
        {
            path: "/School/Services/Controllers/AddController/",
            component: () => import("../../views/School/Services/Controllers/AddController/AddController.vue"),
            meta: {
                title: "AddController",
                requiresAuth: true,
                props: true,
                roles: ["AddController"],
            },
        },
        {
            path: "/School/Services/Controllers/ControllerInfo/:id",
            component: () => import("../../views/School/Services/Controllers/ControllerInfo/ControllerInfo.vue"),
            meta: {
                title: "ControllerInfo",
                requiresAuth: true,
                props: true,
                roles: ["ControllerInfo"],
            },
        },
        {
            path: "/School/Services/Controllers/UpdateController/:id",
            component: () => import("../../views/School/Services/Controllers/EditController/EditController.vue"),
            meta: {
                title: "UpdateController",
                requiresAuth: true,
                props: true,
                roles: ["UpdateController"],
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
