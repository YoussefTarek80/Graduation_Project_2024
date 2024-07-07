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
      <span class="text-3xl sm:text-4xl">إضافة مسؤول كنترول</span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">
      <span class="text-2xl md:text-3xl text-customDarkPurple px-0 md:px-5 py-3 rounded-2xl flex items-center m-5">
        <i class="fa-duotone fa-sparkles"></i>بيانات المسؤول</span>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div class="input-group flex flex-col">
          <input type="text" required v-model="name" class="input outline-customDarkPurple" />
          <label for="" class="user-label">إسم مدير الكنترول<span class="text-red-600">*</span></label>
          <span v-if="name == '' && empty" class="text-red-600"> هذا الحقل مطلوب</span>
          <span v-else-if="!this.valid_input1(name) && name != '' && empty" class="text-red-600">
            لا يصلح غير الحروف العربية فقط
          </span>
        </div>
        <div class="input-group flex flex-col">
          <label for="" class="user-slabel">الدور الوظيفي<span class="text-red-600">*</span></label>
          <select v-model="role" required class="input cursor-pointer">
            <option value="" disabled selected>حدد الدور الوظيفي...</option>
            <option value="التصحيح مسؤول">مسؤول التصحيح</option>
            <option value="مسؤول الطلبات">مسؤول الطلبات</option>
            <option value="مسؤول الدعم والشكاوي">مسؤول الدعم والشكاوي</option>
          </select>
          <span v-if="role == '' && empty" class="text-red-600">يجب إختيار الدور الوظيفي</span>
        </div>
        <div class="input-group flex flex-col">
          <input type="date" required v-model="birthdate" class="input" />
          <label for="" class="user-slabel">تاريخ الميلاد<span class="text-red-600">*</span></label>
          <span v-if="birthdate == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="input-group flex flex-col">
          <input v-model="phone" required type="text" class="input" />
          <label for="" class="user-label">رقم الهاتف<span class="text-red-600">*</span></label>
          <span v-if="!this.valid_input2(phone) && phone != '' && empty" class="text-red-600 text-xs">رقم الهاتف يجب
            ان
            يكون
            11
            رقم ويبدء ب 010 او 011 او 012او 015</span>
          <span v-else-if="phone == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="input-group flex flex-col">
          <input type="text" required v-model="address" class="input" />
          <label for="" class="user-label">العنوان<span class="text-red-600">*</span></label>
          <span v-if="address == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="input-group flex flex-col">
          <input required type="text" v-model="email" class="input" />
          <label class="user-label">البريد الإلكتروني<span class="text-red-600">*</span></label>
          <span v-if="email == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
          <span v-else-if="!this.isValidEmail(email) && email != '' && empty" class=" text-red-600">
            هذا الحقل يجب أن يكون بريد إلكتروني مثل :emailname@darb.com
          </span>
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
      role: "",
      address: "",
      birthdate: "",
      v_m_phone: true,
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
        if (this.name != '' && this.role != ''
          && this.address != '' && this.phone != '' && this.birthdate != '' && this.email != '') {
          await this.AddController({
            name: this.name,
            email: this.email,
            address: this.address,
            phone: this.phone,
            birthdate: this.birthdate,
            role: this.role,
          });

          this.v_m_phone = this.valid_input2(this.phone);
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
        this.v_m_phone = this.valid_input2(this.phone);
        this.empty = true;
        this.failed = true;
        setTimeout(() => { this.failed = false }, 1000);
        throw `adding ${err}`;
      }
    }, isValidEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@darb\.com$/;
      return emailPattern.test(email);
    },
    valid_input1(v) {
      var arabicPattern = /^[\u0600-\u06FF\s]+$/;
      return arabicPattern.test(v);
    },
    valid_input2(v) {
      var phonePattern = /^(010|011|012|015)[0-9]{8}$/;
      return phonePattern.test(v) && v.length == 11;
    }
  },
};
</script>
<style scoped>
@import url("../../../../../UI/CustomsCss/CustomInput.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../Events/Add_Event/add_event.css");
</style>
