<template>
    <div>
        <Navbar_Component></Navbar_Component>
        <BaseTeleport :show="success">
            <div class="flex flex-col">
                <span class="text-green-700 text-4xl"> تم الاضافة بنجاح </span>
                <i
                    class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"
                ></i>
            </div>
        </BaseTeleport>
        <section
            class="m-6 sm:m-16 z-50"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <div class="flex flex-col items-center">
                <span class="text-3xl sm:text-4xl">اضافة مدرسة جديدة</span>
                <i
                    class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"
                ></i>
            </div>
            <div
                class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto school "
            >
              <span class="text-3xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2 m-10">  <i class="fa-duotone fa-sparkles"></i>بيانات المدرسة </span>
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
                      <label for="in1" class="user-label">اسم المدرسة<span class="text-red-600">*</span></label>
                    </div>
                    <div class="flex flex-col input-group">
                      <input
                          autocomplete="off"
                          required=""
                          type="text"
                          id="in5"
                          v-model="phone"
                          @input="validInputs"
                          class="input"
                      />
                      <label for="in5" class="user-label"
                      >رقم هاتف المدرسة
                        <span class="text-red-600">*</span></label
                      >
                    </div>
                    <div class="flex flex-col input-group">

                      <input
                          autocomplete="off"
                          required=""
                          type="text"
                          id="in6"
                          v-model="address"
                          @input="validInputs"
                          class="input"
                      />
                      <label for="in6" class="user-label"
                      >عنوان المدرسة
                        <span class="text-red-600 ">*</span></label
                      >
                      <span class="text-sm text-red-600 mx-2 mt-1">العنوان بالتفصيل - المحافظة : 270 شارع بورسعيد القاهره</span>
                    </div>
                    <div class="flex flex-col">
                        <div class="custom-select relative">
                            <select
                                v-model="country"
                                @change="validInputs"
                                id="in2"
                                class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple"
                            >
                                <option value="" selected disabled >الدولة</option>
                                <option v-for="con in countries" :key="con">
                                    {{ con }}
                                </option>
                            </select>
                            <div
                                class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none"
                            >
                                <i class="fa-regular fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div class="custom-select relative">
                            <select
                                v-model="status"
                                id="in7"
                                @change="validInputs"
                                class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple"
                            >
                                <option value="" selected disabled>الحالة</option>
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
                <div class="custom-checkbox-group m-3 mt-5 ">
                  <span class="text-gray-400">المراحل الدراسية</span>
                  <div class="flex items-center gap-5">
                    <label v-for="stage in GetAllstages" :key="stage.id" class="mt-5 flex items-center gap-4">
                      <input type="checkbox"  @change="addStages(stage.id)"   :value="stage.id" >
                      <label :for="stage.id"> {{ stage.stage_name }}</label><br>
                    </label>
                  </div>
                </div>
                <div class="flex flex-col w-full sm:w-auto mb-4 sm:mb-0 mt-3">
                    <label for="in8" class="px-5 pt-5 text-customDarkPurple text-xl">شعار المدرسة</label>
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
                            <span class="text-customDarkPurple font-bold"
                                >قم بسحب الملف هنا</span
                            >
                        </label>
                        <div v-if="file">
                            <i
                                class="fa-thin fa-circle-xmark text-red-700 text-2xl p-4 cursor-pointer"
                                @click="DeleteFile"
                            ></i>
                            <img
                                :src="imageURL"
                                alt="error"
                                class="w-60 h-60 m-3 rounded-full"
                            />
                        </div>
                        <input type="text" class="file" readonly v-if="!file" />
                    </div>
                </div>
                <div class="w-full">
                  <Map :address="address" @update-lat-lng="handleUpdateLatLng"></Map>
                </div>
            </div>
            <div
                class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto"
            >
              <span class="text-3xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2 m-10">  <i class="fa-duotone fa-sparkles"></i>بيانات المدير </span>
                <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div class="flex flex-col input-group">
                        <input
                            autocomplete="off"
                            required=""
                            @input="validInputs"
                            v-model="Manger_Name"
                            type="text"
                            id="in10"
                            class="outline-customDarkPurple input"
                        />
                        <label for="in10" class="user-label"
                        >اسم المدير
                          <span class="text-red-600">*</span></label
                        >
                    </div>
                    <div class="flex flex-col input-group">
                        <input
                            autocomplete="off"
                            required=""
                            type="text"
                            id="in11"
                            v-model="Manger_Phone"
                            @input="validInputs"
                            :class="{ error: checkPhone }"
                            class="input"
                        />
                        <label for="in11"  class="user-label"
                        >رقم هاتف المدير
                          <span class="text-red-600">*</span></label
                        >
                        <div class="error_email text-red-600 px-10 absolute -bottom-6 text-sm" v-if="checkPhone">
                          <span>رقم الهاتف يجب ان يكون مكون من 11 رقم</span>
                        </div>
                    </div>
                    <div class="flex flex-col input-group relative">
                      <input
                          autocomplete="off"
                          required=""
                          type="text"
                          id="in12"
                          v-model="Manger_Email"
                          @input="validInputs"
                          :class="{ error: checkEmail || checkEmailCaps }"
                          class="input"
                      />
                      <label for="in12" class="user-label"
                      >البريد الالكتروني للمدير
                        <span class="text-red-600">*</span></label
                      >
                      <div class="flex flex-col">
                        <div class="error_email text-red-600 px-10 absolute -bottom-12 text-sm" v-if="checkEmailCaps">
                          <span>البريد الإلكتروني يجب أن لا يحتوي على حروف كبيرة</span>
                        </div>
                        <div class="error_email text-red-600 px-10 absolute -bottom-6 text-sm" v-if="checkEmail">
                          <span>البريد الإلكتروني يجب أن يحتوي علي @</span>
                        </div>
                      </div>

                    </div>
                    <div class="flex flex-col input-group">
                        <input
                            autocomplete="off"
                            required=""
                            type="text"
                            id="in14"
                            v-model="Manger_Address"
                            @input="validInputs"
                            class="input"
                        />
                      <label for="in14" class="user-label">
                        عنوان المدير
                        <span class="text-red-600">*</span></label
                      >
                    </div>
                </div>

            </div>
          <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
            <button
                class="w-60"
                @click="add_New_School"
                :class="{ disabledBtn: close }"
                :disabled="close"
            >
              حفظ
            </button>
            <button
                class="w-48"
                @click="this.$router.replace('/Admin/Schools')"
            >
              الغاء
            </button>
          </div>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
