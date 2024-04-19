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
            @click="this.$router.push('/Admin/Home')">
            <span class="sm:text-2xl text-sm">رجوع للصفحة الرئيسية</span>
            <i class="fa-regular fa-arrow-turn-left sm:text-3xl text-sm"></i>
        </button>
        <div class="profileImage">
            <label for="fileInput" data-aos="fade-up" data-aos-duration="1000">
                <img v-if="imageURL" :src="imageURL" alt="My Image" />
            </label>
            <input id="fileInput" type="file" style="display: none" @change="handleFile" />
        </div>
    </section>
    <section class="mt-40 sm:mx-36" data-aos="fade-up" data-aos-duration="1000">
        <div class="bg-customBGCards rounded-xl shadow-xl p-6 sm:w-full">
            <div class="my-5">
                <span class="text-2xl">بيانات المسئول</span>
            </div>
            <form action="" @submit.prevent="update">
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    <div class="flex flex-col">
                        <label for="in1">اسم المسئول</label>
                        <input v-model="name" disabled id="email" placeholder=" العنوان " type="text"
                            class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in1">البريد الالكتروني </label>
                        <input v-model="email" disabled id="email" placeholder=" العنوان " type="text"
                            class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in2">الدولة</label>
                        <input disabled value="مصر " id="email" placeholder=" العنوان " type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in3">العنوان</label>
                        <input v-model="address" id="email" placeholder=" العنوان " type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in5">رقم الهاتف </label>
                        <input v-model="phone" id="email" placeholder=" رقم الهاتف " type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in5"> الدور الوظيفي</label>
                        <input value="" type="text" class="item-data" />
                    </div>
                </div>
                <div class="m-5 flex items-center justify-end">
                    <button class="w-60">حفظ</button>
                </div>
            </form>
        </div>
        <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full">
            <div class="my-5">
                <span class="text-2xl">بيانات الادارة (للمسئول)</span>
            </div>
            <form action="" @submit.prevent>
                <div class="input_Div grid grid-cols-1 sm:grid-cols-4 gap-6">
                    <div class="flex flex-col">
                        <label for="in1">اسم الادارة</label>
                        <input disabled :value="GetUser.adminstration_name" id="email" placeholder=" العنوان "
                            type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in2">الدولة</label>
                        <input disabled value="مصر" id="email" placeholder=" العنوان " type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in3">عنوان الادارة</label>
                        <input disabled :value="GetUser.adminstration_address" id="email" placeholder=" العنوان "
                            type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in4">المحافظة</label>
                        <input disabled :value="GetUser.adminstration_State" id="email" placeholder=" العنوان "
                            type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in5">رقم هاتف الادارة</label>
                        <input disabled :value="GetUser.adminstration_Phone" id="email" placeholder=" العنوان "
                            type="text" class="item-data" />
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
                    <label for="email" class="my-2 mx-2">
                        كلمة المرور القديمة<span class="text-red-600">*</span></label>
                    <input v-model="OldPassword" id="Oemail" placeholder="كلمة المرور " type="password"
                        class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none" />
                </div>
                <div class="flex flex-col">
                    <label for="email" class="my-2 mx-2">
                        كلمة المرور الجديدة<span class="text-red-600">*</span></label>
                    <input v-model="NewPassword" id="Nemail" placeholder="كلمة المرور " type="password"
                        class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none" />
                </div>
                <div class="flex flex-col mt-5">
                    <label for="email" class="my-2 mx-2">
                        تاكيد كلمة المرور الجديدة<span class="text-red-600">*</span></label>
                    <input v-model="NewPasswordConf" id="password" placeholder=" تاكيد كلمة المرور" type="password"
                        class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none" />
                </div>
                <div class="m-5 flex items-center justify-end">
                    <button class="w-60">تغيير كلمة المرور</button>
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
            imageURL: null,
            profileArray: [],
            name: "",
            email: "",
            phone: "",
            address: "",
            file: null,
            saved: false,
            success: false,
            failed: false,
            OldPassword: "",
            NewPassword: "",
            NewPasswordConf: "",
        };
    },
    computed: {
        ...mapGetters(["GetUser"]),
    },
    mounted() {
        this.FetchData();
    },
    methods: {
        ...mapActions(["FetchUser"]),
        handleFile(event) {
            this.file = event.target.files[0];
            this.imageURL = URL.createObjectURL(this.file);
        },
        initData() {
            this.name = this.GetUser.name;
            this.email = this.GetUser.email;
            this.phone = this.GetUser.phone;
            this.imageURL = this.GetUser.image;
            this.address = this.GetUser.address;
        },
        async FetchData() {
            try {
                await this.FetchUser();
                this.initData();
            } catch (error) {
                console.error("Error fetching profile info:", error);
            }
        },
        async update() {
            try {
                const token = localStorage.getItem("token");
                const formData = new FormData();
                formData.append("name", this.name);
                formData.append("email", this.email);
                formData.append("phone", this.phone);
                formData.append("image", this.file);
                formData.append("address", this.address);
                await axios.post(
                    "http://192.168.1.18:8000/api/updateProfile",
                    formData,
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
                console.log("added succc");
            } catch (error) {
                console.error("Error fetching profile info:", error);
                this.failed = true;
                setTimeout(() => {
                    this.failed = false;
                }, 1000);
            }
        },
        clear() {
            this.OldPassword = "";
            this.NewPassword = "";
            this.NewPasswordConf = "";
        },
        async updatePassword() {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("current_password", this.OldPassword);
            formData.append("password", this.NewPassword);
            formData.append("password_confirmation", this.NewPasswordConf);
            try {
                await axios.post(
                    "http://192.168.1.18:8000/api/updatePassword",
                    formData,
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

                console.log("updatedSuccess");
            } catch (err) {
                console.log("error");
                this.failed = true;
                setTimeout(() => {
                    this.failed = false;
                }, 1000);
            }
            this.clear();

        },
    },
};
</script>
<style scoped>
@import url("./profile.css");
@import url("../../../UI/CustomsCss/Custombutton.css");
</style>
