<template>
    <div class="body flex flex-col justify-center items-center h-screen">
        <div
            class="box shadow-2xl sm:w-5/12 w-11/12 m-6 sm:h-5/6 h-4/6 flex flex-col items-center justify-center rounded-3xl text-sm"
        >
            <div class="sm:w-7/12 w-8/12">
                <img src="../../../../assets/Logo/Logo.png" alt="" />
            </div>
            <form
                action=""
                class="w-11/12 space-y-4 flex flex-col"
                @submit.prevent="resetPassword"
            >
                <div class="flex flex-col">
                    <label for="email" class="my-2 mx-2"
                        >البريد الالكتروني<span class="text-red-600"
                            >*</span
                        ></label
                    >
                    <input
                        id="email"
                        v-model="email"
                        placeholder="البريد الالكتروني"
                        type="email"
                        class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none"
                        @input="Invalid_Data"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="email" class="my-2 mx-2">
                        كلمة المرور <span class="text-red-600">*</span></label
                    >
                    <input
                        id="password"
                        v-model="pass"
                        placeholder="كلمة المرور"
                        type="password"
                        class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none"
                        @input="Invalid_Data"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="email" class="my-2 mx-2">
                        تاكيد كلمة المرور
                        <span class="text-red-600">*</span></label
                    >
                    <input
                        id="password"
                        v-model="conf_pass"
                        placeholder="كلمة المرور"
                        type="password"
                        class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none"
                        @input="Invalid_Data"
                    />
                </div>
                <button
                    class=""
                    :class="{ disabledBtn: invalid }"
                    :disabled="invalid"
                >
                    <span v-if="!loading">تغيير كلمة المرور</span>
                    <loading :show="loading" />
                </button>
            </form>
        </div>
        <transition name="slide-fade">
            <AlertError class="absolute left-0 top-0 m-4" v-if="change_Failed">
                <template v-slot:messageError> كلمة المرور غير متشابهه او البريد الالكتروني غير صحيح</template>
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
            pass: "",
            conf_pass: "",
            invalid: false,
            loading: false,
            change_Failed: false,
        };
    },
    mounted() {
        this.Invalid_Data();
    },
    methods: {
        Invalid_Data() {
            if (
                this.email.trim() === "" ||
                this.pass.trim() === "" ||
                this.conf_pass.trim() === ""
            ) {
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
                this.change_Failed = true;
                this.invalid = true;
            }, 3000);
            setTimeout(() => {
                this.change_Failed = false;
            }, 5500);
        },
        async resetPassword() {
            try {
                this.loading_Fun();
                await axios.post("http://127.0.0.1:8000/api/reset-password", {
                    token: this.$route.params.token,
                    email: this.email,
                    password: this.pass,
                    password_confirmation: this.conf_pass,
                });
                localStorage.removeItem('token')
                this.$router.push("/Login");
            } catch (err) {
                console.log(err);
                this.Handle_Error();
            }
        },
    },
};
</script>
<style scoped>
@import url("../Login/login.css");
@import url("../../../../UI/Custombutton.css");
</style>
