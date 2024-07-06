<template>
  <section>
    <div class="flex flex-col items-center justify-center py-28 gap-10" data-aos="fade-left" data-aos-duration="2000">
        <div class="image sm:w-96 w-72" >
            <img src="../../../../assets/Logo/Logo.png" class="drop-shadow-2xl">
        </div>
        <div class="WelcomMessage text-2xl sm:text-5xl text-customLightPurple font-bold" >
          <span >اهلا بك في نظام درب التعليمي</span>
        </div>

        <div class="Auth flex flex-col justify-center sm:w-4/12 w-7/12 gap-6 mt-7 cursor-pointer relative"  >
            <div class="absolute flex flex-col sm:top-5 top-0 sm:-right-20 -right-14">
              <i class="fa-regular fa-angles-left text-3xl text-customLightPurple animate-left"></i>
            </div>
            <button @click="this.$router.push('/Darb/Signup')" >
              انشاء حساب جديد
            </button>
          <div class="relative">
            <span class="  flex items-center justify-center sm:text-2xl text-xl  border-2 border-customLightPurple sm:p-5 p-1 rounded-full text-customLightPurple" @click="this.$router.push('/Darb/Login')">
              تسجيل الدخول
            </span>
            <i class="fa-regular fa-angles-left absolute sm:top-5 top-0 sm:-right-20 -right-14 text-3xl text-customLightPurple animate-left"></i>
          </div>
        </div>
    </div>
  </section>
</template>
<script setup>

</script>
<style scoped>
@import url("./Home.css");
@import url("../../../../UI/CustomsCss/Custombutton.css");
</style>