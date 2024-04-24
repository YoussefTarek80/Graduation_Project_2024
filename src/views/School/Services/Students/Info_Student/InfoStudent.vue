<template>
    <sc-navbar-comp></sc-navbar-comp>

    <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
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
    </section>

    <section class="mt-20 sm:mx-36" data-aos="fade-up" data-aos-duration="1000">
        <div class="bg-customBGCards rounded-xl shadow-xl p-6 sm:w-full">
            <div class="my-5">
                <span class="text-2xl">بيانات الطالب</span>
            </div>
            <form action="" @submit.prevent="update">
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    <div class="flex flex-col">
                        <label for="in1">اسم الطالب</label>
                        <input v-model="this.name" id="email" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in1">المستوي الدراسي</label>
                        <input v-model="this.level" id="level" value="" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in2">مكان المنشأ/الاقامة</label>
                        <input v-model=this.address id="country" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in3">الرقم القومي</label>
                        <input v-model="this.nationalId" id="nId" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in4">العنوان</label>
                        <input v-model="this.detailedAddress" id="address" type="text" class="item-data" />
                    </div>
                </div>
                <div class="m-5 flex items-center justify-end">
                    <button @click="submit" class="w-60">حفظ</button>
                </div>
            </form>
        </div>

        <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full">
            <div class="my-5">
                <span class="text-2xl">بيانات الأب </span>
            </div>
            <form action="" @submit.prevent>
                <div class="input_Div grid grid-cols-1 sm:grid-cols-4 gap-6">
                    <div class="flex flex-col">
                        <label for="in1">اسم الأب</label>
                        <input disabled v-model="this.parentName" id="parentName" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in2">الدولة</label>
                        <input disabled v-model="this.country" id="country" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in3">الجنسية</label>
                        <input disabled v-model="this.nationality" id="email" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col" v-if="!this.isAppriate">
                        <label for="in4">المحافظة</label>
                        <input disabled v-model="this.state" id="state" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in5">المهنة</label>
                        <input disabled v-model="this.parentPassion" id="parentJop" type="text" class="item-data" />
                    </div>
                </div>
            </form>
        </div>
    </section>

    <Footer_Component></Footer_Component>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import axios from "axios";
export default {
    inject: ['students'],
    data() {
        return {
            id: this.$route.params.id,
            isAppriate: false,
            name: "",
            parentName: "",
            parentPassion: "",
            schoolname: "",
            schoolAdminstration: "",
            level: "",
            address: "",
            detailedAddress: "",
            nationality: "",
            nationalId: "",
            country: "",
            state: "",
            success: false,
            failed: false,
        };
    },
    computed: {
        ...mapGetters(["GetStudents"]),
    },
    created() {
        this.isEgyptien();
    },
    mounted() {
        this.initData;
        this.FetchData();
    },
    methods: {
        ...mapActions(["FetchStudents"]),
        isEgyptien() {
            if (this.nationality === "مصري") {
                this.isAppriate = false;
            }
            else {
                this.isAppriate = true;
                this.nationality = this.nationality + '- مغترب';
            }
        },
        initData() {
            this.name = this.GetStudents[this.id].name;
            this.parentName = this.GetStudents[this.id].parent;
            this.parentPassion = this.GetStudents[this.id].parentPassion;
            this.schoolname = this.GetStudents[this.id].schoolname;
            this.schoolAdminstration = this.GetStudents[this.id].schoolAdminstration;
            this.level = this.GetStudents[this.id].level;
            this.address = this.GetStudents[this.id].address;
            this.detailedAddress = this.GetStudents[this.id].detailedAddress;
            this.nationalId = this.GetStudents[this.id].nationalId;
            this.nationality = this.GetStudents[this.id].nationality;
            this.country = this.GetStudents[this.id].country;
            this.state = this.GetStudents[this.id].state;
        },
        async FetchData() {
            try {
                await this.FetchStudents();
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
                formData.append("address", this.address);
                // await axios.post(
                //     "http://192.168.1.18:8000/api/updateProfile",
                //     formData,
                //     {
                //         headers: {
                //             Authorization: `Bearer ${token}`,
                //             "Content-Type": "multipart/form-data",
                //         },
                //     }
                // );
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
    },
};
</script>
<style scoped>
@import url("../../../Profile/profile.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
</style>