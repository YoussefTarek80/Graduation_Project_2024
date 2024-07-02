<template>
  <section class="flex items-center justify-center sm:gap-40 sm:px-20 px-7" data-aos="zoom-in" data-aos-duration="2000">
    <div class="Logo">
      <img src="../../../../assets/Parent/Group%2074.png">
    </div>
    <div class="form text-center sm:w-5/12 ">
      <span class="text-customLightPurple font-bold text-3xl">انشاء حساب جديد</span>
<!--      <div class="inputGroup">-->
<!--        <input type="text" required="" autocomplete="off">-->
<!--        <label for="email">البريد الالكتروني</label>-->
<!--      </div>-->
<!--      <div class="inputGroup">-->
<!--        <input type="password" required="" autocomplete="off">-->
<!--        <label for="password"> كلمة المرور</label>-->
<!--      </div>-->
      <button class="w-full my-5" @click="this.$router.push('/Darb/ExtraInfoSignup')">
        الدخول الي تسجيل البيانات
      </button>
      <div class="text-gray-500 text-lg">
        <span>لديك حساب؟!<span class="text-customLightPurple mx-2 font-bold cursor-pointer" @click="this.$router.push('/Darb/Login')">تسجيل دخول</span></span>
      </div>
      <div class="mt-5">
        <span>بتسجيلك انت توافق علي </span><span class="text-customLightPurple  font-bold cursor-pointer">سياسات الخصوصية و الشروط و الاحكام</span>
      </div>
    </div>
  </section>
</template>
<script>

</script>
<style scoped>
@import url("../../../../UI/CustomsCss/CustomParentInput.css");
@import url("../../../../UI/CustomsCss/Custombutton.css");
@import url("./signup.css");
</style>