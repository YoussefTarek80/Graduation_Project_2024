<template>
  <NavBar></NavBar>
  <BaseTeleport :show="success">
    <div class="flex flex-col">
      <span class="text-customDarkPurple text-4xl"> تم الاضافة بنجاح </span>
      <i
          class="fa-sharp fa-solid fa-badge-check text-customDarkPurple text-7xl m-3"
      ></i>
    </div>
  </BaseTeleport>
  <section
      class="m-6 sm:m-16 z-50 "
      data-aos="fade-up"
      data-aos-duration="1000"
  >
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">اضافة تقرير جديدة</span>
      <i
          class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"
      ></i>
    </div>
    <div
        class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto school "
    >
      <span class="text-3xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2 m-10">  <i class="fa-duotone fa-sparkles"></i>بيانات التقرير </span>
      <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="flex flex-col input-group">
          <input
              autocomplete="off"
              required=""
              @input="validInputs"
              type="text"
              v-model="topic"
              id="in1"
              class="outline-customDarkPurple input"
          />
          <label for="in1" class="user-label">موضوع التقرير<span class="text-red-600">*</span></label>
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
              placeholder="وصف التقرير"
          ></textarea>
        </div>
      </div>
      <div class="flex flex-col input-group mt-10">
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-40">
          <div class="relative h-52">
            <i
                class="fa-sharp fa-solid fa-chevron-down m-3 absolute left-5 top-2"
            ></i>
            <input
                required=""
                autocomplete="off"
                type="text"
                @click="show = !show"
                class="w-full cursor-pointer input"
                readonly
                id="in6"
            />
            <label for="in6" class="user-label"
            >اختيار المدارس<span class="text-red-600">*</span></label
            >
            <transition name="fade">
              <div
                  v-if="show"
                  class="flex flex-wrap overflow-y-auto custom-scrollbar h-52 sm:w-full w-80  shadow-2xl rounded-2xl mt-6 absolute"
              >
                <div
                    class="flex items-center justify-around w-full text-sm mt-5"
                >
                  <div>
                      <span
                          @click="selectAll()"
                          class="cursor-pointer btn"
                      >
                          تحديد الكل
                      </span>
                  </div>
                  <div>
                      <span
                          @click="clearAll()"
                          class="cursor-pointer btn"
                      >
                          مسح الكل
                      </span>
                  </div>
                </div>
                <label
                    v-for="school in schools"
                    :key="school.id"
                    class="container px-14 m-5 flex shadow-customPurple shadow rounded-xl"
                >
                  <div
                      class="flex gap-32 p-5 items-center justify-between"
                  >
                    <div>
                      <input
                          type="checkbox"
                          :checked="isSelected(school)"
                          @change="toggleSelection(school)"
                      />
                      <div class="checkmark"></div>
                    </div>

                    <span class="">
                      {{ school.name }}
                    </span>
                  </div>
                </label>
              </div>
            </transition>
          </div>
          <div class="relative h-80">
            <span>المدارس المختارة</span>
            <div v-if="selectedSchools.length===0" class="mt-5 flex  items-center justify-center bg-customSearch">
              <span class="text-3xl">فارعة</span>
              <i class="fa-light fa-glass-empty text-3xl m-5"></i>
            </div>
            <div class="flex flex-wrap mt-10 gap-5 overflow-y-auto">
                  <span
                      v-for="(
                          selectedSchool, index
                      ) in selectedSchools"
                      :key="index"
                      class="shadow-lg p-5 bg-customPurple text-white rounded-full"
                  >{{ selectedSchool.name }}</span
                  >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
      <button
          class="w-60"
          @click="addReport"
          :class="{ disabledBtn: save }"
          :disabled="save"
      >
        حفظ
      </button>
      <button class="w-48" @click="this.$router.replace('/Admin/Reports')">
        الغاء
      </button>
    </div>
  </section>
  <Footer></Footer>
</template>
<script>
import NavBar from '../../../../../components/Admin/Navbar/Navbar.vue'
import {mapActions, mapGetters} from "vuex";
import Footer from "../../../../../components/Admin/Footer/footer.vue";
import BaseTeleport from "../../../../../UI/BaseTeleport.vue";

export default {
  components:{
    BaseTeleport,
    Footer, NavBar
  },
  data() {
    return {
      topic: "",
      textarea: "",
      SchoolIDs: [],
      selectedSchools: [],
      show: false,
      save:true,
      success:false,
    };
  },
  computed: {
    ...mapGetters(["schools", "fetchSchoolsStatus"]),
  },
  async created() {
    await this.fetchSchools();
  },
  methods: {
    ...mapActions(["fetchSchools", "SetReport"]),
    formatTime(time) {
      const [hours, minutes, seconds] = time.split(":");
      const formattedHours = ("0" + hours).slice(-2);
      const formattedMinutes = ("0" + minutes).slice(-2);
      return `${formattedHours}:${formattedMinutes} `;
    },
    validInputs() {
      if (this.topic && this.textarea && this.selectedSchools.length > 0) {
        this.save = false;
      } else {
        this.save = true;
      }
      console.log(this.formatTime(this.time));
      console.log(this.date);
      console.log(this.SchoolID);
    },
    async addReport() {
      try {
        const form = new FormData();
        form.append("subject",this.topic);
        form.append("description",this.textarea);
        this.SchoolIDs.forEach((schoolId) => {
          form.append('schools[]', schoolId);
        });
        await this.SetReport(form);
        this.success=true;
        setTimeout(()=>{
          this.success=false;
        },2000)
        this.clearAll();

      } catch (err) {
        console.log(err);
      }
    },
    toggleSelection(school) {
      if (this.isSelected(school)) {
        this.selectedSchools = this.selectedSchools.filter(
            (selected) => selected.id !== school.id
        );
        this.SchoolIDs = this.SchoolIDs.filter(id => id !== school.id);
      } else {
        this.selectedSchools.push(school);
        this.SchoolIDs.push(school.id);
      }
      console.log(school)
      this.validInputs();
    },
    isSelected(school) {
      return this.selectedSchools.some(
          (selected) => selected.id === school.id
      );

    },
    selectAll() {
      this.selectedSchools = [];
      this.selectedSchools = [...this.schools];
      this.SchoolIDs = this.schools.map((school) => school.id);
      this.validInputs();
    },
    clearAll() {
      this.topic="";
      this.textarea="";
      this.selectedSchools = [];
      this.SchoolIDs = [];
      this.validInputs();
    },

  },
};
</script>
<style scoped>
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../UI/CustomsCss/CustomInput.css");
@import url("../../Events/Add_Event/add_event.css");
</style>