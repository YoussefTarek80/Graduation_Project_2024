<template>
  <NavBar></NavBar>
  <section class="  sm:py-40 sm:px-40  py-20 px-0 DarbDeatils" data-aos="zoom-in" data-aos-duration="2000">
      <span class="text-3xl  text-customOrange px-5 py-3 rounded-2xl flex items-center gap-2 m-10">  <i class="fa-duotone fa-sparkles"></i>      طلب تقديم لوظيفة معلم
       </span>
      <form action="" class="border-gray-200 border-2 flex flex-col items-center justify-center sm:w-8/12 w-11/12 mx-auto  p-5 rounded-3xl gap-10 ">
        <div class="flex items-center justify-center gap-5 w-full">
          <span class="text-3xl text-customOrange  underline">نافذة التقديم</span>
          <i class="fa-sharp fa-regular fa-person-chalkboard text-5xl text-customOrange"></i>
        </div>
        <div class="flex flex-wrap items-center justify-around w-full schools gap-10">
          <div class="flex flex-col w-full">
            <div class="custom-select relative">
              <select
                  v-model="selectedAdminID"
                  @change="validinput"
                  id="in7"
                  class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple"
              >
                <option value="" selected disabled>الادارة التعليمية</option>
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
          <div class="flex flex-col w-full">
            <div class="custom-select relative">
              <select
                  v-model="selectedSchoolID"
                  @change="validinput"
                  id="in7"
                  class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple"
              >
                <option value="" selected disabled>المدرسة </option>
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
        <div class="flex flex-col input-group w-full">
          <input class="input" required="" autocomplete="off" @input="validinput" v-model="name">
          <label class="user-label">الاسم</label>
        </div>
        <div class="flex flex-col input-group w-full">
          <input class="input" required="" autocomplete="off" @input="validinput"  v-model="email">
          <label class="user-label">البريد الالكتروني</label>
        </div>
        <div class="flex flex-col w-full   ">
          <label for="in8" class="text-gray-400 p-2 text-lg">السيرة الذاتية </label>
          <div
              class="relative"
              @drop="handleFileDrop"
              @dragover.prevent
          >
            <input
                type="file"
                id="in8"
                class="hidden "
                @change="handleFile"
            />
            <label
                for="in8"
                class=" cursor-pointer Filelabel "
                v-if="!file"
            >
              <span >اختر ملف</span>
              او
              <span class="text-customOrange font-bold"
              >قم بسحب الملف هنا</span
              >
            </label>
            <div v-if="file">
              <i
                  class="fa-thin fa-circle-xmark text-red-700 text-2xl p-4 cursor-pointer"
                  @click="DeleteFile"
              ></i>
              <i class="fa-sharp fa-solid fa-file-pdf text-6xl text-red-600"></i>
            </div>
            <input type="text" class="file" readonly v-if="!file" />
          </div>
        </div>
        <div class="w-full">
          <button class="w-full button2 " @click.prevent="sendApplication" :disabled="valid" :class="{disabledBtn:valid}">ارسال</button>
        </div>
      </form>
      <base-teleport :show="send">
        <div class="text-customOrange flex flex-col items-center space-y-5">
          <span>تم ارسال رقم التقديم ل </span>
          <span class="font-bold">youssef.tarek1090@gmail.com</span>
          <i class="fa-sharp fa-solid fa-user-check text-6xl"></i>
        </div>
      </base-teleport>

  </section>
  <Footer></Footer>
</template>
<script>
import NavBar from "../../../components/LandingPage/NavBar.vue";
import Footer from "../../../components/LandingPage/Footer.vue";
import BaseTeleport from "../../../UI/BaseTeleport.vue";

export default {
  components: {
    BaseTeleport,
    Footer,
    NavBar
  },
  data() {
    return {
      file: null,
      send: false,
      selectedAdminID: "",
      selectedSchoolID: "",
      valid: true,
      name: "",
      email: "",
    };
  },
  created() {
    this.loadFormData();
  },
  methods: {
    validinput() {
      if (this.name && this.email && this.file && this.selectedAdminID && this.selectedSchoolID) {
        this.valid = false;
      } else {
        this.valid = true;
      }
      this.saveFormData();
    },
    handleFile(event) {
      this.file = event.target.files[0];
      this.validinput();
    },
    handleFileDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.file = files[0];
      }
      this.validinput();
    },
    DeleteFile() {
      this.file = null;
      this.validinput();
    },
    sendApplication() {
      this.send = true;
      setTimeout(() => {
        this.send = false;
      }, 2000);
      this.clear();
    },
    saveFormData() {
      const formData = {
        name: this.name,
        email: this.email,
        selectedAdminID: this.selectedAdminID,
        selectedSchoolID: this.selectedSchoolID,
        file: this.file ? this.file.name : null,
      };
      localStorage.setItem('formData', JSON.stringify(formData));
    },
    loadFormData() {
      const savedData = JSON.parse(localStorage.getItem('formData'));
      if (savedData) {
        this.name = savedData.name;
        this.email = savedData.email;
        this.selectedAdminID = savedData.selectedAdminID;
        this.selectedSchoolID = savedData.selectedSchoolID;
        if (savedData.file) {
          this.file = {
            name: savedData.file,
          };
        } else {
          this.file = null;
        }
        this.validinput();
      }
    },
    clear() {
      this.name = "";
      this.email = "";
      this.file = null;
      this.selectedAdminID = "";
      this.selectedSchoolID = "";
      localStorage.removeItem('formData');
    },
  },
};
</script>




<style scoped>
@import "../../../UI/CustomsCss/CustomInput.css";
@import "../../../UI/CustomsCss/CustombuttonOrange.css";
.file{
  border-radius: 20px;
  font-size: 20px;
  width: 100%;
  height: 300px;
  border: 2px dashed rgba(44, 44, 44, 0.555);
}
.Filelabel{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

</style>