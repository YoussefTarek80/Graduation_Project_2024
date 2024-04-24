<template>

  <sc-navbar-comp></sc-navbar-Comp>
  <section class="m-6 sm:m-16 z-50 " data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">اضافة مدير كنترول</span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto school">
      <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        <div class="flex flex-col">
          <label for="in1">اسم مدير الكنترول <span class="text-red-600">*</span></label>
          <input type="text" v-model="name" class="outline-customDarkPurple" />
        </div>
        <div class="flex flex-col">
          <label for="">الدور الوظيفي <span class="text-red-600">*</span></label>
          <select v-model="role" class="text-slate-600 outline outline-gray-300 p-5 mt-3 rounded-xl">
            <option value="" selected>حدد الدور الوظيفي...</option>
            <option value="كنترول إزالة ملف">كنترول إزالة ملف</option>
            <option value="كنترول تصحيح">كنترول تصحيح </option>
            <option value="كنترول تحويل الطلاب">كنترول تحويل الطلاب </option>
            <option value="كنترول تسجيل الطلاب">كنترول تسجيل الطلاب </option>
          </select>
          <!-- <input type="text" v-model="role" id="in1" class="outline-customDarkPurple" /> -->
        </div>
        <div class="flex flex-col">
          <label for="in1">العمر
            <span class="text-red-600">*</span></label>
          <input type="number" v-model="time" class="outline-customDarkPurple" />
        </div>
        <div class="flex flex-col">
          <label for="in1">العنوان
            <span class="text-red-600">*</span></label>
          <input type="text" v-model="address" class="outline-customDarkPurple" />
        </div>
      </div>
    </div>
    <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
      <button class="w-60" @click="addController" :class="{ disabledBtn: close }" :disabled="close">
        حفظ
      </button>
      <button class="w-48" @click="this.$router.replace('/School/Services/Controllers/')">
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
      age: "",
      show: false,
      addedController: {}
    };
  },
  created() {
  },
  computed: {
  },
  mounted() { },
  methods: {
    ...mapActions(["AddController"]),
    formatTime(time) {
      const [hours, minutes, seconds] = time.split(":");
      const formattedHours = ("0" + hours).slice(-2);
      const formattedMinutes = ("0" + minutes).slice(-2);
      return `${formattedHours}:${formattedMinutes} `;
    },
    // validInputs() {
    //   console.log(this.name);
    // },
    async addController() {
      try {
        const data = {
          name: this.name,
          address: this.address,
          role: this.role,
          age: this.age,
        };
        // this.addedController = data;
        await this.AddController(data);
        console.log("Controller Added Successfully");
      } catch (err) {
        console.log(err);
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
