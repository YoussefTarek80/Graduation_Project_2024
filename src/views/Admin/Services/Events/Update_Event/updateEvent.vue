<template>
  <Navbar_Component></Navbar_Component>
  <BaseTeleport :show="success">
    <div class="flex flex-col">
      <span class="text-customDarkPurple text-4xl"> تم التعديل بنجاح </span>
      <i class="fa-sharp fa-solid fa-badge-check text-customDarkPurple text-7xl m-3"></i>
    </div>
  </BaseTeleport>
  <BaseTeleport :show="failed">
    <div class="flex flex-col">
      <span class="text-customDarkPurple text-4xl"> لم يتمكن من التعديل </span>
      <i class="fa-sharp fa-solid fa-circle-xmark text-customDarkPurple text-7xl m-3"></i>
    </div>
  </BaseTeleport>
  <div v-if="!event" class="h-screen">
    <loading_info2></loading_info2>
  </div>
  <section class="m-6 sm:m-16 z-50" data-aos="fade-up" data-aos-duration="1000" v-if="event">
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">تعديل المناسبة</span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">
      <div class="my-5">
        <span class="text-2xl">بيانات المناسبة</span>
      </div>
      <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="flex flex-col input-group">
          <input autocomplete="off" required="" @input="validInputs" type="text" v-model="name" id="in1" class="outline-customDarkPurple input" />
          <label for="in1" class="user-label">اسم المناسبة <span class="text-red-600">*</span></label>
        </div>
        <div class="flex flex-col input-group">
          <input autocomplete="off" required="" @input="validInputs" type="date" v-model="date" id="in2" class="outline-customDarkPurple input" />
          <label for="in2" class="user-label">تاريخ المناسبة <span class="text-red-600">*</span></label>
          <span v-if="dateError" class="text-red-600 px-2 py-1">برجاء اختيار تاريخ بعد تاريخ اليوم</span>
        </div>
        <div class="flex flex-col input-group">
          <input @input="validInputs" type="time" v-model="time" id="in3" class="outline-customDarkPurple input" />
          <label for="in3" class="user-label">وقت المناسبة <span class="text-red-600">*</span></label>
        </div>
      </div>
      <div>
        <div class="flex flex-col mt-6">
          <label for="in1">وصف المناسبة <span class="text-red-600">*</span></label>
          <textarea @input="validInputs" v-model="textarea" cols="30" rows="10" class="resize-none p-3 outline-none rounded-2xl mt-5"></textarea>
        </div>
      </div>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">
      <div class="flex flex-col input-group">
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-40">
          <div class="relative h-52">
            <i class="fa-sharp fa-solid fa-chevron-down m-3 absolute left-0 top-2"></i>
            <input autocomplete="off" required="" type="text" @click="show = !show" class="w-full cursor-pointer input" readonly />
            <label for="in2" class="user-label">اختيار المدارس<span class="text-red-600">*</span></label>
            <transition name="fade">
              <div v-if="show" class="flex flex-wrap overflow-y-auto custom-scrollbar h-52 sm:w-full w-80 shadow-2xl rounded-2xl mt-6 absolute">
                <label v-for="school in schools" :key="school.id" class="container px-14 m-5 flex shadow-customPurple shadow rounded-xl">
                  <div class="flex gap-32 p-5 items-center justify-between">
                    <div>
                      <input type="checkbox" :checked="isSelected(school.id)" @change="toggleSelection(school)" />
                      <div class="checkmark"></div>
                    </div>
                    <span>{{ school.name }}</span>
                  </div>
                </label>
              </div>
            </transition>
          </div>
          <div class="relative h-80">
            <span>المدارس المختارة</span>
            <div v-if="Eventschools.length === 0" class="mt-5 flex items-center justify-center bg-customSearch">
              <span class="text-3xl">فارعة</span>
              <i class="fa-light fa-glass-empty text-3xl m-5"></i>
            </div>
            <div class="flex flex-wrap mt-10 gap-5 overflow-y-auto">
              <span v-for="(selectedSchool, index) in Eventschools" :key="index" class="shadow-lg p-5 bg-customPurple text-white rounded-full">{{ selectedSchool.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
      <button class="w-60" @click="handleUpdateEvent" :class="{ disabledBtn: close }" :disabled="close">حفظ</button>
      <button class="w-48" @click="this.$router.replace('/Admin/Event')">الغاء</button>
    </div>
  </section>
  <Footer_Component></Footer_Component>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loading_info2 from "../../../../../UI/loadingInformation/loading_info2.vue";

export default {
  components: { Loading_info2 },
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
      failed: false,
      show: false,
      close: false,
      dateError: false,
    };
  },
  computed: {
    ...mapGetters(["events", "schools", "fetchSchoolsStatus"]),
  },
  async created() {
    await this.fetchEvent();
    await this.fetchSchools();
    console.log(this.EventSchoolsID);
  },
  methods: {
    ...mapActions(["FetchEvents", "UpdateEvent", "fetchSchools"]),
    formatTime(time) {
      const [hours, minutes] = time.split(":");
      const formattedHours = ("0" + hours).slice(-2);
      const formattedMinutes = ("0" + minutes).slice(-2);
      return `${formattedHours}:${formattedMinutes} `;
    },
    intiData() {
      this.name = this.event.name;
      this.time = this.event.time;
      this.date = this.event.date;
      this.status = "مفعل";
      this.textarea = this.event.description;
      this.Eventschools = this.event.schools;
      this.EventSchoolsID = this.event.schools.map(school => school.pivot.school_id);
      this.validInputs();
    },
    async fetchEvent() {
      try {
        await this.FetchEvents();
        const index = this.$route.params.index;
        this.event = this.events.find(event => event.id === parseInt(index));
        this.intiData();
      } catch (err) {
        console.error(err);
      }
    },
    validInputs() {
      const today = new Date().toISOString().split("T")[0];
      this.dateError = this.date && this.date <= today;
      this.close = !this.name || !this.textarea || !this.time || !this.date || this.EventSchoolsID.length === 0 || this.dateError;
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
            schools: this.EventSchoolsID,
          },
          id: this.event.id,
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
    isSelected(schoolId) {
      return this.EventSchoolsID.includes(schoolId);
    },
    toggleSelection(school) {
      if (this.isSelected(school.id)) {
        const index = this.Eventschools.findIndex(selected => selected.id === school.id);
        this.Eventschools.splice(index, 1);
        this.EventSchoolsID.splice(index, 1);
      } else {
        this.Eventschools.push(school);
        this.EventSchoolsID.push(school.id);
      }
      this.validInputs();
    },
  },
};
</script>

<style scoped>
@import url("../../../../../UI/CustomsCss/CustomInput.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("./updateEvent.css");
</style>
