<template>
  <Navbar_Component></Navbar_Component>
  <BaseTeleport :show="success">
    <div class="flex flex-col">
      <span class="text-green-700 text-4xl"> تم التعديل بنجاح </span>
      <i
          class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"
      ></i>
    </div>
  </BaseTeleport>
  <section
      class="m-6 sm:m-16 z-50 "
      data-aos="fade-up"
      data-aos-duration="1000"
  >
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">تعديل المناسبة </span>
      <i
          class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"
      ></i>
    </div>
    <div
        class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto"
    >

      <div class="my-5">
        <span class="text-2xl">بيانات المناسبة</span>
      </div>
      <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="flex flex-col">
          <label for="in1"
          >اسم المناسبة
            <span class="text-red-600">*</span></label
          >
          <input
              @input="validInputs"
              type="text"
              v-model="name"
              id="in1"
              class="outline-customDarkPurple"
          />
        </div>
        <div class="flex flex-col">
          <label for="in1"
          >وقت المناسبة <span class="text-red-600">*</span></label
          >
          <input
              @input="validInputs"
              type="date"
              v-model="date"
              id="in1"
              class="outline-customDarkPurple"
          />
        </div>
        <div class="flex flex-col">
          <label for="in1"
          >تاريخ المناسبة
            <span class="text-red-600">*</span></label
          >
          <input
              @input="validInputs"
              type="time"
              v-model="time"
              id="in1"
              class="outline-customDarkPurple"
          />
        </div>

        <div class="flex flex-col">
          <label for="in7"
          >الحالة <span class="text-red-600">*</span></label
          >
          <div class="custom-select relative">
            <select
                v-model="status"
                id="in7"
                @change="validInputs"
                class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple"
            >
              <option value="" selected></option>
              <option>مفعل</option>
              <option>غير مفعل</option>
            </select>
            <div
                class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none"
            >
              <i class="fa-regular fa-angle-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex flex-col mt-6">
          <label for="in1"
          >وصف المناسبة <span class="text-red-600">*</span></label
          >
          <textarea
              name=""
              id=""
              cols="30"
              v-model="textarea"
              rows="10"
              class="resize-none p-3 outline-none rounded-2xl mt-5"
          ></textarea>
        </div>
      </div>
    </div>
    <div
        class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto "
    >
      <div class="flex flex-col ">
        <label for="in2" class="my-5"
        >اختيار المدارس<span class="text-red-600">*</span></label
        >
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-40">
          <div class="relative h-52">
            <i
                class="fa-sharp fa-solid fa-chevron-down m-3 absolute left-0 top-5"
            ></i>
            <input
                type="text"
                @click="show = !show"
                placeholder="اختيار مدرسة"
                class="w-full cursor-pointer"
                readonly
            />
            <transition name="fade">
              <div
                  v-if="show"
                  class="flex flex-wrap overflow-y-auto custom-scrollbar h-52 sm:w-full w-80  shadow-2xl rounded-2xl mt-6 absolute"
              >
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
                          :checked="isSelected(school.id)"
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
            <div v-if="Eventschools.length===0" class="mt-5 flex  items-center justify-center bg-customSearch">
              <span class="text-3xl">فارعة</span>
              <i class="fa-light fa-glass-empty text-3xl m-5"></i>
            </div>
            <div class="flex flex-wrap mt-10 gap-5 overflow-y-auto">
                  <span
                      v-for="(
                          selectedSchool, index
                      ) in Eventschools"
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
          @click="handleUpdateEvent"
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
import {mapActions, mapGetters} from "vuex";

export default {
  data(){
    return{
      name:"",
      time:"",
      date:"",
      status:"",
      textarea:"",
      Eventschools:[],
      EventSchoolsID:[],
      event:null,
      success:false,
      show:false
    }
  },
  computed:{
    ...mapGetters(["events","schools", "fetchSchoolsStatus"]),
  },
  async mounted(){
    await this.fetchEvent();
    await this.fetchSchools();
  },
  methods:{
    ...mapActions(["FetchEvents","UpdateEvent","fetchSchools"]),
    formatTime(time) {
      const [hours, minutes, seconds] = time.split(":");
      const formattedHours = ("0" + hours).slice(-2);
      const formattedMinutes = ("0" + minutes).slice(-2);
      return `${formattedHours}:${formattedMinutes} `;
    },
    async fetchEvent() {
      try {
        await this.FetchEvents();
        const index = this.$route.params.index;
        this.event = this.events.find(
            (event) => event.id === parseInt(index)
        );
        this.intiData();
      } catch (err) {
        console.error(err);
      }
    },
    intiData(){
      this.name = this.event.name;
      this.time = this.event.time;
      this.date= this.event.date ;
      this.status= this.event.status;
      this.textarea=this.event.description;
      this.Eventschools=this.event.schools;
      this.EventSchoolsID=this.event.schools.map(school => school.pivot.school_id);
    },
    async handleUpdateEvent() {
      try {
        await this.UpdateEvent({
          updateData: {
            name: this.name,
            description: this.textarea,
            date: this.date,
            time: this.formatTime(this.time),
            status:this.status,
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
    }
  }
}
</script>


<style scoped>
@import url("../../../../../UI/CustomsCss/CustomInput.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("./updateEvent.css");
</style>