<template>
  <NavView></NavView>
  <section class="  pt-40 DarbDeatils" id="DarbDetails" data-aos="zoom-in" data-aos-duration="2000">
    <div class="flex  items-center justify-center p-20 gap-32">
      <div class="text-center text-xl flex flex-col items-center justify-center">
        <span class="font-bold text-xl ">يمكنك التسجيل لنظامنا من خلال الويب الخاص بنا</span>
        <span class="w-10 bg-customOrange h-1 block"></span>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button class="bg-customOrange text-white p-5 w-72 text-xl rounded-2xl mt-10" @click="this.$router.push('/Convert/Page')"><i class="fa-brands fa-windows mx-3"></i>تطبيق الويب</button>
        </div>
      </div>
      <div class="text-center text-xl flex flex-col items-center justify-center">
        <span class="font-bold text-xl ">يمكنك التسجيل ك معلم من خلال التقديم من هنا  </span>
        <span class="w-10 bg-customOrange h-1 block"></span>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button class="bg-customOrange text-white p-5 w-72 text-xl rounded-2xl mt-10" @click="this.$router.push('/DarbHome/EnrollTeacher')"><i class="fa-sharp fa-solid fa-school"></i> تقديم في مدرسة</button>
        </div>
      </div>
    </div>
    <div class="p-20">
      <span class="font-bold text-xl">بعض من المدارس المتاحة حاليا</span>
      <span class="w-10 bg-customOrange h-1 block"></span>
      <div class="mt-10">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img class="rounded-t-lg" src="../../../assets/AdminLogin/BG.png" alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <FooterView></FooterView>
</template>
<script>

import {defineComponent} from "vue";
import NavView from "../../../components/LandingPage/NavBar.vue";
import DarbDeatils from "../../Parent/Services/Dashboard/DarbDeatils/Darb_deatils.vue";
import FooterView from "../../../components/LandingPage/Footer.vue";
import BaseTeleport from "../../../UI/BaseTeleport.vue";

export default defineComponent({
  components: {BaseTeleport, FooterView, DarbDeatils, NavView}
})
</script>
<style scoped>
.DarbDeatils {
  background: url("../../../assets/LandingPage/image 70.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>