<template>
    <section class="relative">
        <BaseTeleport :show="success">
            <div class="flex flex-col">
                <span class="text-green-700 text-4xl"> تم التعديل بنجاح </span>
                <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
            </div>
        </BaseTeleport>
        <BaseTeleport :show="failed">
            <div class="flex flex-col">
                <span class="text-red-700 text-4xl"> فشل التعديل</span>
                <i class="fa-sharp fa-solid fa-badge-check text-red-700 text-7xl m-3"></i>
            </div>
        </BaseTeleport>

        <img src="../../../assets/Logo/head-bg.png" class="sm:h-full h-36" alt="" />
        <button class="float-left sm:m-10 m-2 absolute top-0 left-0 sm:w-96 w-32 flex items-center justify-around"
            @click="this.$router.push('/school/home')">
            <span class="sm:text-2xl text-sm">رجوع للصفحة الرئيسية</span>
            <i class="fa-regular fa-arrow-turn-left sm:text-3xl text-sm"></i>
        </button>
        <div class="profileImage">
            <label for="fileInput" data-aos="fade-up" data-aos-duration="1000">
                <img :src="GetUser2.school_image" alt="My Image" />
            </label>
            <input v-if="role == 'manager'" id="fileInput" type="file" style="display: none" @change="handleFile" />
        </div>
    </section>

    <section class="mt-40 mx-8 md:mx-24" data-aos="fade-up" data-aos-duration="1000">
        <div class="bg-customBGCards rounded-xl shadow-xl p-6 sm:w-full">
            <div class="mt-5 mb-10">
                <span class="text-2xl">بيانات المدير</span>
            </div>
            <form action="" @submit.prevent="updateSchoolProfile">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col input-group">
                        <input v-model="name" required placeholder=" العنوان " type="text" class="input" />
                        <label for="" class="user-label">اسم مدير المدرسة<span class="text-red-600">*</span></label>
                        <span v-if="!this.v_m_name && name != ''" class="text-red-600">ادخل حروفاً عربية فقط </span>
                        <span v-else-if="name == ''" class="text-red-600">هذا الحقل مطلوب</span>
                    </div>
                    <div class="flex flex-col input-group">
                        <input v-model="address" required placeholder="العنوان" type="text" class="input" />
                        <label for="" class="user-label">العنوان<span class="text-red-600">*</span></label>
                        <span v-if="address == ''" class="text-red-600">هذا الحقل مطلوب</span>
                    </div>
                    <div class="flex flex-col input-group">
                        <input v-model="phone" required placeholder=" رقم الهاتف " type="text" class="input" />
                        <label for="" class="user-label">رقم الهاتف<span class="text-red-600">*</span></label>
                        <span v-if="!this.v_m_phone && phone != ''" class="text-red-600 text-xs">رقم الهاتف يجب ان يكون
                            11
                            رقم ويبدء ب 010 او 011 او 012او 015</span>
                        <span v-else-if="phone == ''" class="text-red-600">هذا الحقل مطلوب</span>
                    </div>
                    <div class="flex flex-col input-group">
                        <label for="" class="p-2">البريد الالكتروني</label>
                        <input v-model="email" disabled placeholder=" ايميل الكتروني " type="text" class="input" />
                    </div>
                    <div class="flex flex-col input-group">
                        <label for="" class="p-2">الدولة</label>
                        <input disabled value="مصر" placeholder="العنوان" type="text" class="input" />
                    </div>
                </div>
                <div class="m-5 flex items-center justify-end">
                    <button @click="submit" class="w-60">حفظ</button>
                </div>
            </form>
        </div>

        <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-14 sm:w-full">
            <div class="my-5">
                <span class="text-2xl">بيانات المدرسة</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="flex flex-col input-group">
                    <label for="" class="p-2">اسم المدرسة</label>
                    <input disabled v-model="school_name" placeholder=" العنوان " type="text" class="input" />
                </div>
                <div class="flex flex-col input-group">
                    <label for="" class="p-2">الدولة</label>
                    <input disabled value="مصر" placeholder="العنوان" type="text" class="input" />
                </div>
                <div class="flex flex-col input-group">
                    <label for="" class="p-2">المحافظة</label>
                    <input disabled v-model="adminstartion_state" placeholder="العنوان" type="text" class="input" />
                </div>
                <div class="flex flex-col input-group">
                    <label for="" class="p-2">العنوان</label>
                    <input disabled v-model="school_address" id="email" placeholder="العنوان" type="text"
                        class="input" />
                </div>
            </div>
            <hr class="h-1 m-5 bg-gray-700">
            <div class="mt-14 mb-5">
                <span class="text-2xl">بيانات الإدارة التابعة لها المدرسة</span>
            </div>
            <form action="" @submit.prevent>
                <div class="input_Div grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col">
                        <label for="" class="p-2">اسم الادارة</label>
                        <input disabled v-model="adminstartion_name" placeholder=" اسم الادارة " type="text"
                            class="input" />
                    </div>
                    <div class="flex flex-col">
                        <label for="" class="p-2">الدولة</label>
                        <input disabled value="مصر" placeholder=" دولة " type="text" class="input" />
                    </div>
                    <div class="flex flex-col">
                        <label for="" class="p-2">عنوان الادارة</label>
                        <input disabled v-model="adminstartion_address" placeholder=" العنوان " type="text"
                            class="input" />
                    </div>
                    <div class="flex flex-col">
                        <label for="" class="p-2">المحافظة</label>
                        <input disabled v-model="adminstartion_state" placeholder=" العنوان " type="text"
                            class="input" />
                    </div>
                    <div class="flex flex-col">
                        <label for="" class="p-2">رقم هاتف الادارة</label>
                        <input disabled v-model="adminstartion_phone" placeholder=" العنوان " type="text"
                            class="input" />
                    </div>
                </div>
            </form>
        </div>

        <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full">
            <div class="my-5">
                <span class="text-2xl">تغيير كلمة المرور</span>
            </div>
            <form action="" @submit.prevent="updatePassword">
                <div class="flex flex-col">
                    <label for="" class="p-2">
                        كلمة المرور القديمة<span class="text-red-600">*</span></label>
                    <input v-model="OldPassword" placeholder="كلمة المرور " type="password"
                        class="border-2 border-gray-300 px-5 py-2 rounded-xl outline-none " />
                    <span v-if="OldPassword == '' && submit" class="text-red-600">هذا الحقل مطلوب</span>
                </div>
                <div class="flex flex-col">
                    <label for="" class="p-2">
                        كلمة المرور الجديدة<span class="text-red-600">*</span></label>
                    <input v-model="NewPassword" placeholder="كلمة المرور " type="password"
                        class="border-2 border-gray-300 px-5 py-2 rounded-xl outline-none " />
                    <span v-if="NewPassword == '' && submit" class="text-red-600">هذا الحقل مطلوب</span>
                </div>
                <div class="flex flex-col mt-5">
                    <label for="" class="p-2">
                        تاكيد كلمة المرور الجديدة<span class="text-red-600">*</span></label>
                    <input v-model="NewPasswordConf" placeholder=" تاكيد كلمة المرور" type="password"
                        class="border-2 border-gray-300 px-5 py-2 rounded-xl outline-none" />
                    <span v-if="NewPasswordConf == '' && submit" class="text-red-600">هذا الحقل مطلوب</span>
                </div>
                <div class="m-5 flex items-center justify-end">
                    <button @click="submitt()" class="w-60">تغيير كلمة المرور</button>
                </div>
            </form>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
    data() {
        return {
            role: "",
            imageURL: null,
            file: null,
            v_m_name: true,
            v_m_phone: true,
            saved: false,
            submit: false,
            success: false,
            failed: false,
            OldPassword: "",
            NewPassword: "",
            NewPasswordConf: "",
        };
    },
    computed: {
        ...mapGetters(["GetUser2"]),
    },
    created() {
        this.role = localStorage.getItem('role');
        this.initData();
        this.FetchData();
        console.log(this.GetUser2)
    },
    methods: {
        ...mapActions(["FetchUser2"]),
        handleFile(event) {
            this.file = event.target.files[0];
            this.imageURL = URL.createObjectURL(this.file);
        },
        submitt() { this.submit = true }
        ,
        initData() {
            this.name = this.GetUser2.name;
            this.email = this.GetUser2.email;
            this.phone = this.GetUser2.phone;
            this.address = this.GetUser2.address;
            this.imageURL = this.GetUser2.school_image;
            this.school_name = this.GetUser2.school_name;
            this.school_address = this.GetUser2.school_address;
            this.adminstartion_name = this.GetUser2.adminstartion_name;
            this.adminstartion_state = this.GetUser2.adminstartion_state;
            this.adminstartion_phone = this.GetUser2.adminstartion_phone;
            this.adminstartion_address = this.GetUser2.adminstartion_address;
        },
        async FetchData() {
            try {
                await this.FetchUser2(this.role);
                this.initData();
            } catch (error) {
                console.error("Error fetching profile info:", error);
            }
        },
        async updateSchoolProfile() {
            try {
                if (this.valid_input1(this.name) && this.valid_input2(this.phone) && this.address != '') {
                    this.v_m_name = this.valid_input1(this.name);
                    const token = localStorage.getItem("token");
                    const updatedData = new FormData();
                    if (this.role == 'manager') {
                        updatedData.append("manager_name", this.name);
                        updatedData.append("manager_phone", this.phone);
                        updatedData.append("manager_address", this.address);
                        updatedData.append("image", this.file);
                        await axios.post(
                            "http://127.0.0.1:8000/api/school/manager/updateProfile",
                            updatedData,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        );
                    }
                    else if (this.role == 'staff') {
                        updatedData.append("staff_name", this.name);
                        updatedData.append("staff_phone", this.phone);
                        updatedData.append("staff_address", this.address);
                        updatedData.append("image", this.file);
                        await axios.post(
                            "http://127.0.0.1:8000/api/school/staff/updateProfile",
                            updatedData,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        );
                    }
                    await this.FetchUser2(this.role);
                    this.v_m_name = this.valid_input1(this.name);
                    this.v_m_phone = this.valid_input2(this.phone);
                    this.success = true;
                    setTimeout(() => {
                        this.success = false;
                    }, 1000);
                    console.log("Data Updated successfully");
                }
                else {
                    this.v_m_name = this.valid_input1(this.name);
                    this.v_m_phone = this.valid_input2(this.phone);
                    this.failed = true;
                    setTimeout(() => {
                        this.failed = false;
                    }, 1000);
                }
            } catch (error) {
                console.error("Error fetching profile info:", error);
                this.failed = true;
                setTimeout(() => {
                    this.failed = false;
                }, 1000);
            }
        },
        async updatePassword() {
            const token = localStorage.getItem("token");
            const updatedData = new FormData();
            updatedData.append("current_password", this.OldPassword);
            updatedData.append("password", this.NewPassword);
            updatedData.append("password_confirmation", this.NewPasswordConf);
            try {
                if (this.NewPassword != '' && this.OldPassword != '' && this.NewPasswordConf != '') {
                    await axios.post(
                        "http://127.0.0.1:8000/api/school/updatePassword",
                        updatedData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    this.success = true;
                    setTimeout(() => {
                        this.success = false;
                    }, 1000);
                    console.log("Password Changed Successfully");
                }
            } catch (err) {
                console.log("error");
                this.failed = true;
                setTimeout(() => {
                    this.failed = false;
                }, 1000);
            }
            this.clear();
        },
        clear() {
            this.OldPassword = "";
            this.NewPassword = "";
            this.NewPasswordConf = "";
        },
        valid_input1(v) {
            var arabicPattern = /^[\u0600-\u06FF\s]+$/;
            return arabicPattern.test(v);
        },
        valid_input2(v) {
            var phonePattern = /^(010|011|012|015)[0-9]{8}$/;
            return phonePattern.test(v) && v.length == 11;
        }
    },
};
</script>

<style scoped>
@import url("./profile.css");
@import url("../../../UI/CustomsCss/Custombutton.css");
@import url("../../../UI/CustomsCss/CustomInput.css");
</style>
