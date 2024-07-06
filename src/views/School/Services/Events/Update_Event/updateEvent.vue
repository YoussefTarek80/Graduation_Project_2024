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
        <div class="flex flex-col input-group">
          <input type="text" required v-model="event.name" class="input outline-customDarkPurple" />
          <label for="" class="user-label">اسم المناسبة<span class="text-red-600">*</span></label>
          <span v-if="event.name == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col input-group">
          <label for="" class="user-slabel">وقت المناسبة <span class="text-red-600">*</span></label>
          <input type="date" required v-model="event.date" class="input outline-customDarkPurple" />
          <span v-if="event.date == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col input-group">
          <label for="" class="user-slabel">تاريخ المناسبة
            <span class="text-red-600">*</span></label>
          <input type="time" required v-model="event.time" class="input outline-customDarkPurple" />
          <span v-if="event.time == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>

        <!-- <div class="flex flex-col input-group">
          <label for="" class="user-slabel">الحالة <span class="text-red-600">*</span></label>
          <select v-model="event.status" required class="input appearance-none">
            <option value="" selected class="hover:bg-customPurple">اختار حالة المناسبة</option>
            <option value="مفعل" class="hover:bg-customPurple">مفعل</option>
            <option value="غير مفعل" class="hover:bg-customPurple">غير مفعل</option>
            <option value="تم الحدث" class="hover:bg-customPurple">تم الحدث</option>
          </select>
          <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
            <i class="fa-regular fa-angle-down"></i>
          </div>
        </div> -->
      </div>
      <div class="flex flex-col input-group mt-5">
        <label for="" class="user-slabel">وصف المناسبة<span class="text-red-600">*</span></label>
        <textarea required placeholder="أكتب وصف الحدث بالتفصيل من حيث المراحل الدراسية المتعلقة والي اخره..."
          v-model="event.description" rows="5"
          class="tx-report input resize-none p-5 outline-none rounded-2xl"></textarea>
        <span v-if="event.description == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
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
      this.event = this.GetSCEvents.find(
        (event) => event.id === parseInt(this.id)
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