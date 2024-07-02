<template>
  <div>
    <sc-navbar-comp></sc-navbar-Comp>

    <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
      <BaseTeleport :show="success">
        <div class="flex flex-col">
          <span class="text-green-700 text-4xl"> تم التحويل بنجاح </span>
          <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
        </div>
      </BaseTeleport>
      <BaseTeleport :show="failed">
        <div class="flex flex-col">
          <span class="text-red-700 text-4xl"> فشل الإرسال</span>
          <i class="fa-sharp fa-solid fa-badge-check text-red-700 text-7xl m-3"></i>
        </div>
      </BaseTeleport>
    </section>

    <section class="flex flex-col items-center w-full mt-6" data-aos="fade-up" data-aos-duration="1000">
      <div class="flex flex-col mb-5">
        <span class="sm:text-3xl text-2xl font-bold">بيانات الطلب </span>
        <span class="w-11/12 h-1 bg-black m-1 rounded-2xl"></span>
      </div>

      <stud_form :form="request">
      </stud_form>
      <!-- <div class="p-2 sm:p-5 mt-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="flex flex-col">
            <label for="in1" class="mx-3.5 font-bold">إسم المُرسِل </label>
            <input v-model="request.parent_name" disabled id="email" type="text" class="item-data" />
          </div>
          <div class="flex flex-col">
            <label for="in2" class="mx-3.5 font-bold">نوع الطلب </label>
            <input v-model="request.type" disabled id="email" type="text" class="item-data" />
          </div>
        </div>
        <div class="flex flex-col sm:overflow-hidden overflow-auto ">
          <section disabled id="desc" type="text" class="leading-8 tx-era resize-none p-5 sm:p-5 border-2 rounded-xl">
            <p>إلى : <span>{{ "مصطفي كامل" }}</span>
            <p>العنوان : <span>{{ this.request.name }}</span></p>
            التاريخ : <span> {{ this.request.date.day + '/' + this.request.date.month + '/' +
        this.request.date.year }}</span></p>
            <p>وقت الإرسال : <span>{{ this.request.time.hrs + ':' + this.request.time.mins + ':' +
        this.request.time.secs }}</span></p>
            <p>الموضوع : طلب تحويل طالب من مدرسة إلى مدرسة</p><br>
            <span class="bg-black w-40 md:w-80 block h-0.5 m-2"></span>
            <p class="font-bold">السيد/السيدة مدير/ة ,<span>{{ this.request.name }}</span></p>
            <p>أتقدم إلى مقامكم الموقر بطلب تحويل ابني/ابنتي <span class="font-bold">{{ this.request.studname }}</span>
              ، الذي يدرس حاليًا في الصف <span>{{ this.request.level }}</span>
              بمدرسة <span>{{ this.request.currSchool }}</span>
              ، إلى مدرستكم الموقرة ابتداءً من العام الدراسي القادم <span>{{ this.request.schoolYear }}</span>.</p>
            <p>
              نظرًا لظروف <span class="font-bold">{{ this.request.reason }}</span>،
              نجد أنه من
              الضروري أن يستمر <span>{{ this.request.name }}</span>
              في تعليمه بمدرسة أقرب إلى مكان إقامتنا الجديد/أن توفر له البيئة
              التعليمية
              المناسبة التي تتماشى مع احتياجاته الخاصة.</p>
            <p>أرجو منكم النظر في طلبي هذا والموافقة عليه. نحن مستعدون لتقديم جميع الوثائق اللازمة لإتمام عملية التحويل
              ومتابعة أي إجراءات مطلوبة من جانبنا. <br>
              نشكركم مقدمًا على تعاونكم وتفهمكم لموقفنا، ونتطلع إلى تقديم تجربة تعليمية مثمرة لابننا/ابنتنا في مدرستكم.
            </p>
            <p>مع خالص الشكر والتقدير، <br>
              <span class="bg-black w-40 md:w-80 block h-0.5 m-2"></span>
            <p>إسم ولي الأمر : <span class="">{{ this.request.parent_name }}</span></p>
            <p>التوقيع : <span class="font-mono font-bold ">{{ this.request.parent_name }}</span></p>
            <p>تفاصيل الاتصال بولي الأمر : <span>{{ this.request.parent_email + ' - (' + this.request.parent_phone + ')'
                }}</span>
            </p>
            </p>
            <span class="bg-black w-40 md:w-80 block h-0.5 m-2"></span>
          </section>
        </div>
      -->
      <div class="flex flex-row flex-wrap justify-center"
        v-if="request.status == -1 && request.old_school != GetUser2.school_id">
        <div class="m-5">
          <button @click="accept()" class="w-25 sm:w-40 md:w-60">موافقة</button>
        </div>
        <div class="m-5">
          <button @click="reject()" class="w-25 sm:w-40 md:w-60">رفض</button>
        </div>
      </div>
      <div>
        <div class="m-5">
          <button @click="confirmTransfer()" v-if="request.status == 1" class="w-25 sm:w-40 md:w-80">
            تأكيد التحويل وحذف الطالب
          </button>
        </div>
      </div>
    </section>
    <Footer_Component></Footer_Component>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import stud_form from "./stud-data.vue";
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      request: {},
      accepted: false,
      success: false,
      failed: false,
    }
  },
  components: {
    stud_form,
  },
  computed: {
    ...mapGetters(['GetUser2', 'Get_SCTRequests']),
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions(['FetchTRequests', 'AcceptTransferStudent']),
    initData() {
      this.request = this.Get_SCTRequests[this.$route.params.id];
    },
    async fetchData() {
      try {
        await this.FetchTRequests();
        this.initData();
        console.log(this.request);
      }
      catch (error) {
        throw `Something went wrong! ${error}`;
      }
    },
    async accept() {
      try {
        const form = new FormData();
        form.append('status', 1);
        await this.AcceptTransferStudent({ id: this.request.id, status: form });
        this.fetchData();
        this.success = true;
        setTimeout(() => { this.success = false; }, 1000);
      }
      catch (err) {
        console.log(err);
        this.failed = true;
        setTimeout(() => {
          this.failed = false;
        }, 1000);
      }
    },
    async reject() {
      try {
        this.request.id
        const form = new FormData();
        form.append('status', 0);
        await this.AcceptTransferStudent({ id: this.request.id, status: form });
        this.fetchData();
        this.success = true;
        setTimeout(() => { this.success = false; }, 1000);
      }
      catch (err) {
        console.log(err);
        this.failed = true;
        setTimeout(() => {
          this.failed = false;
        }, 1000);
      }
    },
    async confirmTransfer() {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const data = new FormData();
        data.append("status", 2);
        await axios.post(
          `http://127.0.0.1:8000/api/school/SendTransferReqToOld/${this.request.id}`, data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        this.success = true;
        setTimeout(() => { this.success = false; }, 1000);
      }
      catch (err) {
        console.log(err);
        this.failed = true;
        setTimeout(() => {
          this.failed = false;
        }, 1000);
      }
    }
  },
}
</script>
<style scoped>
@import url('../request.css');
</style>