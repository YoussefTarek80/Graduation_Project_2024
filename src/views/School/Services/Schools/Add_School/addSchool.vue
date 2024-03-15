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
            class="m-6 sm:m-16"
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
                        <label for="in3"
                            >نوع شهادة المدرسة
                            <span class="text-red-600">*</span></label
                        >
                        <div class="custom-select relative">
                            <select
                                @change="validInputs"
                                v-model="certificate_type"
                                id="in3"
                                class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple"
                            >
                                <option value="" selected></option>
                                <option>ابتدائية</option>
                                <option>اعدادية</option>
                                <option>ثانوية</option>
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
                                id="in4"
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
                <div class="flex flex-col w-full sm:w-auto mb-4 sm:mb-0 mt-3">
                    <label for="in8">شعار المدرسة</label>
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
                            v-if="!file"
                        >
                            <span>اختر ملف</span>
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
                                class="w-96 m-3 rounded-full"
                            />
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
                        <label for="in14">
                            عنوان المدير
                            <span class="text-red-600">*</span></label
                        >
                        <input
                            type="text"
                            id="in14"
                            v-model="Manger_Address"
                            @input="validInputs"
                        />
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
            </div>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
    data() {
        return {
            file: null,
            imageURL: null,
            name: "",
            country: "",
            certificate_type: "",
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
            falied: false,
            messagesError: [],
            countries: [],
        };
    },
    mounted() {
        this.validInputs();
        this.loadCountries();
    },
    methods: {
        ...mapActions(["addNewSchool"]),
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
            if (
                this.name.trim() === "" ||
                this.country === "" ||
                this.certificate_type === "" ||
                this.education_type === "" ||
                this.phone.trim() === "" ||
                this.address.trim() === "" ||
                this.status === "" ||
                this.Manger_Name.trim() === "" ||
                this.Manger_Phone.trim() === "" ||
                this.Manger_Email.trim() === "" ||
                this.Manger_Address.trim() === ""
            ) {
                this.close = true;
            } else {
                this.close = false;
            }
        },
        async add_New_School() {
            try {
                await this.addNewSchool({
                    name: this.name,
                    phone: this.phone,
                    address: this.address,
                    manager_name: this.Manger_Name,
                    manager_address: this.Manger_Address,
                    manager_phone: this.Manger_Phone,
                    manager_email: this.Manger_Email,
                });
                this.success = true;
                setTimeout(() => {
                    this.success = false;
                    this.clear();
                }, 2000);
            } catch (err) {
                this.falied = true;
                setTimeout(() => {
                    this.falied = false;
                }, 2000);
                console.log(err.response.data.data);
                this.messagesError = Object.values(
                    err.response.data.data
                ).flatMap((errorArray) => errorArray);
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
