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
      <div v-if="!item" class="h-screen">
        <loading_info2 ></loading_info2>
      </div>

        <section
            class="m-6 sm:m-16"
            data-aos="fade-up"
            data-aos-duration="1000"
            v-if="item"
        >
            <div class="flex flex-col items-center">
                <span class="text-3xl sm:text-4xl">تعديل مدرسة </span>
                <i
                    class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"
                ></i>
            </div>
            <div
                class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto"
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
                    <label for="in5" class="user-label">رقم هاتف المدرسة<span class="text-red-600">*</span></label>
                  </div>
                    <div class="flex flex-col input-group">
                    <input
                        required=""
                        autocomplete="off"
                        class="input"
                        type="text"
                        id="in6"
                        v-model="address"
                        @input="validInputs"
                    />
                    <label for="in6" class="user-label"
                    >عنوان المدرسة
                      <span class="text-red-600">*</span></label
                    >
                  </div>
                    <div class="flex flex-col">
                        <div class="custom-select relative">
                            <select
                                v-model="country"
                                @change="validInputs"
                                id="in2"
                                class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple"
                            >
                                <option value="" selected disabled>الدولة</option>
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
                    <input
                        type="checkbox"
                        :checked="isSelected(stage.id)"
                        @change="toggleSelection(stage.id)"
                    >
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
                            class="hidden"
                            @change="handleFile"
                        />
                        <label
                            for="in8"
                            class="w-96 py-2 px-4 text-center cursor-pointer Filelabel"
                            v-if="!imageURL"
                        >
                            <span>اختر ملف</span>
                            او
                            <span class="text-customDarkPurple font-bold"
                                >قم بسحب الملف هنا</span
                            >
                        </label>
                        <div v-if="imageURL">
                            <i
                                class="fa-thin fa-circle-xmark text-red-700 text-2xl p-4 cursor-pointer"
                                @click="DeleteFile"
                            ></i>
                            <img
                                :src="imageURL"
                                alt="error"
                                class="w-60 h-60 object-cover  m-3 rounded-full"
                            />
                        </div>
                        <input type="text" class="file" readonly v-if="!imageURL" />
                    </div>
                </div>
            </div>
            <div
                class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto"
            >
              <span class="text-3xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2 m-10">  <i class="fa-duotone fa-sparkles"></i>بيانات المدير </span>

                <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6 ">
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
                            :class="{ 'error': checkPhone }"
                            class="input"
                        />
                        <label for="in11" class="user-label"
                        >رقم هاتف المدير
                          <span class="text-red-600">*</span></label
                        >
                        <div class="error_email text-red-600 px-10 absolute -bottom-6 text-sm" v-if="checkPhone">
                          <span>رقم الهاتف يجب ان يكون مكون من 11 رقم</span>
                        </div>
                    </div>
                    <div class="flex flex-col input-group">
                        <input
                            autocomplete="off"
                            required=""
                            type="email"
                            id="in12"
                            v-model="Manger_Email"
                            @input="validInputs"
                            :class="{ 'error': checkEmail || checkEmailCaps }"
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
                @click="handleUpdateSchool"
                :class="{ disabledBtn: close }"
                :disabled="close"
            >
              تعديل
            </button>
            <button
                class="w-48"
                @click="this.$router.push('/Admin/Schools')"
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
import { mapActions, mapGetters } from "vuex";
import Loading_info2 from "../../../../../UI/loadingInformation/loading_info2.vue";
export default {
  components: {Loading_info2},
    data() {
        return {
            item:null,
            file: null,
            imageURL: null,
            name: "",
            country: "",
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
            selectedStages: [],
        };
    },
    computed:{
        ...mapGetters(["schools", "fetchSchoolsStatus","GetAllstages"]),
    },
    created() {
        this.fetchData();
        this.loadCountries();
        this.GetStages();
        console.log(this.item)
    },
    mounted() {

    },
  methods: {
        ...mapActions(["fetchSchools", "updateSchool","GetStages"]),
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
        },
        handleFileDrop(event) {
            event.preventDefault();
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                this.file = files[0];
                this.imageURL = URL.createObjectURL(this.file);
            }

        },
        DeleteFile() {
            this.imageURL = null;
            this.file = null;
        },
        async fetchData() {
            try {
                await this.fetchSchools();
                const index = this.$route.params.index;
                this.item = this.schools.find(
                    (school) => school.id === parseInt(index)
                );
                this.initData();
              console.log(this.item)
            } catch (err) {
                console.error(err);
            }
        },
        HandleStatus(status) {
            if (status === 0) {
                return "غير مفعل";
            } else if (status === 1) {
                return "مفعل";
            } else {
                return "Unknown";
            }
        },
        isSelected(stageID) {
          return this.selectedStages.includes(stageID);
        },
        toggleSelection(stageID) {
          const index = this.selectedStages.indexOf(stageID);
          if (index !== -1) {
            this.selectedStages.splice(index, 1);
          } else {
            this.selectedStages.push(stageID);
          }
          console.log(this.selectedStages)
        },
        initData() {
            this.name = this.item.name;
            this.phone = this.item.phone;
            this.address = this.item.address;
            this.Manger_Name = this.item.manager_name;
            this.Manger_Phone = this.item.manager_phone;
            this.Manger_Email = this.item.manager_email ;
            this.Manger_Address = this.item.manager_address;
            this.selectedStages = this.item.stages.map((stage) => stage.pivot.stage_id);
            this.imageURL=this.item.image
            console.log("selected", this.selectedStages)
            console.log("selected2", this.item)
            console.log("this:",this.imageURL);
        },

        async handleUpdateSchool() {
            try {
                await this.updateSchool({
                  formData:{
                    name: this.name,
                    phone: this.phone,
                    address: this.address,
                    file: this.file,
                    manager_name: this.Manger_Name,
                    manager_phone: this.Manger_Phone,
                    email: this.Manger_Email,
                    manager_address: this.Manger_Address,
                    stages:this.selectedStages
                  },
                  id: this.item.id
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
            this.checkPhone ||
            this.checkEmail ||
            this.checkEmailCaps;
      },
    },
};
</script>
<style scoped>
@import url("./updateSchool.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../UI/CustomsCss/CustomInput.css");
</style>
