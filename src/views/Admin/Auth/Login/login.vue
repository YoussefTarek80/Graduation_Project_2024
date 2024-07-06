<template>
    <div class="body flex flex-col justify-center items-center h-screen">
        <div data-aos="fade-right" data-aos-duration="1000"
            class="relative box shadow-2xl sm:w-5/12 w-11/12 m-6 sm:h-5/6 h-4/6 flex flex-col items-center justify-center rounded-3xl text-sm">
            <div class="sm:w-7/12 w-8/12">
                <img src="../../../../assets/Logo/Logo.png" alt="" />
            </div>
            <div class="absolute top-0 left-0 cursor-pointer " v-if="admin" @click="this.$router.push('/darb-system')">
                <i
                    class="fa-solid fa-user-tie sm:text-6xl text-4xl p-10 rounded-full text-customPurple hover:transform hover:scale-110 transition-all"></i>
            </div>
            <div class="absolute top-0 left-0 cursor-pointer" v-if="!admin" @click="this.$router.push('/darb-system')">
                <i
                    class="fa-sharp fa-light fa-school sm:text-6xl text-4xl p-10 rounded-full text-customPurple hover:transform hover:scale-110 transition-all"></i>
            </div>
            <form action="" class="w-11/12 space-y-4 flex flex-col" @submit.prevent="onSubmit">
                <div class="flex flex-col">
                    <label for="email" class="my-2 mx-2">البريد الالكتروني<span class="text-red-600">*</span></label>
                    <input id="email" v-model="email" placeholder="البريد الالكتروني" type="email"
                        class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none" @input="Invalid_Data" />
                </div>
                <div class="flex flex-col">
                    <label for="email" class="my-2 mx-2">
                        كلمة المرور <span class="text-red-600">*</span></label>
                    <input id="password" v-model="password" placeholder="كلمة المرور" type="password"
                        class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none" @input="Invalid_Data" />
                </div>
                <div class="text-left underline mx-4">
                    <router-link to="/Login/ForgetPass">نسيت كلمة المرور ؟</router-link>
                </div>
                <button class="" :class="{ disabledBtn: invalid }" :disabled="invalid">
                    <span v-if="!loading">تسجيل الدخول</span>
                    <loading :show="loading" />
                </button>
            </form>
        </div>
        <div class="space-x-2 text-customPink opacity-50">
            <span>جميع الحقوق محفوظة </span>
            <span><i class="fa-light fa-copyright"></i></span>
            <span>{{ currentDate }} </span>
        </div>
        <transition name="slide-fade">
            <AlertError class="absolute left-0 top-0 m-4" v-if="login_Failed">
                <template v-slot:messageError> البيانات خاطئة </template>
            </AlertError>
        </transition>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
    inject: ["array"],
    data() {
        return {
            email: "",
            password: "",
            invalid: false,
            login_Failed: false,
            loading: false,
            admin: false,
        };
    },
    computed: {
        getDate() {
            return new Date().getFullYear();
        },
        currentDate() {
            return this.getDate;
        },
        ...mapGetters(["getUser"]),
    },
    mounted() {
        this.Invalid_Data();
        this.getRole();
    },
    methods: {
        ...mapActions(["login"]),
        getRole() {
            const role = localStorage.getItem("role");
            if (role === "admin") {
                this.admin = true;
            } else {
                this.admin = false;
            }
        },
        Invalid_Data() {
            if (this.email.trim() === "" || this.password.trim() === "") {
                this.invalid = true;
            } else {
                this.invalid = false;
            }
        },
        loading_Fun() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 3000);
        },
        Handle_Error() {
            setTimeout(() => {
                this.login_Failed = true;
                this.invalid = true;
            }, 3000);
            setTimeout(() => {
                this.login_Failed = false;
            }, 5500);
        },
        clear() {
            setTimeout(() => {
                this.email = "";
                this.password = "";
            }, 3000);
        },
        async onSubmit() {
            this.loading_Fun();
            const { email, password } = this;
            try {
                await this.login({ email, password });
                this.$router.push("/Admin/Home");
            } catch (error) {
                console.error("Login error:", error);
                this.Handle_Error();
            }
            this.clear();
        },
    },
};
</script>
<style scoped>
@import url("./login.css");
@import url("../../../../UI/CustomsCss/Custombutton.css");
</style>
