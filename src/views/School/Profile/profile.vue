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
            @click="this.$router.push('/School/Home')">
            <span class="sm:text-2xl text-sm">رجوع للصفحة الرئيسية</span>
            <i class="fa-regular fa-arrow-turn-left sm:text-3xl text-sm"></i>
        </button>
        <div class="profileImage">
            <label for="fileInput" data-aos="fade-up" data-aos-duration="1000">
                <!-- <img v-if="imageURL" src="" alt="My Image" /> -->
            </label>
            <input id="fileInput" type="file" style="display: none" @change="handleFile" />
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
        // ...mapGetters(["GetUser"]),
    },
    mounted() {
        // this.FetchData();
    },
    methods: {
        // ...mapActions(["FetchUser"]),
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
        // async FetchData() {
        //     try {
        //         await this.FetchUser();
        //         this.initData();
        //     } catch (error) {
        //         console.error("Error fetching profile info:", error);
        //     }
        // },
        // async update() {
        //     try {
        //         const token = localStorage.getItem("token");
        //         const formData = new FormData();
        //         formData.append("name", this.name);
        //         formData.append("email", this.email);
        //         formData.append("phone", this.phone);
        //         formData.append("image", this.file);
        //         formData.append("address", this.address);
        //         await axios.post(
        //             "http://127.0.0.1:8000/api/updateProfile",
        //             formData,
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`,
        //                     "Content-Type": "multipart/form-data",
        //                 },
        //             }
        //         );

        //         this.success = true;
        //         setTimeout(() => {
        //             this.success = false;
        //         }, 1000);
        //         console.log("added succc");
        //     } catch (error) {
        //         console.error("Error fetching profile info:", error);
        //         this.failed = true;
        //         setTimeout(() => {
        //             this.failed = false;
        //         }, 1000);
        //     }
        // },
        clear() {
            this.OldPassword = "";
            this.NewPassword = "";
            this.NewPasswordConf = "";
        },
        // async updatePassword() {
        //     const token = localStorage.getItem("token");
        //     const formData = new FormData();
        //     formData.append("current_password", this.OldPassword);
        //     formData.append("password", this.NewPassword);
        //     formData.append("password_confirmation", this.NewPasswordConf);
        //     try {
        //         await axios.post(
        //             "http://127.0.0.1:8000/api/updatePassword",
        //             formData,
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`,
        //                     "Content-Type": "multipart/form-data",
        //                 },
        //             }
        //         );
        //         this.success = true;
        //         setTimeout(() => {
        //             this.success = false;
        //         }, 1000);

        //         console.log("updatedSuccess");
        //     } catch (err) {
        //         console.log("error");
        //         this.failed = true;
        //         setTimeout(() => {
        //             this.failed = false;
        //         }, 1000);
        //     }
        //     this.clear();

        // },
    },
};
</script>

<style scoped>
@import url("./profile.css");
@import url("../../../UI/CustomsCss/Custombutton.css");
</style>
