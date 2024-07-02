<template>
  <NavView></NavView>
  <section class="sm:px-20 px-10 sm:pt-52 pt-32 " data-aos="zoom-in" data-aos-duration="2000">
    <div class="flex flex-col ">
      <span class="text-4xl font-bold py-7 text-customOrange">تواصل بنا</span>
      <span class="text-xl">لا تتردد في إرسال استفسارك أو أي شيء تريد معرفته عن نظام درب. نحن هنا لمساعدتك!</span>
      <hr class="m-7">
    </div>
    <div class="flex flex-wrap items-center justify-between flex-row-reverse  my-20 supportPage relative">
      <div class="w-5/12 sm:block hidden">
        <img src="../../../assets/LandingPage/Contact us-pana.png" class="" >
      </div>
      <form action="" class="sm:w-6/12 w-full flex flex-col gap-5">
          <div class="inputGroup">
            <input type="text" required="" autocomplete="off">
            <label for="email">البريد الالكتروني</label>
          </div>
          <div class="inputGroup">
            <textarea type="text" required="" autocomplete="off" class="resize-none h-80" ></textarea>
            <label for="email"> اكتب الاستفسار التي تريد ان ترسله</label>
          </div>
          <button class="button2 text-center mx-auto w-6/12" :class="{ disabledBtn: invalid }" :disabled="invalid"  @click="sendMessage">
            ارسال الاستفسار
            <i class="fa-sharp fa-solid fa-paper-plane-top"></i>
          </button>
      </form>
      <base-teleport :show="acceptSend" class="">
          <span class="text-green-600 flex flex-col gap-5">
                      تم الارسال بنجاح
            <i class="fa-sharp fa-solid fa-badge-check text-6xl"></i>
          </span>
      </base-teleport>
    </div>

  </section>
  <FooterView></FooterView>
</template>
<script >
import NavView from "../../../components/LandingPage/NavBar.vue";
import FooterView from "../../../components/LandingPage/Footer.vue";
import AlertSuccess from "../../../UI/AlertSuccess.vue";
import BaseTeleport from "../../../UI/BaseTeleport.vue";
export default {
  components: {BaseTeleport, FooterView, NavView,AlertSuccess},
  data(){
    return{
      acceptSend:false,
      invalid:true
    }
  },
  methods:{
    sendMessage(){
      this.acceptSend=true;
      setTimeout(()=>{
        this.acceptSend=false;
      },2000)
    }
  }
}
</script>
<style scoped>
@import url('../../../UI/CustomsCss/CustomParentInput.css');
@import url('../../../UI/CustomsCss/CustombuttonOrange.css');
.supportPage{
    background: url("../../../assets/LandingPage/image 70.png");
    background-repeat: no-repeat;
    background-size: cover;

}
</style>