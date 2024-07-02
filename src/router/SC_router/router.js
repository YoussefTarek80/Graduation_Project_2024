import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/school/login",
            component: () => import("../../views/School/Auth/Login/login.vue"),
            meta: { title: "School login page | Darb System" },
        },
        {
            path: "/school/login/forget-password",
            component: () => import("../../views/School/Auth/Forget_Password/Forget.vue"),
            meta: { title: "School account forget-password | Darb System" },
        },
        {
            path: "/school/reset-password/:token",
            component: () => import("../../views/School/Auth/Reset_Password/reset.vue"),
            meta: { title: "School account reset-password | Darb System" },
            props: true,
        },
        {
            path: "/school/home",
            component: () => import("../../views/School/Services/Home/home.vue"),
            meta: {
                title: "School home page | Darb System",
                requiresAuth: true,
                roles: ["darb-school-home"],
            },
        },
        {
            path: "/school-account/profile",
            component: () => import("../../views/School/Profile/profile.vue"),
            meta: {
                title: "School account profile | Darb System",
                requiresAuth: true,
                roles: ["school-account-profile"],
            },
        },
        {
            path: "/school/reports",
            component: () => import("../../views/School/Services/Reports/reports.vue"),
            meta: {
                title: "School reports | Darb System",
                requiresAuth: true,
                roles: ["school-reports"],
            },
        },
        {
            path: "/school/services/reports/report-info/:id",
            component: () => import("../../views/School/Services/Reports/Report-Info/report-info.vue"),
            meta: {
                title: "School report information | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["school-report-info"],
            },
        },
        {
            path: "/school/students",
            component: () => import("../../views/School/Services/Students/students.vue"),
            meta: {
                title: "School students | Darb System",
                requiresAuth: true,
                roles: ["school-students"],
            },
        },
        {
            path: "/school/services/students/student-info/:id",
            component: () => import("../../views/School/Services/Students/Info_Student/InfoStudent.vue"),
            meta: {
                title: "School student information | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["school-student-info"],
            },
        },
        {
            path: "/school/services/students/student-grades/:id",
            component: () => import("../../views/School/Services/Students/Info_Student/student-grades.vue"),
            meta: {
                title: "School student grades | Darb System",
                requiresAuth: true,
                roles: ["school-student-grades"],
            },
        },
        {
            path: "/school/teachers",
            component: () => import("../../views/School/Services/Teachers/Teachers.vue"),
            meta: {
                title: "school teachers | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["school-teachers"],
            },
        },
        {
            path: "/school/teachers/add-teacher",
            component: () => import("../../views/School/Services/Teachers/Add_Teacher/AddTeacher.vue"),
            meta: {
                title: "School enroll teacher | Darb System",
                requiresAuth: true,
                roles: ["enroll-teacher"],
            },
        },
        {
            path: "/school/teachers/teacher-info/:id",
            component: () => import("../../views/School/Services/Teachers/Info_Teacher/TeacherInfo.vue"),
            meta: {
                title: "School teacher information | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["teacher-info"],
            },
        },
        {
            path: "/school/teachers/edit-teacher-info/:id",
            component: () => import("../../views/School/Services/Teachers/Edit_Teacher/Edit_TeacherInfo.vue"),
            meta: {
                title: "School edit teacher information | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["edit-teacher-info"],
            },
        },
        {
            path: "/school/services/enroll-requests",
            component: () => import("../../views/School/Services/Requests/enroll-requests.vue"),
            meta: {
                title: "School enroll student | Darb System",
                requiresAuth: true,
                roles: ["school-enroll-requests"],
            },
        },
        {
            path: "/school/services/enroll-requests/request-info/:id",
            component: () => import("../../views/School/Services/Requests/Request/enroll-request/enroll-request.vue"),
            meta: {
                title: "School enroll student request page | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["enroll-request-Page"],
            },
        },
        {
            path: "/school/services/transfer-requests",
            component: () => import("../../views/School/Services/Requests/transfer-requests.vue"),
            meta: {
                title: "School transfer student | Darb System",
                requiresAuth: true,
                roles: ["school-transfer-requests"],
            },
        },
        {
            path: "/school/services/transfer-requests/request-info/:id",
            component: () => import("../../views/School/Services/Requests/Request/transfer-request/transfer-request.vue"),
            meta: {
                title: "School transfer student request page |s Darb System",
                requiresAuth: true,
                props: true,
                roles: ["transfer-request-Page"],
            },
        },
        {
            path: "/school/services/sc-events",
            component: () => import("../../views/School/Services/Events/SC-Events.vue"),
            meta: {
                title: "School events | Darb System",
                requiresAuth: true,
                roles: ["sc-school-events"],
            },
        },
        {
            path: "/school/services/sc-events/add-event",
            component: () => import("../../views/School/Services/Events/Add_Event/add_event.vue"),
            meta: {
                title: "Add school event | Darb System",
                requiresAuth: true,
                roles: ["add-sc-event"],
            },
        },
        {
            path: "/school/services/sc-events/event-info/:id",
            component: () => import("../../views/School/Services/Events/Info_Event/SC_InfoEvent.vue"),
            meta: {
                title: "school event information | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["sc-event-info"],
            },
        },
        {
            path: "/school/services/sc-events/edit-event/:id",
            component: () => import("../../views/School/Services/Events/Update_Event/updateEvent.vue"),
            meta: {
                title: "school edit event information | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["edit-event"],
            },
        },
        {
            path: "/school/services/ad-events",
            component: () => import("../../views/School/Services/Events/AD-Events.vue"),
            meta: {
                title: "Administration events | Darb System",
                requiresAuth: true,
                roles: ["ad-school-events"],
            },
        },
        {
            path: "/school/services/ad-events/event-info/:id",
            component: () => import("../../views/School/Services/Events/Info_Event/AD_InfoEvent.vue"),
            meta: {
                title: "Administration event inforamtion | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["ad-info-event"],
            },
        },
        {
            path: "/school/services/controllers",
            component: () => import("../../views/School/Services/Controllers/Controllers.vue"),
            meta: {
                title: "School controllers | Darb System",
                requiresAuth: true,
                roles: ["school-controllers"],
            },
        },
        {
            path: "/school/services/controllers/add-controller",
            component: () => import("../../views/School/Services/Controllers/AddController/AddController.vue"),
            meta: {
                title: "school add controller | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["add-controller"],
            },
        },
        {
            path: "/school/services/controllers/controller-info/:id",
            component: () => import("../../views/School/Services/Controllers/ControllerInfo/ControllerInfo.vue"),
            meta: {
                title: "School controller information | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["controller-info"],
            },
        },
        {
            path: "/school/services/controllers/edit-controller/:id",
            component: () => import("../../views/School/Services/Controllers/EditController/EditController.vue"),
            meta: {
                title: "School edit controller information | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["edit-controller-info"],
            },
        },
        {
            path: "/school/services/subjects",
            component: () => import("../../views/School/Services/Subjects/Subjects.vue"),
            meta: {
                title: "School subjects | Darb System",
                requiresAuth: true,
                roles: ["school-subjects"],
            },
        },
        {
            path: "/school/services/subjects/subject-info/:id",
            component: () => import("../../views/School/Services/Subjects/Subj-info/subject-info.vue"),
            meta: {
                title: "School subject information | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["subject-info"],
            },
        },
        {
            path: "/school/services/subjects/subject-info/subject-studs/:id",
            component: () => import("../../views/School/Services/Subjects/Subj-info/subject-studs.vue"),
            meta: {
                title: "subject-studs",
                requiresAuth: true,
                props: true,
                roles: ["subject-studs"],
            },
        },
        {
            path: "/school/services/technical-support",
            component: () => import("../../views/School/Services/TechnicalSupport/technical-support.vue"),
            meta: {
                title: "School technical support tickets | Darb System",
                requiresAuth: true,
                roles: ["school-tickets"],
            },
        },
        {
            path: "/school/services/technical-support/ticket-info/:id",
            component: () => import("../../views/School/Services/TechnicalSupport/tech-sup-info/tech-sup-info.vue"),
            meta: {
                title: "School technical support ticket information | Darb System",
                requiresAuth: true,
                props: true,
                roles: ["school-ticket-info"],
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
