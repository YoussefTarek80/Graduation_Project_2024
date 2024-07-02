<template>
  <section class="flex items-center justify-center sm:gap-40 sm:px-20 px-7" data-aos="zoom-in" data-aos-duration="2000">
    <div class="Logo">
      <img src="../../../../assets/Parent/Group%2074.png">
    </div>
    <div class="form text-center sm:w-5/12 ">
      <span class="text-customLightPurple font-bold text-3xl">تسجيل الدخول</span>
      <form @submit.prevent>
        <div class="inputGroup">
          <input type="text" required="" autocomplete="off" v-model="email" @input="isValid">
          <label for="email">البريد الالكتروني</label>
        </div>
        <div class="inputGroup">
          <input type="password" required="" autocomplete="off" v-model="password" @input="isValid">
          <label for="password"> كلمة المرور</label>
        </div>
        <div class="text-end cursor-pointer">
          <span class="underline">نسيت كلمة المرور!</span>
        </div>
        <button class="w-full my-5" @click="Login" :class="{ disabledBtn: open }"
                :disabled="open">
          انطلق!
        </button>
        </form>
      <div class="text-gray-500 text-lg">
        <span>ليس لديك حساب؟!<span class="text-customLightPurple mx-2 font-bold cursor-pointer"
                                   @click="this.$router.push('/Darb/Signup')">لننشأ حساب جديدا</span></span>
      </div>
    </div>
    <transition name="slide-fade">
      <AlertError class="absolute left-0 top-0 m-4" v-if="login_Failed">
        <template v-slot:messageError> البيانات خاطئة </template>
      </AlertError>
    </transition>
  </section>
</template>
<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      login_Failed:false,
      open: true
    }
  },
  created(){
    this.isValid()
  },
  methods: {
    ...mapActions(['ParentLogin']),
    isValid() {
      if (this.email === "" || this.password === "") {
        this.open = true;
      } else {
        this.open = false;
      }
    },
    async Login() {
      try {
        await this.ParentLogin({email: this.email, password: this.password});
        this.$router.push('/Darb/Dashboard');
      } catch (err) {
        console.log(err);
        this.login_Failed=true
        setTimeout(()=>{
          this.login_Failed=false
        },2000)
      }
    }
  }
}
</script>

<style scoped>
@import url("../../../../UI/CustomsCss/CustomParentInput.css");
@import url("../../../../UI/CustomsCss/Custombutton.css");
@import url("./login.css");
</style>