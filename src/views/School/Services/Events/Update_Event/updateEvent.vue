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
      <span class="text-3xl sm:text-4xl">تعديل المناسبة </span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">

      <div class="my-5">
        <span class="text-2xl">بيانات المناسبة</span>
      </div>
      <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="flex flex-col">
          <label for="in1">اسم المناسبة
            <span class="text-red-600">*</span></label>
          <input @input="validInputs" type="text" v-model="name" id="in1" class="outline-customDarkPurple" />
        </div>
        <div class="flex flex-col">
          <label for="in1">وقت المناسبة <span class="text-red-600">*</span></label>
          <input @input="validInputs" type="date" v-model="date" id="in1" class="outline-customDarkPurple" />
        </div>
        <div class="flex flex-col">
          <label for="in1">تاريخ المناسبة
            <span class="text-red-600">*</span></label>
          <input @input="validInputs" type="time" v-model="time" id="in1" class="outline-customDarkPurple" />
        </div>

        <div class="flex flex-col">
          <label for="in7">الحالة <span class="text-red-600">*</span></label>
          <div class="custom-select relative">
            <select v-model="status" id="in7" @change="validInputs"
              class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple">
              <option value="" selected></option>
              <option>مفعل</option>
              <option>غير مفعل</option>
            </select>
            <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
              <i class="fa-regular fa-angle-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex flex-col mt-6">
          <label for="in1">وصف المناسبة <span class="text-red-600">*</span></label>
          <textarea name="" id="" cols="30" v-model="textarea" rows="10"
            class="resize-none p-3 outline-none rounded-2xl mt-5"></textarea>
        </div>
      </div>
    </div>
    <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
      <button class="w-60" @click="handleUpdateEvent" :class="{ disabledBtn: close }" :disabled="close">
        حفظ
      </button>
      <button class="w-48" @click="this.$router.replace('/School/Services/Events/')">
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
      time: "",
      date: "",
      status: "",
      textarea: "",
      Eventschools: [],
      EventSchoolsID: [],
      event: null,
      success: false,
      show: false
    }
  },
  computed: {
    ...mapGetters(["GetEvents",]),
  },
  async mounted() {
    await this.fetchEvent();
  },
  methods: {
    ...mapActions(["FetchEvents", "UpdateEvent"]),
    formatTime(time) {
      const [hours, minutes, seconds] = time.split(":");
      const formattedHours = ("0" + hours).slice(-2);
      const formattedMinutes = ("0" + minutes).slice(-2);
      return `${formattedHours}:${formattedMinutes} `;
    },
    async fetchEvent() {
      try {
        await this.FetchEvents();
        const index = this.$route.params.id;
        this.event = this.GetEvents.find(
          (event) => event.id === parseInt(index)
        );
        this.intiData();
      } catch (err) {
        console.error(err);
      }
    },
    intiData() {
      this.name = this.event.name;
      this.time = this.event.time;
      this.date = this.event.date;
      this.status = this.event.status;
      this.textarea = this.event.description;
      this.Eventschools = this.event.schools;
      this.EventSchoolsID = this.event.schools.map(school => school.pivot.school_id);
    },
    async handleUpdateEvent() {
      try {
        await this.UpdateEvent({
          updateData: {
            name: this.name,
            description: this.textarea,
            date: this.date,
            time: this.formatTime(this.time),
            status: this.status,
            schools: this.EventSchoolsID
          },
          id: this.event.id
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
@import url("./updateEvent.css");
</style>