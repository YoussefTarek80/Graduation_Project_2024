<template>
    <section class="flex flex-col sm:items-center sm:justify-center sm:py-0 py-10 gap-10" data-aos="zoom-in"
        data-aos-duration="1000">
        <div class="flex flex-col items-center justify-center gap-4 text-center relative">
            <span class="sm:text-6xl text-2xl font-bold gradient-text">اهلا بك في نظام درب التعليمي</span>
            <span class="sm:text-2xl text-xl gradient-text">تريد تسجيل الدخول كـ :</span>
        </div>
        <div class="roles flex flex-wrap items-center justify-center sm:gap-x-40 gap-10">
            <div @click="School" class="role flex flex-col items-center justify-center text-black
                sm:px-20 sm:py-10 px-10 py-5 text-2xl rounded-2xl border-4 border-customPink">
                <i class="fa-sharp fa-light fa-school text-6xl p-10 rounded-full 
                    text-customPurple border-4 border-customPurple shadow-2xl"></i>
                <span class="p-4 text-3xl font-bold gradient-text">مدرسة</span>
            </div>
            <div @click="Admin" class="role flex flex-col items-center justify-center text-black
                sm:px-20 sm:py-10 px-10 py-5 text-2xl rounded-2xl border-4  border-customPink  ">
                <i class="fa-solid fa-user-tie text-6xl p-10 rounded-full 
                    text-customPurple border-4 border-customPurple shadow-2xl"></i>
                <span class="p-4 text-3xl font-bold gradient-text">ادارة</span>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            admin: 'admin',
            school: 'school'
        }
    },
    methods: {
        Admin() {
            this.$router.push('/admin/login')
            localStorage.setItem('role', this.admin);
        },
        School() {
            this.$router.push('/school/login')
            localStorage.setItem('role', this.school);
        },
    },
};
</script>
<style scoped>
@import url("./Welcome_Page.css");
</style>