import axios from "axios";
import Map from './MapLocation/map_location.vue'
import {mapActions, mapGetters} from "vuex";
export default {
  components:{
    Map
  },
    data() {
        return {
            file: null,
            imageURL: null,
            name: "",
            country: "",
            education_type: "",
            phone: "",
            address: "",
            status: "",
            Manger_Name: "",
            Manger_Phone: "",
            Manger_Email: "",
            Manger_Address: "",
            close: true,
            success: false,
            messagesError: [],
            countries: [],
            checkPhone: false,
            checkEmail: false,
            checkEmailCaps:false,
            stages:[],
            lat:0,
            lng:0,
            showToggle:false
        };
    },
    mounted() {
        this.validInputs();
        this.loadCountries();
    },
    computed:{
      ...mapGetters(["GetAllstages"])
    },
    created(){
       this.GetStages();
    },
    methods: {
        ...mapActions(["addNewSchool","GetStages"]),
        async loadCountries() {
            try {
                const response = await axios.get(
                    "https://restcountries.com/v3.1/all"
                );
                this.countries = response.data.map(
                    (country) => country.name.common
                );
            } catch (error) {
                console.error("Error loading countries:", error);
            }
        },
        handleFile(event) {
            this.file = event.target.files[0];
            this.imageURL = URL.createObjectURL(this.file);
            console.log(this.file);
        },
        handleFileDrop(event) {
            event.preventDefault();
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                this.file = files[0];
                this.imageURL = URL.createObjectURL(this.file);
            }
            console.log(this.file);
        },
        DeleteFile() {
            this.imageURL = null;
            this.file = null;
        },
        clear() {
            this.name = "";
            this.country = "";
            this.certificate_type = "";
            this.education_type = "";
            this.phone = "";
            this.address = "";
            this.status = "";
            this.Manger_Name = "";
            this.Manger_Phone = "";
            this.Manger_Email = "";
            this.Manger_Address = "";
        },
        validInputs() {
          const phoneRegex = /^[0-9]{11}$/;
          const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
          this.checkPhone = !phoneRegex.test(this.Manger_Phone);
          this.checkEmail = !emailRegex.test(this.Manger_Email);
          this.checkEmailCaps = /[A-Z]/.test(this.Manger_Email);
          this.close =
              !this.name ||
              !this.phone ||
              !this.address ||
              !this.country ||
              !this.status ||
              !this.Manger_Name ||
              !this.Manger_Phone ||
              !this.Manger_Email ||
              !this.Manger_Address ||
              this.lat===0 ||
              this.lng===0 ||
              this.checkPhone ||
              this.checkEmail ||
              this.checkEmailCaps;

        },
        addStages(id) {
            const index = this.stages.indexOf(id);
            if (index > -1) {
              this.stages.splice(index, 1);
            } else {
              this.stages.push(id);
            }
            console.log(this.stages);
        },
        handleUpdateLatLng(coords){
          this.lat = coords.lat;
          this.lng = coords.lng;
          this.validInputs();
          console.log(this.lat,this.lng)
        },
      async add_New_School() {
        try {
          const formData = new FormData();
          formData.append("name", this.name);
          formData.append("phone", this.phone);
          formData.append("address", this.address);
          formData.append("manager_name", this.Manger_Name);
          formData.append("manager_address", this.Manger_Address);
          formData.append("manager_phone", this.Manger_Phone);
          formData.append("email", this.Manger_Email);
          formData.append("lat", this.lat);
          formData.append("lng", this.lng);
          this.stages.forEach((stageID) => {
            formData.append('stages[]', stageID);
          });
          formData.append("image", this.file);
          await this.addNewSchool({formData:formData});

          this.success = true;
          setTimeout(() => {
            this.success = false;
            this.clear();
            this.close = true;
          }, 2000);
        } catch (err) {
          console.log(err.response.data.data);
          this.messagesError = Object.values(err.response.data.data).flatMap((errorArray) => errorArray);
          console.log(this.messagesError);
        }
      },

    },
};
</script>
<style scoped>
@import url("./addSchool.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../UI/CustomsCss/CustomInput.css");
</style>
