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
            path: "/Darb/Requests",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Requests.vue"),
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
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Enroll/ShowRequest/showChild.vue"),
            meta: { title: "Darb", auth: true },
        },
        {
            path: "/Darb/Dashboard/Children/AddChild",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Enroll/AddRequest/addChild.vue"),
            meta: { title: "Darb", auth: true },
        },
        {
            path: "/Darb/Dashboard/Child/:id",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Enroll/InfoRequest/info-child.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Dashboard/Child/update/:id",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Enroll/UpdateRequest/update-child.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Dashboard/Transfer",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Transfer/transfer.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Dashboard/Transfer/:id",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Transfer/AddTransfer/Add_Transfer.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Dashboard/Transfer/Search",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Transfer/TransferState/transfer-state.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Assistant",
            component: () => import("../../views/Parent/Services/Assistant/assistant.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Assistant/Support",
            component: () => import("../../views/Parent/Services/Assistant/Support/ShowTickets/support.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Assistant/Support/AddTicket",
            component: () => import("../../views/Parent/Services/Assistant/Support/AddTickets/add-ticket.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Assistant/Compliment",
            component: () => import("../../views/Parent/Services/Assistant/Compliemnt/ShowTickets/compliemnt.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Assistant/Compliment/AddCompliment",
            component: () => import("../../views/Parent/Services/Assistant/Compliemnt/AddTickets/add-ticket.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Dashboard/Withdraw",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Withdraw/withdraw.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Dashboard/Withdraw/pdf/:id",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Withdraw/makePDF/make-pdf.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/Notifications",
            component: () => import("../../views/Parent/Services/Notification/notification.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/ShowGrade",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Grades/ShowGrades.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/ShowGrade/GradeData/:id",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Grades/childGradeData/GradeData.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
        {
            path: "/Darb/ShowGrade/Events",
            component: () => import("../../views/Parent/Services/Dashboard/Requests/Events/EventList.vue"),
            meta: { title: "Darb", auth: true },
            props: true
        },
    ],
});

export function routerGuardParent(to, from, next) {

    const token = sessionStorage.getItem("token");
    const requiresAuth = to.matched.some(record => record.meta.auth);
    if (requiresAuth && !token) {
        next("/Darb");
    } else {
        next();
    }
}

export default router;
