<template>
    <div>
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
</template>

<script></script>

<style scoped></style>