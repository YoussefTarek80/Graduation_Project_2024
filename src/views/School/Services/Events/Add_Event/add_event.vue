<template>

  <sc-navbar-comp></sc-navbar-Comp>
  <BaseTeleport :show="success">
    <div class="flex flex-col">
      <span class="text-green-700 text-4xl"> تم الإضافة بنجاح </span>
      <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
    </div>
  </BaseTeleport>
  <BaseTeleport :show="failed">
    <div class="flex flex-col">
      <span class="text-red-700 text-4xl"> فشل الإضافة</span>
      <i class="fa-sharp fa-solid fa-badge-check text-red-700 text-7xl m-3"></i>
    </div>
  </BaseTeleport>

  <section class="m-6 sm:m-16 z-50 " data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">إضافة مناسبة جديدة</span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto school">
      <div class="my-5">
        <span class="text-2xl">بيانات المناسبة</span>
      </div>
      <div class="input_Div grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col input-group">
          <input type="text" required v-model="name" class="input" />
          <label for="" class="user-label">إسم المناسبة <span class="text-red-600">*</span></label>
          <span v-if="name == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col input-group">
          <label for="" class="user-slabel">تاريخ المناسبة <span class="text-red-600">*</span></label>
          <input type="date" v-model="date" required class="input" />
          <span v-if="date == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col input-group">
          <input type="time" required v-model="time" class="input" />
          <label for="" class="user-slabel">وقت المناسبة<span class="text-red-600">*</span></label>
          <span v-if="time == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col input-group">
          <input type="text" required v-model="address" class="input" />
          <label for="" class="user-label">مكان المناسبة<span class="text-red-600">*</span></label>
          <span v-if="address == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col input-group">
          <label for="" class="user-slabel">حالة المناسبة<span class="text-red-600">*</span></label>
          <select v-model="status" required class="input">
            <option :value="status" disabled selected>إختار حالة الحدث...</option>
            <option value="مفعل">مفعل</option>
            <option value="غير مفعل">غير مفعل</option>
            <option value="تم الحدث">تم الحدث</option>
          </select>
          <span v-if="status == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
      </div>
      <div>
        <div class="flex flex-col mt-6 input-group">
          <textarea placeholder="أكتب وصف الحدث بالتفصيل من حيث المراحل الدراسية المتعلقة والي اخره..."
            v-model="description" rows="5" cols="10" class="input resize-none p-5 outline-none rounded-2xl"></textarea>
          <label for="" class="user-slabel">وصف المناسبة <span class="text-red-600">*</span></label>
          <span v-if="this.description == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
      </div>
    </div>
    <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
      <button class="w-60" @click="addEvent" :class="{ disabledBtn: close }" :disabled="close">
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

import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      date: "",
      time: "",
      address: "",
      description: "",
      status: "",
      success: false,
      failed: false,
      empty: false,
    };
  },
  created() {
    console.log();
  },
  computed: {
  },
  mounted() { },
  methods: {
    ...mapActions(["FetchSCEvents", "AddEvent"]),
    formatTime(time) {
      const [hours, minutes, seconds] = time.split(":");
      const formattedHours = ("0" + hours).slice(-2);
      const formattedMinutes = ("0" + minutes).slice(-2);
      return `${formattedHours}:${formattedMinutes} `;
    },
    async addEvent() {
      try {
        if (this.name != '' && this.description != '' && this.date != '' && this.time != '' && this.address != '') {
          await this.AddEvent({
            name: this.name,
            description: this.description,
            date: this.date,
            time: this.formatTime(this.time),
            address: this.address,
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
        setTimeout(() => { this.failed = false }, 1000);
      }
    },
  },
};
</script>
<style scoped>
@import url("../../../../../UI/CustomsCss/CustomInput.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("./add_event.css");
</style>
