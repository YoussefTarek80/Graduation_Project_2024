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

    <section class="mt-20 sm:mx-24 mx-6" data-aos="fade-up" data-aos-duration="1000">
        <div class="bg-customBGCards rounded-xl shadow-xl p-6 sm:w-full">
            <div class="my-5">
                <span class="text-2xl">بيانات الطالب</span>
            </div>
            <form action="" @submit.prevent="update">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col">
                        <label for="in1">اسم الطالب<span class="text-red-600">*</span></label>
                        <input v-model="student.name" type="text" class="item-data" />
                        <span v-if="student.name == ''" class="text-red-600">هذا الحقل مطلوب</span>
                    </div>
                    <div class="flex flex-col">
                        <label for="in1">المستوي الدراسي<span class="text-red-600">*</span></label>
                        <select class="item-data" v-model="student.level">
                            <option value=""></option>
                            <option value="الصف الأول الإبتدائي">الصف الأول الإبتدائي</option>
                            <option value="الصف الثاني الإبتدائي">الصف الثاني الإبتدائي</option>
                            <option value="الصف الثالث الإبتدائي">الصف الثالث الإبتدائي</option>
                            <option value="الصف الأول الإعدادي">الصف الأول الإعدادي</option>
                            <option value="الصف الثاني الإعدادي">الصف الثاني الإعدادي</option>
                            <option value="الصف الثالث الإعدادي">الصف الثالث الإعدادي</option>
                            <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                            <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
                            <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
                        </select>
                        <span v-if="student.level == ''" class="text-red-600">هذا الحقل مطلوب</span>
                    </div>
                    <div class="flex flex-col">
                        <label for="in3">الرقم القومي</label>
                        <input disabled v-model="student.national_id" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in3">الجنس</label>
                        <input disabled v-model="student.gender" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in2">مكان المنشأ/الاقامة</label>
                        <input disabled v-model="student.state" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in4">العنوان<span class="text-red-600">*</span></label>
                        <input v-model="student.address" type="text" class="item-data" />
                        <span v-if="student.address == ''" class="text-red-600">هذا الحقل مطلوب</span>
                    </div>
                </div>
                <div class="m-5 flex items-center justify-end">
                    <button @click="submit" class="w-60">حفظ</button>
                </div>
            </form>
        </div>

        <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full">
            <div v-if="this.isAppriate" class="my-5">
                <span class="text-2xl"> بيانات الأب ({{ this.appriateNational }})</span>
            </div>
            <div v-else-if="!this.isAppriate" class="my-5">
                <span class="text-2xl">بيانات الأب </span>
            </div>
            <form action="" @submit.prevent>
                <div class="input_Div grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col">
                        <label for="in1">اسم الأب</label>
                        <input disabled v-model="student.parent_id" id="parentName" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in2">الدولة</label>
                        <input disabled v-model="student.country" id="country" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in3">الجنسية</label>
                        <input disabled v-model="student.nationality" id="email" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col" v-if="!this.isAppriate">
                        <label for="in4">المحافظة</label>
                        <input disabled v-model="student.state" id="state" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in5">المهنة</label>
                        <input disabled v-model="student.parent_id" id="parentJop" type="text" class="item-data" />
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
            appriateNational: "مغترب",
            student: {},
            success: false,
            failed: false,
        };
    },
    computed: {
        ...mapGetters(["GetStudents"]),
        national() {
            return this.isAppriate;
        },
    },
    created() {
        this.level = this.student.level;
        this.FetchData();
    },
    methods: {
        ...mapActions(["FetchStudents", "UpdateStudent"]),
        initData() {
            this.student = this.GetStudents[this.id];
            if (this.student.nationality != "مصري") {
                this.isAppriate = true;
            }
            else { this.isAppriate = false; }
        },
        async FetchData() {
            try {
                await this.FetchStudents();
                this.initData();
            } catch (error) {
                console.error("Error fetching student info:", error);
            }
        },
        async update() {
            try {
                if (this.student.name != '' && this.student.level != '' && this.student.address != '') {
                    await this.UpdateStudent({
                        id: this.student.id,
                        name: this.student.name,
                        level: this.student.level,
                        address: this.student.address,
                    });
                    this.success = true;
                    setTimeout(() => {
                        this.success = false;
                    }, 1000);
                }
                else {
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
    },
};
</script>
<style scoped>
@import url("../../../Profile/profile.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
</style>