<template>
    <div>
        <Navbar_Component></Navbar_Component>
        <section
            class="m-6 sm:m-16"
            data-aos="fade-up"
            data-aos-duration="2000"
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
                <div class="input_Div grid grid-cols-1 sm:grid-cols-4 gap-6">
                    <div class="flex flex-col">
                        <label for="in1"
                            >اسم المدرسة
                            <span class="text-red-600">*</span></label
                        >
                        <input
                            type="text"
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
                        <input type="text" id="in3" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in4"
                            >الفصول الدراسية
                            <span class="text-red-600">*</span></label
                        >
                        <input type="text" id="in4" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in5"
                            >رقم هاتف المدرسة
                            <span class="text-red-600">*</span></label
                        >
                        <input type="text" id="in5" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in6"
                            >عنوان المدرسة
                            <span class="text-red-600">*</span></label
                        >
                        <input type="text" id="in6" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in7"
                            >الحالة <span class="text-red-600">*</span></label
                        >
                        <input type="text" id="in7" />
                    </div>
                </div>
                <div class="flex flex-col w-full sm:w-auto mb-4 sm:mb-0 mt-3">
                    <label for="in8"
                        >شعار المدرسة <span class="text-red-600">*</span></label
                    >
                    <div class="relative">
                        <input type="file" id="in8" class="hidden" />
                        <label
                            for="in8"
                            class="w-96 py-2 px-4 text-center cursor-pointer Filelabel"
                        >
                            <span>اختر ملف</span>
                            او
                            <span class="text-customDarkPurple font-bold"
                                >قم بسحب الملف هنا</span
                            >
                        </label>
                        <input type="text" class="file" readonly />
                    </div>
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
                            >اسم المدير
                            <span class="text-red-600">*</span></label
                        >
                        <input
                            type="text"
                            id="in1"
                            class="outline-customDarkPurple"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label for="in2"
                            >رقم هاتف المدير
                            <span class="text-red-600">*</span></label
                        >
                        <input type="text" id="in2" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in2"
                            >البريد الالكتروني للمدير
                            <span class="text-red-600">*</span></label
                        >
                        <input type="text" id="in2" />
                    </div>
                </div>
                <div class="m-5 flex items-center justify-end sm:gap-5">
                    <button class="w-60">حفظ</button>
                    <button class="w-48">الغاء</button>
                </div>
            </div>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
import Navbar_Component from "../../../../../components/Admin/Navbar/Navbar.vue";
import Footer_Component from "../../../../../components/Admin/Footer/footer.vue";
export default {
    components: { Navbar_Component, Footer_Component },
};
</script>
<style scoped>
@import url("./addSchool.css");
@import url("../../../../../UI/Custombutton.css");
</style>
