<template>
    <header>
        <div class="flex justify-between items-center sm:mx-24 p-4">
            <div class="sm:w-3/12 w-6/12 flex justify-center items-center">
                <img src="../../../assets/Logo/Logo4.png" alt="" />
                <i class="fa-solid fa-pipe sm:text-6xl text-2xl text-customYellow"></i>
            </div>
            <div class="relative user_Info flex flex-row-reverse items-center justify-center sm:space-x-4 space-x-2">
                <div class="sm:w-20 w-10 cursor-pointer " @click="userLogout = !userLogout">
                    <img :src="GetUser2.school_image" alt="Personal-img"
                        class=" rounded-full border-2 border-white p-1" />
                </div>
                <div class="flex flex-col text-center sm:text-xl text-xs">
                    <span>{{ GetUser2.name }}</span>
                    <span v-if="role === 'manager'" class="text-customYellow">مدير المدرسة</span>
                    <span v-else-if="role === 'staff'" class="text-customYellow">{{ roleTitle }} في المدرسة</span>
                </div>
                <div class="relative inline-block " @mouseleave="isHover = false">
                    <div>
                        <i class="fa-thin fa-bell sm:text-4xl text-2xl cursor-pointer text-white"
                            @mouseover="isHover = true"></i>
                        <i v-if="GetSCNotifications.length != 0"
                            class="fa-sharp fa-solid fa-circle text-red-300 absolute right-0 -top-1"></i>
                    </div>
                    {{ notifyCount }}
                    <div class="w-full">
                        <Notify v-if="isHover" :array="GetSCNotifications"></Notify>
                    </div>
                </div>
                <transition name="bounce">
                    <div class="bg-white w-52 z-40 text-black text-center absolute top-20 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-lg"
                        v-if="userLogout">
                        <ul>
                            <li class="hover:bg-slate-200 px-10 py-2 rounded-xl">
                                <router-link to="/school-account/profile">
                                    الملف الشخصي
                                </router-link>
                            </li>
                            <li class="hover:bg-slate-200 px-10 py-2 rounded-xl" @click="logoutUser">
                                <span v-if="!loading">تسجيل خروج</span>
                                <loading :show="loading"></loading>
                            </li>
                        </ul>
                    </div>
                </transition>
            </div>
        </div>
        <nav>
            <ul class="flex sm:items-center items-center sm:justify-evenly flex-wrap">
                <li class="sm:p-10 p-4 sm:text-xl text-sm">
                    <router-link to="/school/home">الرئيسية</router-link>
                </li>
                <li class="sm:p-10 p-4 sm:text-xl text-sm" v-if="roleTitle == 'مسؤول التصحيح'">
                    <router-link to="/school/students">قائمة الطلاب</router-link>
                </li>
                <li v-else-if="role == 'manager'" class="sm:p-10 p-4 sm:text-xl text-sm">
                    مدرستي
                    <i class="fa-sharp fa-solid fa-chevron-down m-3"></i>
                    <ul class="dropdown">
                        <li key="students">
                            <router-link to="/school/students">قائمة الطلاب</router-link>
                        </li>
                        <li key="teachers">
                            <router-link to="/school/teachers">قائمة المدرسين</router-link>
                        </li>
                        <li key=" teachers" v-if="role == 'manager'">
                            <router-link to="/school/reports">التقارير الواردة</router-link>
                        </li>
                    </ul>
                </li>
                <li v-if="role == 'manager' || roleTitle == 'مسؤول الطلبات'" class="sm:p-10 p-4 sm:text-xl text-sm">
                    الطلبات
                    <i class="fa-sharp fa-solid fa-chevron-down m-3"></i>
                    <ul class="dropdown">
                        <li>
                            <router-link to="/school/services/enroll-requests">طلبات التقديمات</router-link>
                        </li>
                        <li>
                            <router-link to="/school/services/transfer-requests">طلبات التحويلات</router-link>
                        </li>
                        <li>
                            <router-link to="/school/services/withdraw-requests">طلبات سحب الملفات</router-link>
                        </li>
                        <li>
                            <router-link to="/school/services/teachapps-requests">طلبات التوظيف</router-link>
                        </li>
                    </ul>
                </li>
                <li v-if="role == 'manager'" class="sm:p-10 p-4 sm:text-xl text-sm">
                    المناسبات
                    <i class="fa-sharp fa-solid fa-chevron-down m-3"></i>
                    <ul class="dropdown">
                        <li>
                            <router-link to="/school/services/ad-events">المناسبات الواردة من الإدارات</router-link>
                        </li>
                        <li>
                            <router-link to="/school/services/sc-events">المناسبات الخاصة بالمدرسة</router-link>
                        </li>
                    </ul>
                </li>
                <li v-if="role == 'manager'" class="sm:p-10 p-4 sm:text-xl text-sm">
                    <router-link to="/school/services/controllers">المسؤولين</router-link>
                </li>
                <li v-if="role == 'manager' || roleTitle == 'مسؤول التصحيح'" class="sm:p-10 p-4 sm:text-xl text-sm">
                    <router-link to="/school/services/subjects">المواد</router-link>
                </li>
                <li v-if="role == 'manager' || roleTitle == 'مسؤول الدعم والشكاوي'"
                    class="sm:p-10 p-4 sm:text-xl text-sm">
                    <router-link to="/school/services/technical-support">الدعم الفني</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Notify from '../../../views/School/Services/Notification/notification.vue'
export default {
    components: {
        Notify
    },
    data() {
        return {
            role: "",
            roleTitle: "",
            userLogout: false,
            loading: false,
            Notification: false,
            isHover: false,
            notifyCount: 0,
        };
    },
    computed: {
        ...mapGetters(["GetUser2", "GetSCNotifications"]),
    },
    created() {
        this.FetchScNotifications();
        console.log(this.GetSCNotifications.legnth);
        this.notifyCount = this.GetSCNotifications.legnth;
    },
    mounted() {
        this.role = localStorage.getItem('role');
        this.roleTitle = localStorage.getItem('staff_role');
    },
    methods: {
        ...mapActions(["logoutSC", "FetchUser2", "FetchScNotifications"]),
        async logoutUser() {
            await this.logoutSC();
            this.loading = true;
            setTimeout(() => {
                this.loading = true;
                this.$router.push("/school/login");
            }, 1000);
        },
        showNotify() {
            this.Notification = !this.Notification
        }
    },
};
</script>
<style scoped>
@import url("../../Admin/Navbar/Navbar.css");
</style>
