<template>
  <div>
    <sc-navbar-comp></sc-navbar-Comp>
    <section class="flex flex-col items-center w-full mt-6" data-aos="fade-up" data-aos-duration="1000">
      <div class="flex flex-col">
        <span class="sm:text-3xl text-2xl font-bold">بيانات الطلب </span>
        <span class="w-11/12 h-1 bg-black m-1 rounded-2xl"></span>
      </div>
      <div class="p-2 sm:p-5 mt-6">
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

        <div class="flex flex-row flex-wrap justify-center" v-if="!accepted">
          <div class="m-5">
            <button @click="accept()" class="w-25 sm:w-40 md:w-60">موافقة</button>
          </div>
          <div class="m-5">
            <button @click="reject()" class="w-25 sm:w-40 md:w-60">رفض</button>
          </div>
        </div>
      </div>
    </section>
    <Footer_Component></Footer_Component>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      id: this.$route.params.id,
      request: {},
      req1: false,
      req2: false,
      accRejbtn: false,
      accepted: false,
      reply: '',
      empty: false,
      sent: false,
      confirm: false,
    }
  },
  computed: {
    ...mapGetters(['GetUser2', 'Get_SCRequests']),
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions(['FetchSCRequests', 'AcceptEnrollStudent']),
    initData() {
      this.request = this.Get_SCRequests[this.$route.params.id];
      const type = this.request.type;
      if (type === 'تسجيل') { this.req1 = true; this.accRejbtn = true }
      else if (type === 'تحويل') { this.req2 = true; this.accRejbtn = true; }
      else if (type === 'استفسار') { this.req3 = true; }
    },
    async fetchData() {
      try {
        await this.FetchSCRequests();
        this.initData();
        console.log(this.request.request_status[0]);
        if (this.request.request_status[0] == 1 || this.request.request_status[0] == 0) {
          this.accRejbtn = false;
        }
      }
      catch (error) {
        throw `Something went wrong! ${error}`;
      }
    },
    async accept() {
      try {
        const form = new FormData();
        form.append('status', 1);
        await this.AcceptEnrollStudent({ id: this.request.id, status: form });
      }
      catch (err) {
        console.log(err);
      }
    },
    async reject() {
      try {
        const form = new FormData();
        form.append('status', 0);
        await this.AcceptEnrollStudent({ id: this.request.id, status: form });
      }
      catch (err) {
        console.log(err);
      }
    },
  },
}
</script>
<style scoped>
@import url('./request.css');
</style>