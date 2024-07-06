<template>
  <Navbar_Component></Navbar_Component>
  <BaseTeleport :show="success">
    <div class="flex flex-col">
      <span class="text-customDarkPurple text-4xl"> تم الاضافة بنجاح </span>
      <i class="fa-sharp fa-solid fa-badge-check text-customDarkPurple text-7xl m-3"></i>
    </div>
  </BaseTeleport>
  <section class="m-6 sm:m-16 z-50" data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">اضافة مناسبة جديدة</span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto school">
      <span class="text-3xl text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2 m-10">
        <i class="fa-duotone fa-sparkles"></i>بيانات المناسبة
      </span>
      <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="flex flex-col input-group">
          <input
              autocomplete="off"
              required=""
              @input="validInputs"
              type="text"
              v-model="name"
              id="in1"
              class="outline-customDarkPurple input"
          />
          <label for="in1" class="user-label">اسم المناسبة <span class="text-red-600">*</span></label>
        </div>
        <div class="flex flex-col input-group">
          <input
              autofocus=""
              required=""
              @input="validInputs"
              type="date"
              v-model="date"
              id="in1"
              class="outline-customDarkPurple input"
          />
          <label for="in1" class="user-label-time">تاريخ المناسبة <span class="text-red-600">*</span></label>
          <span v-if="dateError" class="text-red-600 px-2 py-1">برجاء اختيار تاريخ بعد تاريخ اليوم</span>
        </div>
        <div class="flex flex-col input-group">
          <input
              required=""
              autocomplete="off"
              @input="validInputs"
              type="time"
              v-model="time"
              id="in3"
              class="outline-customDarkPurple input"
          />
          <label for="in3" class="user-label-time">وقت المناسبة <span class="text-red-600">*</span></label>
          <span v-if="timeError" class="text-red-600 px-2 py-1">برجاء اختيار الوقت بعد 7 صباحا حتي 11 مساءا</span>
        </div>
        <div class="flex flex-col input-group">
          <input
              autocomplete="off"
              required=""
              @input="validInputs"
              type="text"
              v-model="address"
              id="in9"
              class="outline-customDarkPurple input"
          />
          <label for="in9" class="user-label">مكان المناسبة <span class="text-red-600">*</span></label>
        </div>
      </div>
      <div>
        <div class="flex flex-col mt-6 input-group">
          <textarea
              required=""
              name=""
              id="in4"
              cols="30"
              v-model="textarea"
              rows="10"
              class="resize-none input"
              placeholder="وصف المناسبة"
              @input="validInputs"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">
      <div class="flex flex-col input-group">
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-40">
          <div class="relative h-52">
            <i class="fa-sharp fa-solid fa-chevron-down m-3 absolute left-5 top-2"></i>
            <input
                required=""
                autocomplete="off"
                type="text"
                @click="show = !show"
                class="w-full cursor-pointer input"
                readonly
                id="in6"
            />
            <label for="in6" class="user-label">اختيار المدارس<span class="text-red-600">*</span></label>
            <transition name="fade">
              <div
                  v-if="show"
                  class="flex flex-wrap overflow-y-auto custom-scrollbar h-52 sm:w-full w-80 shadow-2xl rounded-2xl mt-6 absolute"
              >
                <div class="flex items-center justify-around w-full text-sm mt-5">
                  <div>
                    <span @click="selectAll()" class="cursor-pointer btn">تحديد الكل</span>
                  </div>
                  <div>
                    <span @click="clearAll()" class="cursor-pointer btn">مسح الكل</span>
                  </div>
                </div>
                <label
                    v-for="school in schools"
                    :key="school.id"
                    class="container px-14 m-5 flex shadow-customPurple shadow rounded-xl"
                >
                  <div class="flex gap-32 p-5 items-center justify-between">
                    <div>
                      <input
                          type="checkbox"
                          :checked="isSelected(school)"
                          @change="toggleSelection(school)"
                      />
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
            <div v-if="selectedSchools.length === 0" class="mt-5 flex items-center justify-center bg-customSearch">
              <span class="text-3xl">فارعة</span>
              <i class="fa-light fa-glass-empty text-3xl m-5"></i>
            </div>
            <div class="flex flex-wrap mt-10 gap-5 overflow-y-auto">
              <span
                  v-for="(selectedSchool, index) in selectedSchools"
                  :key="index"
                  class="shadow-lg p-5 bg-customPurple text-white rounded-full"
              >{{ selectedSchool.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
      <button
          class="w-60"
          @click="addEvent"
          :class="{ disabledBtn: close }"
          :disabled="close"
      >
        حفظ
      </button>
      <button class="w-48" @click="this.$router.replace('/Admin/Event')">
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
      textarea: "",
      time: "",
      date: "",
      address: "",
      SchoolIDs: [],
      selectedSchools: [],
      show: false,
      close: true,
      success: false,
      dateError: false,
      timeError:false
    };
  },
  computed: {
    ...mapGetters(["schools", "fetchSchoolsStatus"]),

  },

  async created() {
    await this.fetchSchools();
  },
  methods: {
    ...mapActions(["fetchSchools", "SetEvent"]),
    formatTime(time) {
      const [hours, minutes] = time.split(":");
      const formattedHours = ("0" + hours).slice(-2);
      const formattedMinutes = ("0" + minutes).slice(-2);
      return `${formattedHours}:${formattedMinutes}`;
    },
    handleTimeError() {
      const [hours, minutes] = this.time.split(":").map(Number);
      const startTime = 7 * 60;
      const endTime = 23 * 60;
      const currentTime = hours * 60 + minutes;
      return currentTime < startTime || currentTime > endTime;
    },
    validInputs() {
      const today = new Date().toISOString().split("T")[0];
      this.dateError = this.date && this.date <= today;
      this.timeError = this.handleTimeError();


      this.close = !this.name || !this.textarea || !this.time || !this.date || !this.address || this.SchoolIDs.length === 0 || this.dateError || this.timeError;
    },
    async addEvent() {
      if (this.close) return;
      try {
        const data = {
          name: this.name,
          description: this.textarea,
          date: this.date,
          address: this.address,
          time: this.formatTime(this.time),
          schools: this.SchoolIDs,
        };
        await this.SetEvent(data);
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 2000);
        this.clearAll();
        // this.$router.replace("/Admin/Event");
      } catch (err) {
        console.log(err);

      }
    },
    toggleSelection(school) {
      if (this.isSelected(school)) {
        this.selectedSchools = this.selectedSchools.filter(
            (selected) => selected.id !== school.id
        );
        this.SchoolIDs = this.SchoolIDs.filter((id) => id !== school.id);
      } else {
        this.selectedSchools.push(school);
        this.SchoolIDs.push(school.id);
      }
      this.validInputs();
    },
    isSelected(school) {
      return this.selectedSchools.some((selected) => selected.id === school.id);
    },
    selectAll() {
      this.selectedSchools = [...this.schools];
      this.SchoolIDs = this.schools.map((school) => school.id);
      this.validInputs();
    },
    clearAll() {
      this.selectedSchools = [];
      this.SchoolIDs = [];
      this.validInputs();
    },
  },
};
</script>

<style scoped>
@import url("../../../../../UI/CustomsCss/CustomInput.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("./add_event.css");
</style>
