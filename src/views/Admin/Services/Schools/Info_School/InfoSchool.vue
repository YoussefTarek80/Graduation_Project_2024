<template>
    <Navbar_Component></Navbar_Component>

    <section
        v-if="item"
        class="m-10"
        data-aos="fade-up"
        data-aos-duration="1000"
    >
        <div class="flex flex-col items-center">
            <span class="text-3xl sm:text-4xl">
                تفاصيل عن مدرسة (اسم المدرسة)
            </span>
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
            <div class="input_Div grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div class="flex flex-col">
                    <label for="in1"
                        >اسم المدرسة <span class="text-red-600">*</span></label
                    >
                    <span class="item-data">{{ item.name }}</span>
                </div>
                <div class="flex flex-col">
                    <label for="in2"
                        >الدولة <span class="text-red-600">*</span></label
                    >
                    <span class="item-data">{{ item.phone }}</span>
                </div>
                <div class="flex flex-col">
                    <label for="in3"
                        >نوع شهادة المدرسة
                        <span class="text-red-600">*</span></label
                    >
                </div>
                <div class="flex flex-col">
                    <label for="in4"
                        >الفصول الدراسية
                        <span class="text-red-600">*</span></label
                    >
                </div>
                <div class="flex flex-col">
                    <label for="in5"
                        >رقم هاتف المدرسة
                        <span class="text-red-600">*</span></label
                    >
                </div>
                <div class="flex flex-col">
                    <label for="in6"
                        >عنوان المدرسة
                        <span class="text-red-600">*</span></label
                    >
                </div>
                <div class="flex flex-col">
                    <label for="in7"
                        >الحالة <span class="text-red-600">*</span></label
                    >
                    <span class="item-data">{{ HandleStatus(item.status) }}</span>
                </div>
            </div>
            <div class="flex flex-col w-full sm:w-auto mb-4 sm:mb-0 mt-3">
                <label for="in8"
                    >شعار المدرسة <span class="text-red-600">*</span></label
                >
                <img :src="item.image" alt="" class="w-40 m-3 rounded-full">
            </div>
        </div>
        <div
            class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto"
        >
            <div class="my-5">
                <span class="text-2xl">بيانات المدير</span>
            </div>
            <div class="input_Div grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div class="flex flex-col">
                    <label for="in1"
                        >اسم المدير <span class="text-red-600">*</span></label
                    >
                    <span class="item-data">{{ item.status }}</span>
                </div>
                <div class="flex flex-col">
                    <label for="in2"
                        >رقم هاتف المدير
                        <span class="text-red-600">*</span></label
                    >
                    <span class="item-data">{{ item.status }}</span>
                </div>
                <div class="flex flex-col">
                    <label for="in2"
                        >البريد الالكتروني للمدير
                        <span class="text-red-600">*</span></label
                    >
                    <span class="item-data">{{ item.status }}</span>
                </div>
            </div>
            <div class="m-5 flex items-center justify-end sm:gap-5">
                <button class="w-96" @click="this.$router.push('/Admin/Schools')">الرجوع الي قائمة المدارس</button>
            </div>
        </div>
    </section>
</template>
<script>
import axios from "axios";
import { mapActions,mapGetters } from "vuex";
export default {
    data() {
        return {
            item: null,
        };
    },
    computed:{
        ...mapGetters(['schools', 'fetchSchoolsStatus']),
    },
    created() {
        this.fetchData();
    },
    methods: {
        ...mapActions(["fetchSchools"]),
        async fetchData() {
            try {
                await this.fetchSchools();
                const index = this.$route.params.index;
                this.item = this.schools.find(
                    (school) => school.id === parseInt(index)
                );
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
    },
};
</script>
<style scoped>
@import url("./InfoSchool.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../UI/CustomsCss/CustomInput.css");
</style>
