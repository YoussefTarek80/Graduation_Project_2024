<template>
  <NavBar_View></NavBar_View>
  <section class="py-10 px-20" data-aos="fade-left" data-aos-duration="1000">
    <div>
      <div class="flex flex-col ">
        <span class="sm:text-4xl text-2xl text-customDarkPurple">الدعم والشكاوي</span>
        <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
      </div>
      <div class="p-10">
        <p>يمكنك التحدث إلى الدعم أو إضافة شكوى من خلال هذه الصفحة بسهولة. لدينا فريق دعم عملاء متاح دائمًا لمساعدتك في
          حال كان لديك أي استفسارات أو مشكلات. كل ما عليك فعله هو النقر على زر الدعم أو تعبئة نموذج الشكوى وسنقوم بالرد
          عليك في أقرب وقت ممكن. نحن نهتم بتقديم أفضل خدمة لكل عميل، لذا لا تتردد في الاتصال بنا إذا كنت بحاجة إلى
          مساعدة</p>
      </div>
      <div class="cards flex items-center justify-evenly">
        <div class="card flex flex-col h-80 w-80 shadow-2xl rounded-2xl items-center justify-evenly p-5">
          <div class="flex items-center gap-10">
            <span class="text-2xl text-customDarkPurple font-bold">الدعم</span>
            <i class="fa-duotone fa-headset text-6xl"></i>
          </div>
          <button class="w-full">عرض التذاكر</button>
        </div>
        <div class="card  flex flex-col h-80 w-80 shadow-2xl rounded-2xl items-center justify-evenly p-5 ">
          <div class="flex items-center justify-evenly w-full">
            <span class="text-2xl text-customDarkPurple font-bold">الشكوي</span>
            <img src="../../../../assets/Parent/complaint.png" class="w-16">
          </div>
          <button class="w-full">عرض الشكاوي</button>
        </div>
      </div>
      <!--      <div class="my-10" v-for="q in support" :key="q.id">-->
      <!--        <div>-->
      <!--          <span>{{ q.question}}</span>-->
      <!--        </div>-->
      <!--        <div class="inputGroup sm:w-full w-96">-->
      <!--          <input type="text" required autocomplete="off" v-model="q.answer">-->
      <!--          <label for="password">الرد علي الرسالة</label>-->
      <!--        </div>-->
      <!--        <button @click="AddResponse(q)" class="btn btn-primary mt-4">إرسال الرد</button>-->
      <!--      </div>-->
    </div>
  </section>
</template>

<script>
import NavBar_View from "../../../../components/Parent/NavBar.vue"
import axios from "axios";

export default {
  components: {
    NavBar_View
  },
  inject: ['support'],
  data() {
    return {}
  },
  methods: {

    async AddResponse(ques) {
      try {
        const questions = {
          question: ques.question,
          answer: ques.answer
        };
        const response = await axios.post(
            "http://127.0.0.1:5000/teach",
            questions,
            {
              headers: {
                "Access-Control-Allow-Origin": "*"
              }
            }
        );
        console.log(response.data.response);
        this.answer = '';
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
@import url("../../../../UI/CustomsCss/CustomParentInput.css");
@import url("../../../../UI/CustomsCss/Custombutton.css");
@import "./support.css";
</style>
