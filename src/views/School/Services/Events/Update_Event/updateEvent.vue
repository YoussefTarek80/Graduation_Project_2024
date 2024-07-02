<template>
  <sc-navbar-comp></sc-navbar-Comp>
  <BaseTeleport :show="success">
    <div class="flex flex-col">
      <span class="text-green-700 text-4xl"> تم التعديل بنجاح </span>
      <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
    </div>
  </BaseTeleport>
  <BaseTeleport :show="failed">
    <div class="flex flex-col">
      <span class="text-red-700 text-4xl"> فشل التعديل</span>
      <i class="fa-sharp fa-solid fa-badge-check text-red-700 text-7xl m-3"></i>
    </div>
  </BaseTeleport>

  <section class="m-6 sm:m-16 z-50 " data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">تعديل المناسبة </span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">

      <div class="my-5">
        <span class="text-2xl">بيانات المناسبة</span>
      </div>
      <div class="input_Div grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col">
          <label for="in1">اسم المناسبة
            <span class="text-red-600">*</span></label>
          <input type="text" v-model="event.name" placeholder="أكتب إسم المناسبة..." class="outline-customDarkPurple" />
          <span v-if="event.name == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col">
          <label for="">وقت المناسبة <span class="text-red-600">*</span></label>
          <input type="date" v-model="event.date" class="outline-customDarkPurple" />
          <span v-if="event.date == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col">
          <label for="">تاريخ المناسبة
            <span class="text-red-600">*</span></label>
          <input type="time" v-model="event.time" class="outline-customDarkPurple" />
          <span v-if="event.time == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>

        <!-- <div class="flex flex-col">
          <label for="">الحالة <span class="text-red-600">*</span></label>
          <div class="custom-select relative">
            <select v-model="event.status"
              class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple">
              <option value="مفعل">مفعل</option>
              <option value="غير مفعل">غير مفعل</option>
              <option value="تم الحدث">تم الحدث</option>
            </select>
            <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
              <i class="fa-regular fa-angle-down"></i>
            </div>
          </div>
        </div> -->
      </div>
      <div>
        <div class="flex flex-col mt-6">
          <label for="">وصف المناسبة <span class="text-red-600">*</span></label>
          <textarea placeholder="أكتب وصف الحدث هنا..." v-model="event.description" rows="5"
            class="resize-none p-5 outline-customDarkPurple rounded-2xl mt-5"></textarea>
          <span v-if="event.description == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
      </div>
    </div>
    <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
      <button class="w-60" @click="handleUpdateEvent" :class="{ disabledBtn: close }" :disabled="close">
        حفظ
      </button>
      <button class="w-48" @click="this.$router.replace('/school/services/sc-events')">
        الغاء
      </button>
    </div>
  </section>
  <Footer_Component></Footer_Component>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      id: this.$route.params.id,
      event: {},
      success: false,
      failed: false,
      empty: false,
    }
  },
  computed: {
    ...mapGetters(["GetSCEvents"]),
  },
  created() {
    this.fetchData();
    console.log(this.GetSCEvents);
    console.log(this.event);
  },
  methods: {
    ...mapActions(["FetchSCEvents", "UpdateSCEvent"]),
    intiData() {
      const index = this.$route.params.id;
      this.event = this.GetSCEvents.find(
        (event) => event.id === parseInt(index)
      );
    },
    formatTime(time) {
      const [hours, minutes, seconds] = time.split(":");
      const formattedHours = ("0" + hours).slice(-2);
      const formattedMinutes = ("0" + minutes).slice(-2);
      return `${formattedHours}:${formattedMinutes} `;
    },
    async fetchData() {
      try {
        await this.FetchSCEvents();
        this.intiData();
      } catch (err) {
        throw `fetch Event Error: ${err}`;
      }
    },
    async handleUpdateEvent() {
      try {
        if (this.event.name != '' && this.event.date != '' && this.event.description != '') {
          await this.UpdateSCEvent(
            {
              id: this.event.id,
              name: this.event.name,
              date: this.event.date,
              time: this.formatTime(this.event.time),
              description: this.event.description,
            });
          this.success = true;
          setTimeout(() => { this.success = false }, 1000);
        }
        else {
          this.empty = true;
          this.failed = true;
          setTimeout(() => { this.failed = false }, 1000);
        }
      } catch (err) {
        console.log(err);
        this.failed = true;
        setTimeout(() => {
          this.failed = false;
        }, 1000);
      }
    },
  }
}
</script>


<style scoped>
@import url("../../../../../UI/CustomsCss/CustomInput.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("./updateEvent.css");
</style>