<template>
  <sc-navbar-comp></sc-navbar-Comp>
  <BaseTeleport :show="success">
    <div class="flex flex-col">
      <span class="text-green-700 text-4xl"> تم التعديل بنجاح </span>
      <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
    </div>
  </BaseTeleport>
  <section class="m-6 sm:m-16 z-50 " data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">تعديل بيانات المُعلم </span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>

    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">
      <div class="my-5">
        <span class="text-2xl">بيانات المُعلم</span>
      </div>
      <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="flex flex-col">
          <label for="in1">اسم المُعلم
            <span class="text-red-600">*</span></label>
          <input @input="validInputs" type="text" v-model="name" id="in1" class="outline-customDarkPurple" />
        </div>
        <div class="flex flex-col">
          <label for="in1">عمر المُعلم <span class="text-red-600">*</span></label>
          <input @input="validInputs" type="number" v-model="age" id="in1" class="outline-customDarkPurple" />
        </div>
        <div class="flex flex-col">
          <label for="in1">المادة
            <span class="text-red-600">*</span></label>
          <input @input="validInputs" type="text" v-model="subject" id="in1" class="outline-customDarkPurple" />
        </div>
        <div class="flex flex-col">
          <label for="in1">العنوان
            <span class="text-red-600">*</span></label>
          <input @input="validInputs" type="text" v-model="address" id="in1" class="outline-customDarkPurple" />
        </div>
      </div>
    </div>

    <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
      <button class="w-60" @click="handleUpdateTeacher" :class="{ disabledBtn: close }" :disabled="close">
        حفظ
      </button>
      <button class="w-48" @click="this.$router.replace('/School/Teachers')">
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
      name: "",
      age: "",
      address: "",
      subject: "",
      teacher: {},
      success: false,
      show: false
    }
  },
  computed: {
    ...mapGetters(["GetTeachers"]),
  },
  async mounted() {
    await this.FetchTeacher();
  },
  methods: {
    ...mapActions(["FetchTeachers", "UpdateTeacher"]),
    formatTime(time) {
      const [hours, minutes, seconds] = time.split(":");
      const formattedHours = ("0" + hours).slice(-2);
      const formattedMinutes = ("0" + minutes).slice(-2);
      return `${formattedHours}:${formattedMinutes} `;
    },
    async FetchTeacher() {
      try {
        await this.FetchTeachers();
        const index = this.$route.params.id;
        this.teacher = this.GetTeachers.find(
          (teacher) => teacher.id === parseInt(index)
        );
        this.intiData();
      } catch (err) {
        console.error(err);
      }
    },
    intiData() {
      this.name = this.teacher.name;
      this.address = this.teacher.address;
      this.age = this.teacher.age;
      this.subject = this.teacher.subject;
    },
    async handleUpdateTeacher() {
      try {
        await this.UpdateTeacher({
          updateData: {
            name: this.name,
            address: this.address,
            age: this.age,
            subject: this.subject,
          },
          id: this.teacher.id
        });
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 1000);
      } catch (err) {
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
@import url("../../Events/Update_Event/updateEvent.css");
</style>