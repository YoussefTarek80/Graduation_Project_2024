<template>
    <header>
        <div class="flex justify-between items-center sm:mx-24 p-4">
            <div class="sm:w-3/12 w-6/12 flex justify-center items-center">
                <img src="../../../assets/Logo/NavbarLogo.png" alt="" />
                <i class="fa-solid fa-pipe sm:text-6xl text-2xl text-customYellow"></i>
            </div>
            <div class="relative user_Info flex flex-row-reverse items-center sm:space-x-4 space-x-2 w-full">
                <div class="sm:w-20 sm:h-20 w-10 cursor-pointer " @click="userLogout = !userLogout">
                    <img :src="GetUser.image" alt=""
                        class=" sm:w-20 sm:h-20  object-cover  rounded-full border-2 border-white p-1" />
                </div>
                <div class="flex flex-col text-center sm:text-xl text-xs">
                    <span>{{ GetUser.name }}</span>
                    <span class="text-customYellow">{{ GETrole }}</span>
                </div>
                <div class="relative inline-block " @mouseleave="isHover = false">
                    <div>
                        <i class="fa-thin fa-bell sm:text-4xl text-2xl cursor-pointer" @mouseover="isHover = true"
                            style="color: #ffffff"></i>
                        <i class="fa-sharp fa-solid fa-circle text-customYellow absolute right-0 -top-1"></i>
                    </div>
                    <div class="w-full">
                        <Notify v-if="isHover" class=""></Notify>
                    </div>

                </div>
                <transition name="bounce">
                    <div class="bg-white w-52 z-40 text-black text-center absolute top-20 left-5 rounded-tr-2xl  rounded-bl-2xl rounded-br-2xl    shadow-lg"
                        v-if="userLogout">
                        <ul>
                            <li class="hover:bg-slate-200 px-10 py-2 rounded-xl">
                                <router-link to="/Admin/profile">
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
                    <router-link to="/Admin/Home">الرئيسية</router-link>
                </li>
                <li class="sm:p-10 p-4 sm:text-xl text-sm">
                    المدارس
                    <i class="fa-sharp fa-solid fa-chevron-down m-3"></i>

                    <ul class="dropdown">
                        <li key="schools">
                            <router-link to="/Admin/Schools">قائمة المدارس</router-link>
                        </li>
                        <li key="students">
                            <router-link to="/Admin/Students">قائمة الطلاب</router-link>
                        </li>
                        <li key="school3">
                            <router-link to="/Admin/Teacher">قائمة المدرسين</router-link>
                        </li>
                        <li key="school4">
                            <router-link to="/Admin/Request">قائمة الطلبات</router-link>
                        </li>
                    </ul>
                </li>
                <li class="sm:p-10 p-4 sm:text-xl text-sm">
                    المواد
                    <i class="fa-sharp fa-solid fa-chevron-down m-3" :class="{
                    'rotate-180 transition-all duration-500 ease-in-out transform':
                        hover,
                }"></i>
                    <transition-group name="fade">
                        <ul class="dropdown">
                            <li key="2">
                                <router-link to="/Admin/Subjects">المناهج الدراسية</router-link>
                            </li>
                        </ul>
                    </transition-group>
                </li>
                <li class="sm:p-10 p-4 sm:text-xl text-sm">
                    <router-link to="/Admin/Event">المناسبات</router-link>
                </li>
                <li class="sm:p-10 p-4 sm:text-xl text-sm">
                    <router-link to="/Admin/Reports">التقارير</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Notify from '../../../views/Admin/Services/Notification/notification.vue'
export default {
    components: {
        Notify
    },
    data() {
        return {
            userLogout: false,
            loading: false,
            Notification: false,
            isHover: false
        };
    },
    computed: {
        ...mapGetters(["GetUser"]),
        GETrole() {
            if (localStorage.getItem("role") === 'admin') {
                return 'مسئول ادارة'
            }
        }
    },
    mounted() {
        this.FetchUser();
    },
    methods: {
        ...mapActions(["logout", "FetchUser"]),
        async logoutUser() {
            await this.logout();
            this.loading = true;
            setTimeout(() => {
                this.loading = true;
                this.$router.push("/login");
            }, 3000);
        },
        showNotify() {
            this.Notification = !this.Notification
        }
    },
};
</script>
<style scoped>
@import url("./Navbar.css");
</style>
