<template>
  <NavView></NavView>

  <section class="home  h-screen -z-10" id="home" data-aos="zoom-in" data-aos-duration="2000">
    <img src="">
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1440 320" class=" absolute sm:-bottom-10 -bottom-0.5 w-full ">
      <path fill="#fff" fill-opacity="1"
            d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,144C840,149,960,203,1080,208C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
    </svg>
  </section>

  <section class=" sm:px-20 px-10 pt-32 " id="DarbDetails" >
    <DarbDeatils data-aos="zoom-in" data-aos-duration="1000" ></DarbDeatils>
  </section>

  <section class="DarbDeatils sm:px-20 px-10 pt-32 flex items-center justify-around flex-row-reverse" id="about_us">
    <div data-aos="fade-left" data-aos-duration="1000" class="flex flex-wrap flex-row-reverse items-center justify-between">
      <img src="../../assets/LandingPage/Group%2098.png" class="sm:w-5/12 w-full">
      <img src="../../assets/LandingPage/Group%2095.png" class="sm:w-6/12 w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.50)]">
    </div>
  </section>

  <section class="DarbDeatils sm:px-20 px-10 pt-32 pb-20" id="contact_us" >
    <div class="flex flex-wrap  items-center justify-between" data-aos="fade-left" data-aos-duration="2000">
      <div class="sm:w-6/12 text-2xl flex flex-col">
        <span class="text-4xl font-bold py-7 text-customOrange">تواصل بنا</span>
        <span>يمكنك الوصول إلى فريق الدعم الخاص بنظام "درب التعليمي" في أي وقت للحصول على إجابات مفصلة ومساعدة فورية بخصوص أي استفسارات أو أسئلة قد تكون لديك حول كيفية استخدام النظام وتحقيق أقصى استفادة من مزاياه.</span>
        <button class="bg-customOrange text-white p-5 w-80 text-xl rounded-2xl mx-auto my-10" @click="this.$router.push('/DarbHome/Support')">ارسال استفسار</button>
      </div>
      <img src="../../assets/LandingPage/Contact%20us-pana.png" class="sm:w-6/12
">
    </div>
  </section>
  <FooterView></FooterView>
</template>
<script>
import NavView from '../../components/LandingPage/NavBar.vue'
import DarbDeatils from '../../views/Parent/Services/Dashboard/DarbDeatils/Darb_deatils.vue'
import FooterView from "../../components/LandingPage/Footer.vue";

export default {
  components: {
    FooterView,
    NavView,
    DarbDeatils
  }
}
</script>
<style scoped>
.home {
  background: linear-gradient(rgba(255, 114, 94, 0), rgba(255, 114, 94, 0.45)), url("../../assets/LandingPage/High School-pana 1.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
}

.DarbDeatils {
  background: url("../../assets/LandingPage/image 70.png");
  background-repeat: no-repeat;
  background-size: cover;
}

@media (max-width: 640px) {
  .home {
    background-attachment: scroll;
    background-position: center;
    background-size: cover;
  }
}
</style>