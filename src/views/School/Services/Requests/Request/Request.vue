<template>
  <div>
    <sc-navbar-comp></sc-navbar-Comp>
    <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
      <div class="flex flex-col">
        <span class="sm:text-3xl text-2xl font-bold">بيانات الطلب </span>
        <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
      </div>

      <div class="bg-customSearch shadow-2xl p-2 sm:p-5 mt-6 rounded-xl">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="flex flex-col">
            <label for="in1" class="mx-3.5 font-bold">إسم المُرسِل :</label>
            <input v-model="request.parent_name" disabled id="email" type="text" class="item-data" />
          </div>
          <div class="flex flex-col">
            <label for="in2" class="mx-3.5 font-bold">نوع الطلب :</label>
            <input v-model="request.type" disabled id="email" type="text" class="item-data" />
          </div>
        </div>
        <div class="flex flex-col ">
          <label for="in3" class="mx-3.5 font-bold"> الوصف :</label>
          <span class="bg-black w-20 block h-0.5 m-2"></span>

          <section v-if="this.req1" disabled type="text"
            class="leading-8 tx-era resize-none p-5 sm:p-5 border-2 rounded-xl">
            <p class="font-bold"> التاريخ : <span class="font-thin">{{ this.request.created_at_date }}</span></p>
            <p class="font-bold">وقت الإرسال : <span class="font-thin">{{ this.request.created_at_time }}</span></p>
            <div>
              <h3 class="font-bold">البيانات الشخصية :</h3>
              <span class="bg-black w-20 block h-0.5 m-2"></span>
              <p class="font-bold"> الإسم الكامل : <span class="font-thin">{{ this.request.name }}</span></p>
              <p class="font-bold"> تاريخ الميلاد : <span class="font-thin">{{ this.request.birthdate }}</span>
              </p>
              <p class="font-bold"> مكان الميلاد : <span class="font-thin">{{ this.request.parent_address }}</span></p>
              <p class="font-bold"> مهنة الأب : <span class="font-thin">{{ this.request.parent_job }}</span></p>
              <p class="font-bold"> الجنسية : <span class="font-thin">{{ this.request.parent_nationality }}</span></p>
              <p class="font-bold"> الجنس : <span class="font-thin">{{ this.request.gender }}</span></p>
              <p class="font-bold"> الرقم القومي/الهوية : <span class="font-thin">{{ this.request.student_national_id
                  }}</span>
              </p>
            </div>
            <span class="bg-black w-40 md:w-80 block h-0.5 m-2"></span>
            <div>
              <h3 class="font-bold">بيانات الاتصال :</h3>
              <span class="bg-black w-20 block h-0.5 m-2"></span>
              <p class="font-bold"> عنوان السكن : <span class="font-thin">{{ this.request.parent_address }}</span></p>
              <p class="font-bold"> رقم الهاتف : <span class="font-thin">{{ this.request.parent_phone }}</span></p>
              <p class="font-bold"> البريد الإلكتروني : <span class="font-thin">{{ this.request.parent_email }}</span>
              </p>
            </div>
            <span class="bg-black w-40 md:w-80 block h-0.5 m-2"></span>
          </section>

          <section v-if="this.req2" disabled id="desc" type="text"
            class="leading-8 tx-era resize-none p-5 sm:p-5 border-2 rounded-xl">
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


          <section v-else-if="this.req3" disabled type="text"
            class="leading-8 tx-era resize-none p-5 sm:p-5 border-2 rounded-xl">
            <div>
              <p class="font-bold"> البريد الإلكتروني : <span class="font-thin">{{ this.request.parentEmail }}</span>
              </p>
              <p class="font-bold"> التاريخ : <span class="font-thin">{{ this.request.date.day + ':' +
              this.request.date.month + ':' + this.request.date.year }}</span></p>
              <p class="font-bold"> وقت الإرسال : <span class="font-thin">{{ this.request.time.hrs + ':' +
              this.request.time.mins + ':' +
              this.request.time.secs }}</span></p>
            </div>
            <span class="bg-black w-40 md:w-80 block h-0.5 m-2"></span>
            <div>
              <p>إلى السيد/السيدة <span class="font-bold">{{ this.request.manager }}</span></p>
              <p class="leading-10"> الموضوع: استفسار عن <span>[ذكر البرنامج أو الدورة التي تود الاستفسار عنها]</span>
                أود أن أسأل عن المواد الدراسية
                المقدمة ضمن هذا البرنامج، الشروط والمعايير الأساسية للقبول، وأية متطلبات
                خاصة قد تطلبونها. <br>
                أنا مهتم أيضاً بمعرفة المزيد عن هيكل البرنامج، بما في ذلك مدته، ونظام التقييم
                المستخدم. <br>
                بالإضافة إلى ذلك، أرغب في الاستفسار عن الفرص التي قد توفرها الجامعة للطلاب فيما يخص التدريب العملي أو
                الأنشطة البحثية ضمن هذا المجال. وهل توجد فرص للتعاون مع المؤسسات والشركات المحلية أو الدولية أثناء
                الدراسة؟
              </p><br>
              <p> عزيزي/عزيزتي, <span class="font-bold">{{ this.request.manager }}</span>.</p>
            </div>
          </section>
        </div>

        <div class="response" v-if="this.req3">
          <h3 class="font-bold m-1.5 mt-3">ردك :</h3>
          <span class="bg-black w-10 block h-0.5 m-2"></span>
          <input class="min-w-full p-5" type="text" v-model="reply" placeholder="أكتب هنا ردك عي الإستفسار ..." />
          <span v-if="reply == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>

        <div class="flex flex-row flex-wrap justify-center sm:justify-end" v-if="this.accRejbtn">
          <div class="m-5">
            <button @click="accept()" class="w-25 sm:w-40 md:w-60">موافقة</button>
          </div>
          <div class="m-5">
            <button @click="reject()" class="w-25 sm:w-40 md:w-60">رفض</button>
          </div>
        </div>
        <div class="flex flex-row-reverse flex-wrap justify-center sm:justify-start" v-else-if="this.req3">
          <div class="m-5">
            <button @click="send()" class="w-60">إرسال الرد</button>
          </div>
          <BaseTeleport :show="sent">
            <div>
              <p class="font-bold p-6">هل أنت متاكد؟</p>
              <div class="flex flex-row flex-wrap justify-center ">
                <div class="m-3">
                  <button @click="sendQuery()" class="w-48">نعم, متأكد</button>
                  <BaseTeleport :show="confirm">
                    <p> تم إرسال ردك بنجاح </p>
                  </BaseTeleport>
                </div>
                <div class="m-3">
                  <button @click="unSend()" class="w-48">لا, أود التعديل</button>
                </div>
              </div>
            </div>
          </BaseTeleport>
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
      req3: false,
      accRejbtn: false,
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
    this.initData;
    this.fetchData();
  },
  methods: {
    ...mapActions(['FetchSCRequests', 'AcceptEnrollStudent']),
    initData() {
      this.request = this.Get_SCRequests[this.$route.params.id];
      const type = this.Get_SCRequests[this.$route.params.id].type;
      if (type === 'تسجيل') { this.req1 = true; this.accRejbtn = true }
      else if (type === 'تحويل') { this.req2 = true; this.accRejbtn = true; }
      else if (type === 'استفسار') { this.req3 = true; }
    },
    async fetchData() {
      try {
        await this.FetchSCRequests();
        this.initData();
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
        console.log('send done..');
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
        console.log('send done..');
      }
      catch (err) {
        console.log(err);
      }
    },
    sendQuery() {
      console.log('تم إرسال ردك بنجاح');
      this.sent = false;
      document.body.style.overflow = "auto";
    },
    send() {
      if (this.reply == '') this.empty = true;
      else {
        document.body.style.overflow = "hidden";
        this.sent = true;
      }
    },
    unSend() {
      document.body.style.overflow = "auto";
      this.sent = false;
    },
  },
}
</script>
<style scoped>
@import url('Request.css');
</style>