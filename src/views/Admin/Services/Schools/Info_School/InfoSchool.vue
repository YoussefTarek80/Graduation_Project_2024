<template>
    <Navbar_Component></Navbar_Component>
    <section class="m-10" data-aos="fade-up" data-aos-duration="2000">
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
                    <span class="item-data">{{ item.schoolName }}</span>
                </div>
                <div class="flex flex-col">
                    <label for="in2"
                        >الدولة <span class="text-red-600">*</span></label
                    >
                    <span class="item-data">{{ item.management }}</span>
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
                    <span class="item-data">{{ item.status }}</span>
                </div>
            </div>
            <div class="flex flex-col w-full sm:w-auto mb-4 sm:mb-0 mt-3">
                <label for="in8"
                    >شعار المدرسة <span class="text-red-600">*</span></label
                >
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
            <div class="m-5 flex items-center justify-end sm:gap-5 ">
                <button class="w-96">الرجوع الي قائمة المدارس</button>
                
            </div>
        </div>
    </section>
</template>
<script>
export default {
    inject: ["items"],
    data() {
        return {
            item: null,
        };
    },
    created() {
        this.fetchdata();
    },
    methods: {
        fetchdata() {
            const index = this.$route.params.index;
            this.item = this.items[index];
        },
    },
};
</script>
<style scoped>
@import url("./InfoSchool.css");
@import url("../../../../../UI//Custombutton.css");
</style>
