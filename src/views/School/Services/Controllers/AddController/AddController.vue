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
      <span class="text-3xl sm:text-4xl">إضافة مدير كنترول</span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto school">
      <div class="input_Div grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div class="flex flex-col">
          <label for="in1">إسم مدير الكنترول<span class="text-red-600">*</span></label>
          <input type="text" v-model="name" placeholder="أكتب إسم المدير..." class="outline-customDarkPurple" />
          <span v-if="name == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col">
          <label for="">الدور الوظيفي<span class="text-red-600">*</span></label>
          <select v-model="role"
            class="bg-white border border-gray-300 rounded-xl my-3 py-4 px-4 focus:border-customDarkPurple">
            <option :value="role" disabled selected>حدد الدور الوظيفي...</option>
            <option value="مسؤول الملفات">مسؤول الملفات</option>
            <option value="مسؤول التصحيح">مسؤول التصحيح</option>
            <option value="مسؤول الطلبات">مسؤول الطلبات</option>
            <option value="مسؤول الدعم والشكاوي">مسؤول الدعم والشكاوي</option>
          </select>
          <span v-if="role == 'حدد الدور الوظيفي...' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col">
          <label for="in1">تاريخ الميلاد
            <span class="text-red-600">*</span></label>
          <input type="date" v-model="birthdate" placeholder="كم عمر المدير..." class="outline-customDarkPurple" />
          <span v-if="birthdate == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col">
          <label for="in1">رقم الهاتف
            <span class="text-red-600">*</span></label>
          <input type="text" v-model="phone" placeholder="ك المدير..." class="outline-customDarkPurple" />
          <span v-if="phone == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col">
          <label for="in1">العنوان<span class="text-red-600">*</span></label>
          <input type="text" v-model="address" placeholder="أكتب العنوان..." class="outline-customDarkPurple" />
          <span v-if="address == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col">
          <label for="in1">البريد الإلكتروني<span class="text-red-600">*</span></label>
          <input type="text" v-model="email" placeholder="أكتب العنوان..." class="outline-customDarkPurple" />
          <span v-if="email == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
      </div>
    </div>
    <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
      <button class="w-60" @click="addController" :class="{ disabledBtn: close }" :disabled="close">
        حفظ
      </button>
      <button class="w-48" @click="this.$router.replace('/school/services/controllers')">
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
      role: "حدد الدور الوظيفي...",
      address: "",
      birthdate: "",
      phone: "",
      email: "",
      failed: false,
      success: false,
      empty: false,
    };
  },
  created() {
  },
  methods: {
    ...mapActions(["AddController"]),
    async addController() {
      try {
        if (this.name != '' && this.role != 'حدد الدور الوظيفي...'
          && this.address != '' && this.phone != '' && this.birthdate != '' && this.email != '') {
          await this.AddController({
            name: this.name,
            email: this.email,
            address: this.address,
            phone: this.phone,
            birthdate: this.birthdate,
            role: this.role,
          });

          this.success = true;
          setTimeout(() => { this.success = false }, 1000);
          console.log("Controller Added Successfully");
        }
        else {
          this.empty = true;
          this.failed = true;
          setTimeout(() => { this.failed = false }, 1000);
        }
      } catch (err) {
        this.empty = true;
        this.failed = true;
        setTimeout(() => { this.failed = false }, 1000);
        throw `adding ${err}`;
      }
    },
  },
};
</script>
<style scoped>
@import url("../../../../../UI/CustomsCss/CustomInput.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../Events/Add_Event/add_event.css");
</style>
