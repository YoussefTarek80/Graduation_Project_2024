<template>
    <div class="body flex flex-col justify-center items-center h-screen">
        <div
            class="box relative shadow-2xl sm:w-5/12 w-11/12 m-6 sm:h-5/6 h-4/6 flex flex-col items-center justify-center rounded-3xl text-sm">
            <div class="sm:w-7/12 w-8/12">
                <img src="../../../../assets/Logo/Logo5.png" alt="" />
            </div>
            <form class="w-11/12 space-y-4 flex flex-col" @submit.prevent="SendRequest">
                <div class="flex flex-col">
                    <label for="email" class="my-2 mx-2">البريد الالكتروني<span class="text-red-600">*</span></label>
                    <input id="email" v-model="email" placeholder="البريد الالكتروني" type="email"
                        class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none" @input="Invalid_Data" />
                </div>
                <button class="border-2 border-solid px-2 py-4 rounded-full text-lime-50 text-xl"
                    :class="{ disabledBtn: invalid }" :disabled="invalid">
                    <span v-if="!loading">ارسال</span>
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
                <template v-slot:messageError> الايميل غير موجود </template>
            </AlertError>
        </transition>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            email: "",
            invalid: false,
            login_Failed: false,
            loading: false,
            security: false,
        };
    },
    computed: {
        getDate() {
            return new Date().getFullYear();
        },
        currentDate() {
            return this.getDate;
        },
    },
    mounted() {
        this.Invalid_Data();
    },
    methods: {
        Invalid_Data() {
            if (this.email.trim() === "") {
                this.invalid = true;
            } else {
                this.invalid = false;
            }
        },
        loading_Fun() {
            this.loading = true;
            this.security = true;
            setTimeout(() => {
                this.loading = false;
                this.security = false;
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
            }, 3000);
        },
        async SendRequest() {
            this.loading = true;
            this.security = true;
            await axios
                .post("http://127.0.0.1:8000/api/school/forgot-password", {
                    email: this.email,
                })
                .then((response) => {
                    console.log(response.data.da);
                    console.log("Successful Send");
                    const data = response.data.data;
                    console.log(data.name);
                    this.loading = false;
                    this.security = false;
                    this.$router.push("/school/login/");
                })
                .catch((error) => {
                    console.error("Login error:", error);
                    this.Handle_Error();
                });
            this.clear();
        },
    },
};
</script>
<style scoped>
@import url("../../../../UI/CustomsCss/Custombutton.css");
@import url("../Login/login.css");
</style>
