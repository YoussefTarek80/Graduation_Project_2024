<template>
    <header>
        <div class="flex justify-between items-center sm:mx-24 p-4">
            <div class="sm:w-3/12 w-6/12 flex justify-center items-center">
                <img src="../../../assets/Logo/NavbarLogo.png" alt="" />
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
                <div class="relative">
                    <i class="fa-thin fa-bell sm:text-4xl text-2xl" style="color: #ffffff"></i>
                    <i class="fa-solid fa-circle text-customYellow absolute 
                        right-0 sm:text-xl text-sm sm:bottom-6 bottom-4"></i>
                </div>
                <transition name="bounce">
                    <div class="bg-white w-52 z-40 text-black text-center absolute top-20 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-lg"
                        v-if="userLogout">
                        <ul>
                            <li class="hover:bg-slate-200 px-10 py-2 rounded-xl">
                                <router-link to="/Manager/profile">
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
                    <router-link to="/School/Home">الرئيسية</router-link>
                </li>
                <li v-if="role == 'manager' || roleTitle == 'مسؤول التصحيح'" class="sm:p-10 p-4 sm:text-xl text-sm">
                    مدرستي
                    <i class="fa-sharp fa-solid fa-chevron-down m-3"></i>
                    <ul class="dropdown">
                        <li key="students">
                            <router-link to="/School/Students">قائمة الطلاب</router-link>
                        </li>
                        <li key="teachers">
                            <router-link to="/School/Teachers">قائمة المدرسين</router-link>
                        </li>
                    </ul>
                </li>
                <!-- <li v-else-if="roleTitle == 'مسؤول التصحيح'" key="teachers">
                    <router-link to="/School/Teachers">قائمة المدرسين</router-link>
                </li> -->
                <li v-if="role == 'manager' || roleTitle == 'مسؤول الطلبات'" class="sm:p-10 p-4 sm:text-xl text-sm">
                    الطلبات
                    <i class="fa-sharp fa-solid fa-chevron-down m-3"></i>
                    <ul class="dropdown">
                        <li>
                            <router-link to="/School/Services/enroll-requests">التقديمات</router-link>
                        </li>
                        <li>
                            <router-link to="/School/Services/transfer-requests">التحويلات</router-link>
                        </li>
                    </ul>
                </li>
                <li v-if="role == 'manager' || roleTitle == 'مسؤول الملفات'" class="sm:p-10 p-4 sm:text-xl text-sm">
                    المناسبات
                    <i class="fa-sharp fa-solid fa-chevron-down m-3"></i>
                    <ul class="dropdown">
                        <li>
                            <router-link to="/School/Services/AD-Events">المناسبات المُرسلة</router-link>
                        </li>
                        <li>
                            <router-link to="/School/Services/SC-Events">المناسبات الخاصة بالمدرسة</router-link>
                        </li>
                    </ul>
                </li>
                <li v-if="role == 'manager'" class="sm:p-10 p-4 sm:text-xl text-sm">
                    <router-link to="/School/Services/Controllers">المسؤولين</router-link>
                </li>
                <li v-if="role == 'manager' || roleTitle == 'مسؤول التصحيح'" class="sm:p-10 p-4 sm:text-xl text-sm">
                    <router-link to="/School/Services/Subjects">المواد</router-link>
                </li>
                <li v-if="role == 'manager' || roleTitle == 'مسؤول الدعم والشكاوي'"
                    class="sm:p-10 p-4 sm:text-xl text-sm">
                    <router-link to="/School/Services/Complaints">الدعم</router-link>
                </li>
                <li v-if="role == 'manager' || roleTitle == 'مسؤول الدعم والشكاوي'"
                    class="sm:p-10 p-4 sm:text-xl text-sm">
                    <router-link to="/School/Services/Complaints">الشكاوي</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            role: "",
            roleTitle: "",
            userLogout: false,
            loading: false,
        };
    },
    computed: {
        ...mapGetters(["GetUser2"]),
    },
    mounted() {
        this.role = localStorage.getItem('role');
        this.roleTitle = localStorage.getItem('staff_role');
        this.FetchUser2(this.role);
    },
    methods: {
        ...mapActions(["logoutSC", "FetchUser2"]),
        async logoutUser() {
            await this.logoutSC();
            this.loading = true;
            setTimeout(() => {
                this.loading = true;
                this.$router.push("/school/login");
            }, 3000);
        },
    },
};
</script>
<style scoped>
@import url("../../Admin/Navbar/Navbar.css");
</style>
