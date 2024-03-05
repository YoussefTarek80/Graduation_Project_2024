<template>
    <div>
        <Navbar_Component></Navbar_Component>
        <BaseTeleport :show="success">
            <div class="flex flex-col">
                <span class="text-green-700 text-4xl"> تم التعديل بنجاح </span>
                <i
                    class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"
                ></i>
            </div>
        </BaseTeleport>
        <BaseTeleport :show="failed">
            <div class="flex flex-col">
                <span class="text-red-700 text-4xl"> فشل التعديل</span>
                <i
                    class="fa-sharp fa-solid fa-badge-check text-red-700 text-7xl m-3"
                ></i>
            </div>
        </BaseTeleport>
        <section
            class="m-6 sm:m-16"
            data-aos="fade-up"
            data-aos-duration="1000"
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
                <div class="my-5">
                    <span class="text-2xl">بيانات المدرسة</span>
                </div>
                <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div class="flex flex-col">
                        <label for="in1"
                            >اسم المدرسة
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
                        <label for="in2"
                            >الدولة <span class="text-red-600">*</span></label
                        >
                        <div class="custom-select relative">
                            <select
                                v-model="country"
                                @change="validInputs"
                                id="in2"
                                class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple"
                            >
                                <option value="" selected></option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                            <div
                                class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none"
                            >
                                <i class="fa-regular fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="in3"
                            >نوع شهادة المدرسة
                            <span class="text-red-600">*</span></label
                        >
                        <div class="custom-select relative">
                            <select
                                @change="validInputs"
                                v-model="certificate_type"
                                class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple"
                            >
                                <option value="" selected></option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                            <div
                                class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none"
                            >
                                <i class="fa-regular fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="in4"
                            >الفصول الدراسية
                            <span class="text-red-600">*</span></label
                        >
                        <div class="custom-select relative">
                            <select
                                @change="validInputs"
                                v-model="education_type"
                                class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple"
                            >
                                <option value="" selected></option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                            <div
                                class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none"
                            >
                                <i class="fa-regular fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="in5"
                            >رقم هاتف المدرسة
                            <span class="text-red-600">*</span></label
                        >
                        <input
                            type="text"
                            id="in5"
                            v-model="phone"
                            @input="validInputs"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label for="in6"
                            >عنوان المدرسة
                            <span class="text-red-600">*</span></label
                        >
                        <input
                            type="text"
                            id="in6"
                            v-model="address"
                            @input="validInputs"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label for="in7"
                            >الحالة <span class="text-red-600">*</span></label
                        >
                        <div class="custom-select relative">
                            <select
                                v-model="status"
                                @change="validInputs"
                                class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple"
                            >
                                <option value="" selected></option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                            <div
                                class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none"
                            >
                                <i class="fa-regular fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full sm:w-auto mb-4 sm:mb-0 mt-3">
                    <label for="in8">شعار المدرسة</label>
                    <div class="relative" @drop="handleFileDrop" @dragover.prevent>
                        <input
                            type="file"
                            id="in8"
                            class="hidden"
                            @change="handleFile"
                        />
                        <label
                            for="in8"
                            class="w-96 py-2 px-4 text-center cursor-pointer Filelabel"
                            v-if="!file"
                        >
                            <span>اختر ملف</span>
                            او
                            <span class="text-customDarkPurple font-bold"
                                >قم بسحب الملف هنا</span
                            >
                        </label>
                        <div v-if="file">
                            <i class="fa-thin fa-circle-xmark  text-red-700 text-2xl p-4 cursor-pointer" @click="DeleteFile"></i>
                            <img :src="imageURL" alt="error" class="w-96  m-3 rounded-full"/>
                        </div>
                        <input type="text" class="file" readonly v-if="!file" />
                    </div>
                </div>
            </div>
            <div
                class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto"
            >
                <div class="my-5">
                    <span class="text-2xl">بيانات المدير</span>
                </div>
                <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div class="flex flex-col">
                        <label for="in10"
                            >اسم المدير
                            <span class="text-red-600">*</span></label
                        >
                        <input
                            @input="validInputs"
                            v-model="Manger_Name"
                            type="text"
                            id="in10"
                            class="outline-customDarkPurple"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label for="in11"
                            >رقم هاتف المدير
                            <span class="text-red-600">*</span></label
                        >
                        <input
                            type="text"
                            id="in11"
                            v-model="Manger_Phone"
                            @input="validInputs"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label for="in12"
                            >البريد الالكتروني للمدير
                            <span class="text-red-600">*</span></label
                        >
                        <input
                            type="text"
                            id="in12"
                            v-model="Manger_Email"
                            @input="validInputs"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label for="in13">
                            الباسورد للمدير
                            <span class="text-red-600">*</span></label
                        >
                        <input
                            type="text"
                            id="in13"
                            v-model="Manger_Password"
                            @input="validInputs"
                        />
                    </div>
                </div>
                <div class="m-5 flex items-center justify-end sm:gap-5">
                    <button
                        class="w-60"
                        @click="handleUpdateSchool"
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
            </div>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            item: null,
            name: "",
            phone: "",
            address: "",
            imageURL: "",
            file: null,
            success: false,
            failed: false,
        };
    },
    computed: {
        ...mapGetters(["schools", "fetchSchoolsStatus"]),
    },
    created() {
        this.fetchData();
    },
    methods: {
        ...mapActions(["fetchSchools","updateSchool"]),
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
            console.log(this.file)
        },
        DeleteFile(){
            this.imageURL=null;
            this.file=null
        },
        async fetchData() {
            try {
                await this.fetchSchools();
                const index = this.$route.params.index;
                this.item = this.schools.find(
                    (school) => school.id === parseInt(index)
                );
                this.initData();
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
        initData() {
            this.name = this.item.name;
            this.phone = this.item.phone;
            this.address = this.item.address;
        },
        async handleUpdateSchool() {
            try {
                await this.updateSchool({
                    id: this.item.id,
                    name: this.name,
                    phone: this.phone,
                    address: this.address,
                    file: this.file,
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
    },
};
</script>
<style scoped>
@import url("./updateSchool.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../UI/CustomsCss/CustomInput.css");
</style>
