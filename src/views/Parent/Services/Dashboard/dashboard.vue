<template>
  <NavBar></NavBar>
  <section class="p-10 kuffam text-customDarkPurple" >
    <div class="dashboard grid grid-cols-1 gap-4 m-6  relative " data-aos="fade-left" data-aos-duration="2000">
      <div @click="this.$router.push('/Darb/Requests')" class=" border-4  border-customDarkPurple cursor-pointer   bg-gray-200 center rounded-full circle  sm:flex   flex-col items-center justify-center gap-5">
          <span class="text-4xl rekkas " >قائمة الطلبات</span>
          <i class="fa-sharp fa-solid fa-code-pull-request text-5xl"></i>
      </div>
      <div class=" grid sm:grid-cols-2 grid-cols-1 gap-5 " >
        <div class="bg-gray-200 sm:h-52 h-auto rounded-2xl p-10 linear border-2 border-customDarkPurple" >
          <span class=" ">أهلاً بك في نظامنا <strong class="rekkas">درب التعليمي</strong>. يمكنك القيام بجميع الأشياء التعليمية مثل إرسال طلبات معرفة درجات ابنك، التسجيل في مدرسة، التواصل مع المعلمين، الاطلاع على المناهج الدراسية، والمشاركة في الأنشطة التعليمية المختلفة، وغيرها. </span>
        </div>
        <div class="bg-gray-200 sm:h-52 h-auto rounded-2xl p-10 linear border-2 border-customDarkPurple" >
          <div class="flex sm:flex-nowrap flex-wrap items-center px-4 ">
            <span> توفر داخل النظام روبوت دردشة يسمى<strong class="px-1">DarbChatBot</strong> يمكنه مساعدتك في فهم <span></span>  النظام بشكل أفضل وتحسين تجربتك في التعامل معه. <strong class="px-1">DarbChatBot</strong>  جاهز للإجابة على استفساراتك وتقديم الإرشادات اللازمة لمساعدتك على استخدام جميع ميزات النظام بكفاءة وسهولة</span>
            <img src="../../../../assets/Parent/chatbot.png" class="sm:w-40">
          </div>

        </div>
      </div>
      <div class=" grid sm:grid-cols-2 grid-cols-1 gap-5">
          <div class="bg-gray-200 sm:h-52 h-auto rounded-2xl text-3xl p-10 flex items-center justify-around linear2 border-2 border-customDarkPurple" >
            <div class="flex flex-col item-center justify-center">
              <span class="text-3xl rekkas">{{GetParent.name}}</span>
              <div class="flex flex-col">
                <span class="text-xl">اخر ميعاد زيارة</span>
                <span class="text-xl">يوم <strong class="text-black text-xl">{{GetParent.last_login}}</strong></span>
              </div>
            </div>
            <div>
              <img src="../../../../assets/Logo/Profile.png" class="sm:w-40 w-20">
            </div>
          </div>

        <div class="bg-gray-200 sm:h-52 h-auto rounded-2xl linear2 border-2 border-customDarkPurple" >
          <div class="flex items-center justify-center flex-col text-center p-5">
            <i class="fa-regular fa-school text-6xl p-5"></i>
            <span>
              سيتوفر العديد من المدارس الحديثة والمتقدمة داخل النظام في أقرب وقت، مما يوفر بيئة تعليمية متطورة تلبي احتياجات الطلاب وتدعم تطوير مهاراتهم الأكاديمية.
            </span>

          </div>

        </div>
      </div>
    </div>
  </section>
</template>
<script>
import NavBar from "../../../../components/Parent/NavBar.vue";
import {mapActions, mapGetters} from "vuex";
export default {
  components:{
    NavBar
  },
  computed: {
    ...mapGetters(['GetParent'])
  },
   created() {
     this.FetchParent();
  },
  methods:{
    ...mapActions(['FetchParent']),
  },
}
</script>
<style scoped>
.rekkas {
  font-family: Rakkas;
}
.kuffam{
  font-family: "Kufam", sans-serif;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.circle {
  transition:  0.4s ease-in-out;
  transform-origin: center center;
  width: 13rem;
  height: 13rem;
}
.circle:hover {
  width: 15rem;
  height: 15rem;
  background:#5C2C7E;
  color: white;
}
@media (max-width: 1000px) {
  .circle{
    display: none;
  }
}
</style>