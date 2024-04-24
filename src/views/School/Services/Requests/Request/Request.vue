<template>
  <div>
    <sc-navbar-comp></sc-navbar-Comp>
    <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
      <div class="flex flex-col">
        <span class="sm:text-3xl text-2xl font-bold">بيانات الطلب </span>
        <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
      </div>

      <div class="bg-customSearch shadow-2xl p-5 mt-6 rounded-xl">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="flex flex-col">
            <label for="in1" class="mx-3.5 font-bold">إسم المُرسِل :</label>
            <input v-model="this.request.senderName" disabled id="email" type="text" class="item-data" />
          </div>
          <div class="flex flex-col">
            <label for="in2" class="mx-3.5 font-bold">نوع الطلب :</label>
            <input v-model="this.request.type" disabled id="email" type="text" class="item-data" />
          </div>
        </div>
        <div class="flex flex-col ">
          <label for="in3" class="mx-3.5 font-bold"> الوصف :</label>
          <span class="bg-black w-20 block h-0.5 m-2"></span>
          <section v-if="this.req1" disabled id="desc" type="text"
            class="leading-8 tx-era resize-none px-4 border-2 rounded-xl">
            <p>إلى : <span>{{ this.request.currSchool }}</span></p>
            <p>العنوان : <span>{{ this.request.newScAddress }}</span><br>
              التاريخ : <span> {{ this.request.date.day + '/' + this.request.date.month + '/' +
              this.request.date.year }}</span></p>
            <p>وقت الإرسال : <span>{{ this.request.time.hrs + ':' + this.request.time.mins + ':' +
              this.request.time.secs }}</span></p>
            <p>الموضوع : طلب تحويل طالب من مدرسة إلى مدرسة</p><br>
            <p class="font-bold">السيد/السيدة مدير/ة ,<span>{{ this.request.currSchool }}</span></p>
            <span class="bg-black w-80 block h-0.5 m-2"></span>
            <p>أتقدم إلى مقامكم الموقر بطلب تحويل ابني/ابنتي <span class="font-bold">{{ this.request.studname }}</span>
              ، الذي يدرس حاليًا في الصف <span>{{ this.request.level }}</span>
              بمدرسة <span>{{ this.request.currSchool }}</span>
              ، إلى مدرستكم الموقرة ابتداءً من العام الدراسي القادم <span>{{ this.request.schoolYear }}</span>.</p>
            <p>
              نظرًا لظروف <span class="font-bold">{{ this.request.reason }}</span>،
              نجد أنه من
              الضروري أن يستمر <span>{{ this.request.studname }}</span>
              في تعليمه بمدرسة أقرب إلى مكان إقامتنا الجديد/أن توفر له البيئة
              التعليمية
              المناسبة التي تتماشى مع احتياجاته الخاصة.</p>
            <p>أرجو منكم النظر في طلبي هذا والموافقة عليه. نحن مستعدون لتقديم جميع الوثائق اللازمة لإتمام عملية التحويل
              ومتابعة أي إجراءات مطلوبة من جانبنا. <br>
              نشكركم مقدمًا على تعاونكم وتفهمكم لموقفنا، ونتطلع إلى تقديم تجربة تعليمية مثمرة لابننا/ابنتنا في مدرستكم.
            </p>
            <p>مع خالص الشكر والتقدير، <br>
              <span class="bg-black w-80 block h-0.5 m-2"></span>
            <p>إسم ولي الأمر : <span class="">{{ this.request.senderName }}</span></p>
            <p>التوقيع : <span class="font-mono font-bold ">{{ this.request.senderName }}</span></p>
            <p>تفاصيل الاتصال بولي الأمر : <span>{{ this.request.parentEmail + ' - (' + this.request.parentPhone + ')'
                }}</span>
            </p>
            </p>
            <span class="bg-black w-80 block h-0.5 m-2"></span>
          </section>

          <section v-else-if="this.req2" disabled type="text"
            class="leading-8 tx-era resize-none px-4 border-2 rounded-xl">
            <p> التاريخ : <span>{{ this.request.date.day + ':' + this.request.date.month + ':' +
              this.request.date.year }}</span></p>
            <p>وقت الإرسال : <span>{{ this.request.time.hrs + ':' + this.request.time.mins + ':' +
              this.request.time.secs }}</span></p>
            <div>
              <h3 class="font-bold">البيانات الشخصية :</h3>
              <span class="bg-black w-20 block h-0.5 m-2"></span>
              <p class="font-bold"> الإسم الكامل : <span class="font-thin">{{ this.request.studname }}</span></p>
              <p class="font-bold"> تاريخ الميلاد : <span class="font-thin">{{ this.request.dob.day + '/' +
              this.request.dob.month + '/' + this.request.dob.year }}</span>
              </p>
              <p class="font-bold"> مكان الميلاد : <span class="font-thin">{{ this.request.address }}</span></p>
              <p class="font-bold"> الجنسية : <span class="font-thin">{{ this.request.nationlity }}</span></p>
              <p class="font-bold"> الجنس : <span class="font-thin">{{ this.request.gender }}</span></p>
              <p class="font-bold"> الرقم القومي/الهوية : <span class="font-thin">{{ this.request.nationalId }}</span>
              </p>
            </div>
            <span class="bg-black w-80 block h-0.5 m-2"></span>
            <div>
              <h3 class="font-bold">بيانات الاتصال :</h3>
              <span class="bg-black w-20 block h-0.5 m-2"></span>
              <p class="font-bold"> عنوان السكن : <span class="font-thin">{{ this.request.address }}</span></p>
              <p class="font-bold"> رقم الهاتف : <span class="font-thin">{{ this.request.phone }}</span></p>
              <p class="font-bold"> البريد الإلكتروني : <span class="font-thin">{{ this.request.parentEmail }}</span>
              </p>
            </div>
            <span class="bg-black w-80 block h-0.5 m-2"></span>
            <div>
              <h3 class="font-bold">البيانات الأكاديمية :</h3>
              <span class="bg-black w-20 block h-0.5 m-2"></span>
              <p class="font-bold"> الصف الدراسي الحالي : <span class="font-thin">{{ this.request.level }}</span></p>
            </div>
            <span class="bg-black w-80 block h-0.5 m-2"></span>
          </section>

          <section v-else-if="this.req3" disabled type="text"
            class="leading-8 tx-era resize-none px-4 border-2 rounded-xl">
            <div>
              <p class="font-bold"> البريد الإلكتروني : <span class="font-thin">{{ this.request.parentEmail }}</span>
              </p>
              <p class="font-bold"> التاريخ : <span class="font-thin">{{ this.request.date.day + ':' +
              this.request.date.month + ':' + this.request.date.year }}</span></p>
              <p class="font-bold"> وقت الإرسال : <span class="font-thin">{{ this.request.time.hrs + ':' +
              this.request.time.mins + ':' +
              this.request.time.secs }}</span></p>
            </div>
            <span class="bg-black w-80 block h-0.5 m-2"></span>
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
        </div>

        <div class="flex flex-row-reverse flex-wrap justify-center sm:justify-start" v-if="this.accRejbtn">
          <div class="m-5">
            <button @click="accept(this.type)" class="w-60">موافقة</button>
          </div>
          <div class="m-5">
            <button @click="reject(this.type)" class="w-60">رفض</button>
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
  props: ['items', 'InfoRoute'],
  data() {
    return {
      id: this.$route.params.id,
      type: null,
      req1: false,
      req2: false,
      req3: false,
      accRejbtn: false,
      reply: '',
      sent: false,
      confirm: false,
    }
  },
  computed: {
    ...mapGetters(['GetRequests']),
    request() {
      var object;
      if (this.type == "تحويل") {
        object =
        {
          id: this.$route.params.id,
          type: this.GetRequests[this.id].type,
          studname: this.GetRequests[this.id].studname,
          senderName: this.GetRequests[this.id].parentName,
          parentPhone: this.GetRequests[this.id].parentPhone,
          parentEmail: this.GetRequests[this.id].parentEmail,
          newScAddress: this.GetRequests[this.id].newScAddress,
          currSchool: this.GetRequests[this.id].currSchool,
          newSchool: this.GetRequests[this.id].newSchool,
          date: {
            day: this.GetRequests[this.id].date.day,
            month: this.GetRequests[this.id].date.month,
            year: this.GetRequests[this.id].date.year,
          },
          level: this.GetRequests[this.id].level,
          schoolYear: this.GetRequests[this.id].schoolYear,
          reason: this.GetRequests[this.id].reason,
          time: this.GetRequests[this.id].time,
        }
      }
      else if (this.type == "تسجيل") {
        object =
        {
          id: this.$route.params.id,
          senderName: this.GetRequests[this.id].parentName,
          type: this.GetRequests[this.id].type,
          studname: this.GetRequests[this.id].studname,
          date: {
            day: this.GetRequests[this.id].date.day,
            month: this.GetRequests[this.id].date.month,
            year: this.GetRequests[this.id].date.year
          },
          dob: {
            day: this.GetRequests[this.id].dob.day,
            month: this.GetRequests[this.id].dob.month,
            year: this.GetRequests[this.id].dob.year
          },
          gender: this.GetRequests[this.id].gender,
          religion: this.GetRequests[this.id].religion,
          nationlity: this.GetRequests[this.id].nationlity,
          nationalId: this.GetRequests[this.id].nationalId,
          phone: this.GetRequests[this.id].phone,
          parentEmail: this.GetRequests[this.id].parentEmail,
          level: this.GetRequests[this.id].level,
          schoolYear: this.GetRequests[this.id].schoolYear,
          grade: this.GetRequests[this.id].grade,
          time: this.GetRequests[this.id].time,
        }
      }
      else {
        object =
        {
          id: this.$route.params.id,
          senderName: this.GetRequests[this.$route.params.id].parentName,
          type: this.GetRequests[this.$route.params.id].type,
          parentEmail: this.GetRequests[this.$route.params.id].senderEmail,
          manager: this.GetRequests[this.$route.params.id].manager,
          time: {
            hrs: this.GetRequests[this.id].time.hrs,
            mins: this.GetRequests[this.id].time.mins,
            secs: this.GetRequests[this.id].time.secs,
          },
          date: {
            day: this.GetRequests[this.id].date.day,
            month: this.GetRequests[this.id].date.month,
            year: this.GetRequests[this.id].date.year,
          },
        }
      }
      return object;
    },
    reqType() {
      this.type = this.GetRequests[this.id].type;
      if (this.type === 'تحويل') { this.req1 = true; this.accRejbtn = true }
      else if (this.type === 'تسجيل') { this.req2 = true; this.accRejbtn = true; }
      else if (this.type === 'استفسار') { this.req3 = true; }
    },
  },
  created() {
    console.log(this.request);
    this.fetchData();
    this.reqType;
    this.getReqInfo;
  },
  methods: {
    ...mapActions(['FetchRequests']),
    async fetchData() {
      try {
        await this.FetchRequests();
        console.log(this.GetRequests);
      }
      catch (error) {
        throw `Something went wrong! ${error}`;
      }
    }
    ,
    accept(req) { },
    reject(req) { }, *
      sendQuery() {
      console.log('تم إرسال ردك بنجاح');
      // this.confirm = true;
      this.sent = false;
      document.body.style.overflow = "auto";
    },
    send() {
      document.body.style.overflow = "hidden";
      this.sent = true;
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