<template>
  <NavBar_View></NavBar_View>
  <section class="m-6 sm:m-16 " data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col text-xl ">
      <div class="flex items-center justify-between">
        <div class="flex flex-col ">
          <span class="sm:text-3xl text-2xl text-customDarkPurple">بيانات الطلب </span>
          <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
        </div>
        <div class="flex flex-col w-3/12">
          <button @click="this.$router.push('/Darb/Dashboard/Children')" class="flex items-center justify-around">
            الرجوع الي قائمة الطلبات <i class="fa-duotone fa-arrow-left"></i>
          </button>
        </div>
      </div>

      <div class="bg-customSearch shadow-2xl p-2 sm:p-5 mt-6 rounded-xl space-y-5">
          <div class="flex items-center ">
            <label for="in2" class=" font-bold ">نوع الطلب :</label>
            <input value="تقديم" disabled id="email" type="text" class=""/>
          </div>
          <span class="bg-black w-40 md:w-80 block h-0.5 m-2"></span>
          <div class="flex flex-col space-y-5">
            <p class="font-bold"> التاريخ : <span class="font-thin">{{ timeRequest(this.request.created_at) }}</span>
            </p>
            <p class="font-bold">وقت الإرسال : <span class="font-thin">{{ dateRequest(this.request.created_at) }}</span>
            </p>

          </div>
          <span class="bg-black w-40 md:w-80 block h-0.5 m-2"></span>
          <div class="requestDescription ">
            <p class="word-spacing" >
              أتمنى أن تكونوا بخير. أنا أرغب في تقديم طلب للالتحاق بمدرستكم الرائعة لطفلي/أبنائي <span class="font-bold">[{{request.name}}]</span> للعام الدراسي القادم.

              أنا مقتنع بأن مدرستكم تقدم بيئة تعليمية محفزة ومثالية لنموهم الأكاديمي والشخصي. لديهم الرغبة الشديدة في تحقيق النجاح والتفوق، وأنا على يقين بأن مدرستكم ستوفر لهم الفرص الضرورية لتحقيق ذلك.

              أتمنى أن تلتفتوا إلى طلبي بعناية، وأن ترسلوا لي تفاصيل الإجراءات اللازمة لاستكمال عملية التقديم.

              شكراً جزيلاً لكم على وقتكم واهتمامكم، وأتطلع إلى ردكم الكريم.

              مع فائق الاحترام،
              <span>[{{request.name}}]</span>

            </p>
          </div>
          <span class="bg-black w-40 md:w-80 block h-0.5 m-2"></span>
          <div class="schools flex flex-col " >
            <span class="font-bold">المدارس التي تم الارسال لها</span>
            <div v-for="sc in request.schools" :key="sc.id" class="flex  justify-between bg-gray-300 px-32 py-5 my-5 rounded-2xl ">
              <span>{{ sc.name }}</span>
              <span v-if="status[sc.id] === 1" class="text-green-600">تم القبول</span>
              <span v-else-if="status[sc.id] === -1">قيد الانتظار</span>
              <span v-else-if="status[sc.id] === 0" class="text-red-600">تم الرفض</span>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script>

import {defineComponent} from "vue";
import NavBar_View from "../../../../../../components/Parent/NavBar.vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  components: {NavBar_View},
  data() {
    return {
      request: '',
      status: {}
    }
  },
  computed: {
    ...mapGetters(['getRequests'])
  },
  async created() {
    await this.fetchRequest();
  },
  methods: {
    ...mapActions(['FetchRequests']),
    async fetchRequest() {
      try {
        await this.FetchRequests();
        const index = this.$route.params.id;
        this.request = this.getRequests.find(
            (req) => req.id === parseInt(index)
        );
        this.request.schools.forEach((school)=>{
          this.status[school.id] = school.pivot.status;
        });
        console.log(this.status)
        console.log(this.request)
      } catch (err) {
        console.error(err);
      }
    },
    timeRequest(time) {
      const dateTime = new Date(time);
      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, '0');
      const day = String(dateTime.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;

    },
    dateRequest(date) {
      const dateTime = new Date(date);
      const hours = String(dateTime.getHours()).padStart(2, '0');
      const minutes = String(dateTime.getMinutes()).padStart(2, '0');
      const seconds = String(dateTime.getSeconds()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      return formattedTime;
    },
  }
})
</script>


<style scoped>
@import url("../../../../../../UI/CustomsCss/Custombutton.css");
.word-spacing{
  word-spacing: 10px;
}
</style>