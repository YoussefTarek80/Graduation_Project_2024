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
        <span class="text-2xl md:text-3xl text-customDarkPurple px-0 md:px-5 py-3 rounded-2xl flex items-center m-5">
          <i class="fa-duotone fa-sparkles"></i>بيانات المُعلم</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="flex flex-col">
          <label>الإسم<span class="text-red-600">*</span></label>
          <input disabled type="text" v-model="teacher.address" class="item-data" />
          <span v-if="teacher.address == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col">
          <label>المادة<span class="text-red-600">*</span></label>
          <input disabled type="text" v-model="teacher.subject.subject_name" class="item-data" />
          <span v-if="teacher.subject.subject_name == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        <div class="flex flex-col input-group">
          <input required type="text" v-model="teacher.address" class="input" />
          <label class="user-label">العنوان<span class="text-red-600">*</span></label>
          <span v-if="teacher.address == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col input-group">
          <input required type="text" v-model="teacher.phone" class="input" />
          <label class="user-label">الهاتف<span class="text-red-600">*</span></label>
          <span v-if="teacher.phone == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
        </div>
        <div class="flex flex-col input-group">
          <input required type="text" v-model="teacher.email" class="input" />
          <label class="user-label">البريد الإلكتروني<span class="text-red-600">*</span></label>
          <span v-if="teacher.email == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
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
      id: this.$route.params.id,
      teacher: {},
      success: false,
      show: false,
      empty: false,
    }
  },
  computed: {
    ...mapGetters(["GetTeachers", "GetTeacherSubjects"]),
  },
  async created() {
    await this.fetchData();
    console.log(this.teacher);
  },
  methods: {
    ...mapActions(["FetchTeachers", "subjectList", "UpdateTeacher"]),
    formatTime(time) {
      const [hours, minutes, seconds] = time.split(":");
      const formattedHours = ("0" + hours).slice(-2);
      const formattedMinutes = ("0" + minutes).slice(-2);
      return `${formattedHours}:${formattedMinutes} `;
    },
    intiData() {
      this.teacher = this.GetTeachers.find((v) => v.id === parseInt(this.id));
    },
    async fetchData() {
      try {
        await this.subjectList();
        await this.FetchTeachers();
        this.intiData();
      } catch (err) {
        console.error(err);
      }
    },
    async handleUpdateTeacher() {
      try {
        if (this.teacher.address != '' && this.teacher.phone != '' && this.teacher.email != '') {
          await this.UpdateTeacher({
            id: this.teacher.id,
            address: this.teacher.address,
            phone: this.teacher.phone,
            email: this.teacher.email,
          });
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 1000);
        }
        else {
          this.empty = true;
          this.failed = true;
          setTimeout(() => {
            this.failed = false;
          }, 1000);
        }
      } catch (err) {
        this.empty = true;
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
</style>