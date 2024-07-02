<template>
  <sc-navbar-comp></sc-navbar-Comp>

  <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
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
  </section>
  <section class="mt-20 mx-6 sm:mx-24 z-50 " data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">تعديل بيانات المُعلم </span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>

    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">
      <div class="my-5">
        <span class="text-2xl">بيانات المُعلم</span>
      </div>

      <div class="input_Div grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col">
          <label for="in1">اسم المُعلم
            <span class="text-red-600">*</span></label>
          <input type="text" v-model="name" class="outline-customDarkPurple" />
          <span v-if="name == ''" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col">
          <label for="in1">عمر المُعلم <span class="text-red-600">*</span></label>
          <input type="number" v-model="age" class="outline-customDarkPurple" />
          <span v-if="age == ''" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col">
          <label for="in1">المادة <span class="text-red-600">*</span></label>
          <select v-model="subject" class="item-data outline-customDarkPurple">
            <option disabled class="bg-customDarkPurple text-[#fff] font-bold">مواد اللغات</option>
            <option value="اللغة العربية"> اللغة العربية</option>
            <option value="اللغة الإنجليزية"> اللغة الإنجليزية</option>
            <option value="اللغة الفرنسية"> اللغة الفرنسية</option>
            <option value="اللغة الألمانية"> اللغة الألمانية</option>
            <option value="اللغة الإيطالية"> اللغة الإيطالية</option>
            <option disabled class="bg-customDarkPurple text-[#fff] font-bold">المواد العلمية (علمي)</option>
            <option value="الكيمياء"> الكيمياء</option>
            <option value="العلوم">العلوم</option>
            <option disabled class="bg-customDarkPurple text-[#fff] font-bold">المواد العلمية (رياضة)</option>
            <option value="الفيزياء">الفيزياء</option>
            <option value="الرياضة">الرياضة</option>
            <option value="الرياضة البحتة">الرياضة البحتة</option>
            <option value="الهندسة الفراغية">الهندسة الفراغية</option>
            <option disabled class="bg-customDarkPurple text-[#fff] font-bold">المواد الأدبية</option>
            <option value="الدين الإسلامي">الدين الإسلامي</option>
            <option value="الدراسات">الدراسات</option>
            <option value="الجغرافية">الجغرافية</option>
            <option value="التاريخ">التاريخ</option>
            <option value="علم النفس">علم النفس</option>
            <option value="الفلسفة">الفلسفة</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="in1">العنوان
            <span class="text-red-600">*</span></label>
          <input type="text" v-model="address" class="outline-customDarkPurple" />
          <span v-if="address == ''" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
      </div>
    </div>

    <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
      <button class="w-60" @click="handleUpdateTeacher" :class="{ disabledBtn: close }" :disabled="close">
        حفظ
      </button>
      <button class="w-48" @click="this.$router.replace('/school/teachers')">
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
        if (this.name != '' && this.address != '' && this.age != '') {
          await this.UpdateTeacher({
            id: this.teacher.id,
            name: this.name,
            age: this.age,
            address: this.address,
            subject: this.subject,
          });
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 1000);
        }
        else {
          this.failed = true;
          setTimeout(() => {
            this.failed = false;
          }, 1000);
        }
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