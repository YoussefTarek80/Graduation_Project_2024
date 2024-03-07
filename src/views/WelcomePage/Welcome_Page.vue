<template>
    <section
        class="flex flex-col sm:items-center sm:justify-center sm:py-0 py-10 gap-10"
    >
        <div
            class="flex flex-col items-center justify-center gap-4 text-center relative"
        >
            <span class="sm:text-6xl text-2xl font-bold gradient-text"
                >اهلا بك في نظام درب التعليمي</span
            >
            <span class="sm:text-2xl text-xl gradient-text"
                >تريد تسجيل الدخول ك</span
            >
            <div class="absolute w-72 top-28">
                <img src="../../assets/arrows.png" alt="" />
            </div>
        </div>
        <div
            class="roles flex flex-wrap items-center justify-center sm:gap-x-80 gap-10"
        >
            <div
                @click="School"
                class="role flex flex-col items-center justify-center text-black sm:px-20 sm:py-10 px-10 py-5 text-2xl rounded-2xl border-8 border-customPurple"
            >
                <i
                    class="fa-sharp fa-light fa-school text-6xl p-10 rounded-full  text-customPurple border-4 border-customPurple"
                ></i>
                <span class="p-4 text-3xl font-bold">مدرسة</span>
            </div>
            <div
                @click="Admin"
                class="role flex flex-col items-center justify-center text-black sm:px-20 sm:py-10 px-10 py-5 text-2xl rounded-2xl border-8 border-customPurple"
            >
                <i
                    class="fa-solid fa-user-tie text-6xl p-10 rounded-full  text-customPurple border-4 border-customPurple"
                ></i>
                <span class="p-4 text-3xl font-bold">ادارة</span>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data(){
        return{
            admin:'admin',
            school:'school'
        }
    },
    methods: {
        Admin() {
            this.$router.push('/Login')
            localStorage.setItem('role',this.admin);
        },
        School() {
            this.$router.push('/Login')
            localStorage.setItem('role',this.school);
        },
    },
};
</script>
<style scoped>
@import url("./Welcome_Page.css");
</style>
