import { createRouter, createWebHistory } from "vue-router";
import NotFound from '../../components/School/NotFound.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/school/login",
            component: () => import("../../views/School/Auth/Login/login.vue"),
            meta: { title: "تسجيل الدخول | نظام درب التعليمي" },
        },
        {
            path: "/school/login/forget-password",
            component: () => import("../../views/School/Auth/Forget_Password/Forget.vue"),
            meta: { title: "إعادة تعيين كلمة المرور | نظام درب التعليمي" },
        },
        {
            path: "/school/reset-password/:token",
            component: () => import("../../views/School/Auth/Reset_Password/reset.vue"),
            meta: { title: "إعادة تعيين كلمة المرور | نظام درب التعليمي" },
            props: true,
        },
        {
            path: "/school/home",
            component: () => import("../../views/School/Services/Home/home.vue"),
            meta: {
                title: "الرئيسية | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["darb-school-home"],
            },
        },
        {
            path: "/school-account/profile",
            component: () => import("../../views/School/Profile/profile.vue"),
            meta: {
                title: "الملف الشخصي | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["school-account-profile"],
            },
        },
        {
            path: "/school/reports",
            component: () => import("../../views/School/Services/Reports/reports.vue"),
            meta: {
                title: "التقارير | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["school-reports"],
            },
        },
        {
            path: "/school/services/reports/report-info/:id",
            component: () => import("../../views/School/Services/Reports/Report-Info/report-info.vue"),
            meta: {
                title: "بيانات التقرير | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["school-report-info"],
            },
        },
        {
            path: "/school/students",
            component: () => import("../../views/School/Services/Students/students.vue"),
            meta: {
                title: "قائمة الطلاب | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["school-students"],
            },
        },
        {
            path: "/school/services/students/student-info/:id",
            component: () => import("../../views/School/Services/Students/Info_Student/InfoStudent.vue"),
            meta: {
                title: "بيانات الطالب | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["school-student-info"],
            },
        },
        {
            path: "/school/services/students/student-grades/:id",
            component: () => import("../../views/School/Services/Students/Info_Student/student-grades.vue"),
            meta: {
                title: "كشف درجات الطالب | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["school-student-grades"],
            },
        },
        {
            path: "/school/teachers",
            component: () => import("../../views/School/Services/Teachers/Teachers.vue"),
            meta: {
                title: "قائمة المُعلمين | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["school-teachers"],
            },
        },
        {
            path: "/school/teachers/add-teacher",
            component: () => import("../../views/School/Services/Teachers/Add_Teacher/AddTeacher.vue"),
            meta: {
                title: "إضافة مُعلم | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["enroll-teacher"],
            },
        },
        {
            path: "/school/teachers/teacher-info/:id",
            component: () => import("../../views/School/Services/Teachers/Info_Teacher/TeacherInfo.vue"),
            meta: {
                title: "بيانات المُعلم | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["teacher-info"],
            },
        },
        {
            path: "/school/teachers/edit-teacher-info/:id",
            component: () => import("../../views/School/Services/Teachers/Edit_Teacher/Edit_TeacherInfo.vue"),
            meta: {
                title: "تعديل بيانات المُعلم | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["edit-teacher-info"],
            },
        },
        {
            path: "/school/services/enroll-requests",
            component: () => import("../../views/School/Services/Requests/enroll-requests.vue"),
            meta: {
                title: "التقديمات | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["school-enroll-requests"],
            },
        },
        {
            path: "/school/services/enroll-requests/request-info/:id",
            component: () => import("../../views/School/Services/Requests/Request/enroll-request/enroll-request.vue"),
            meta: {
                title: "بيانات الطلب | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["enroll-request-Page"],
            },
        },
        {
            path: "/school/services/transfer-requests",
            component: () => import("../../views/School/Services/Requests/transfer-requests.vue"),
            meta: {
                title: "التحويلات | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["school-transfer-requests"],
            },
        },
        {
            path: "/school/services/transfer-requests/request-info/:id",
            component: () => import("../../views/School/Services/Requests/Request/transfer-request/transfer-request.vue"),
            meta: {
                title: "بيانات الطلب | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["transfer-request-Page"],
            },
        },
        {
            path: "/school/services/withdraw-requests",
            component: () => import("../../views/School/Services/Requests/withdraw-requests.vue"),
            meta: {
                title: "طلبات السحب | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["school-withdraw-requests"],
            },
        },
        {
            path: "/school/services/withdraw-requests/request-info/:id",
            component: () => import("../../views/School/Services/Requests/Request/withdraw-request/withdraw-request.vue"),
            meta: {
                title: "بيانات الطلب | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["withdraw-request-Page"],
            },
        },
        {
            path: "/school/services/teachapps-requests",
            component: () => import("../../views/School/Services/Requests/teachapps.vue"),
            meta: {
                title: "طلبات التوظيف | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["school-teachapps-requests"],
            },
        },
        {
            path: "/school/services/teachapps-requests/request-info/:id",
            component: () => import("../../views/School/Services/Requests/Request/teachapp-request/teachapp-request.vue"),
            meta: {
                title: "بيانات الطلب | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["teachapp-request-Page"],
            },
        },
        {
            path: "/school/services/sc-events",
            component: () => import("../../views/School/Services/Events/SC-Events.vue"),
            meta: {
                title: "المناسبات الخاصة بالمدرسة | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["sc-school-events"],
            },
        },
        {
            path: "/school/services/sc-events/add-event",
            component: () => import("../../views/School/Services/Events/Add_Event/add_event.vue"),
            meta: {
                title: "إضافة مناسبة | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["add-sc-event"],
            },
        },
        {
            path: "/school/services/sc-events/event-info/:id",
            component: () => import("../../views/School/Services/Events/Info_Event/SC_InfoEvent.vue"),
            meta: {
                title: "بيانات المُناسبة | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["sc-event-info"],
            },
        },
        {
            path: "/school/services/sc-events/edit-event/:id",
            component: () => import("../../views/School/Services/Events/Update_Event/updateEvent.vue"),
            meta: {
                title: "تعديل بيانات المُناسبة | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["edit-event"],
            },
        },
        {
            path: "/school/services/ad-events",
            component: () => import("../../views/School/Services/Events/AD-Events.vue"),
            meta: {
                title: "المناسبات العامة | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["ad-school-events"],
            },
        },
        {
            path: "/school/services/ad-events/event-info/:id",
            component: () => import("../../views/School/Services/Events/Info_Event/AD_InfoEvent.vue"),
            meta: {
                title: "بيانات المُناسبة | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["ad-info-event"],
            },
        },
        {
            path: "/school/services/controllers",
            component: () => import("../../views/School/Services/Controllers/Controllers.vue"),
            meta: {
                title: "مسؤولين المدرسة | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["school-controllers"],
            },
        },
        {
            path: "/school/services/controllers/add-controller",
            component: () => import("../../views/School/Services/Controllers/AddController/AddController.vue"),
            meta: {
                title: "إضافة مسؤول للمدرسة | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["add-controller"],
            },
        },
        {
            path: "/school/services/controllers/controller-info/:id",
            component: () => import("../../views/School/Services/Controllers/ControllerInfo/ControllerInfo.vue"),
            meta: {
                title: "بيانات المسؤول | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["controller-info"],
            },
        },
        {
            path: "/school/services/controllers/edit-controller/:id",
            component: () => import("../../views/School/Services/Controllers/EditController/EditController.vue"),
            meta: {
                title: "تعديل بيانات المسؤول | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["edit-controller-info"],
            },
        },
        {
            path: "/school/services/subjects",
            component: () => import("../../views/School/Services/Subjects/Subjects.vue"),
            meta: {
                title: "المناهج الدراسية | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["school-subjects"],
            },
        },
        {
            path: "/school/services/subjects/subject-info/:id",
            component: () => import("../../views/School/Services/Subjects/Subj-info/subject-info.vue"),
            meta: {
                title: "ببانات المادة | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["subject-info"],
            },
        },
        {
            path: "/school/services/subjects/subject-info/subject-studs/:id",
            component: () => import("../../views/School/Services/Subjects/Subj-info/subject-studs.vue"),
            meta: {
                title: "الطلاب المُسجلين بالمادة | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["subject-studs"],
            },
        },
        {
            path: "/school/services/technical-support",
            component: () => import("../../views/School/Services/TechnicalSupport/technical-support.vue"),
            meta: {
                title: "الدعم الفني | نظام درب التعليمي",
                requiresAuth2: true,
                roles: ["school-tickets"],
            },
        },
        {
            path: "/school/services/technical-support/ticket-info/:id",
            component: () => import("../../views/School/Services/TechnicalSupport/tech-sup-info/tech-sup-info.vue"),
            meta: {
                title: "بيانات التذكرة | نظام درب التعليمي",
                requiresAuth2: true,
                props: true,
                roles: ["school-ticket-info"],
            },
        },
        {
            path: '/:catchAll(.*)',
            meta: {
                title: "الصفحة غير موجودة- 404  | نظام درب التعليمي",
            },
            component: NotFound
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});
export function routerGuardSchool(to, from, next) {
    document.title = to.meta.title || "نظام درب التعليمي";
    const isAuthenticated = localStorage.getItem("token");

    if (to.matched.some((record) => record.meta.requiresAuth2)) {
        if (!isAuthenticated) {
            next("/darv-system/401-UnAuthorized");
        } else {
            next();
        }
    } else {
        next();
    }
}

export default router;
