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
                    <div class="flex flex-col input-group">
                        <input required v-model="student.name" type="text" class="input" />
                        <label for="" class="user-label">اسم الطالب<span class="text-red-600">*</span></label>
                        <span v-if="student.name == ''" class="text-red-600">هذا الحقل مطلوب</span>
                    </div>
                    <div class="flex flex-col input-group">
                        <input v-model="student.address" type="text" class="input" />
                        <label for="" class="user-label">العنوان<span class="text-red-600">*</span></label>
                        <span v-if="student.address == ''" class="text-red-600">هذا الحقل مطلوب</span>
                    </div>
                    <div class="flex flex-col input-group">
                        <label for="" class="user-slabel">الصف الدراسي</label>
                        <select required class="input" v-model="student.grade_name">
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
                        <!-- <label for="in1" class="user-label">المستوي الدراسي<span class="text-red-600">*</span></label> -->
                        <span v-if="student.level == ''" class="text-red-600">هذا الحقل مطلوب</span>
                    </div>
                    <div class="flex flex-col input-group">
                        <label for="" class="p-2">الرقم القومي</label>
                        <input disabled required v-model="student.national_id" type="text" class="input" />
                    </div>
                    <div class="flex flex-col input-group">
                        <label for="" class="p-2"> الجنس</label>
                        <input disabled required v-model="student.gender" type="text" class="input" />
                    </div>
                    <div class="flex flex-col input-group">
                        <label for="" class="p-2">مكان المنشأ/الاقامة</label>
                        <input disabled required v-model="student.state" type="text" class="input" />
                    </div>
                </div>
                <div class="m-5 flex items-center justify-end">
                    <button class="w-80 m-1">
                        <router-link :to="this.infoRoute(this.id)">
                            كشف درجات الطالب
                        </router-link>
                    </button>
                    <button @click="submit" class="w-60 m-1">حفظ</button>
                </div>
            </form>
        </div>

        <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full">
            <div v-if="this.isAppriate" class="my-5">
                <span class="text-2xl"> بيانات الأب ({{ this.appriateNational }})</span>
            </div>
            <div v-else-if="!this.isAppriate" class="my-5">
                <span class="text-2xl">بيانات الأب/الأم</span>
            </div>
            <form action="" @submit.prevent>
                <div class="input_Div grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col input-group">
                        <label for="" class="p-2">الإسم </label>
                        <input disabled v-model="student.parent_name" id="parentName" type="text" class="input" />
                    </div>
                    <div class="flex flex-col input-group">
                        <label for="" class="p-2">الدولة</label>
                        <input disabled v-model="student.country" id="country" type="text" class="input" />
                    </div>
                    <div class="flex flex-col input-group">
                        <label for="" class="p-2">الجنسية</label>
                        <input disabled v-model="student.nationality" id="email" type="text" for="" class="input" />
                    </div>
                    <div class="flex flex-col input-group" v-if="!this.isAppriate">
                        <label for="" class="p-2">المحافظة</label>
                        <input disabled v-model="student.state" id="state" type="text" class="input" />
                    </div>
                    <div class="flex flex-col input-group">
                        <label for="" class="p-2">المهنة</label>
                        <input disabled v-model="student.parent_job" id="parentJop" type="text" class="input" />
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
        ...mapGetters(["GetScStudents"]),
        national() {
            return this.isAppriate;
        },
    },
    created() {
        this.FetchData();
    },
    methods: {
        ...mapActions(["FetchScStudents", "UpdateScStudent"]),
        initData() {
            this.student = this.GetScStudents[this.id];
            console.log(this.student.id);
            if (this.student.nationality != "مصري") {
                this.isAppriate = true;
            }
            else { this.isAppriate = false; }
        },
        infoRoute(index) {
            return `/school/services/students/student-grades/${index}`;
        },
        async FetchData() {
            try {
                await this.FetchScStudents();
                this.initData();
            } catch (error) {
                console.error("Error fetching student info:", error);
            }
        },
        async update() {
            try {
                if (this.student.name != '' && this.student.level != '' && this.student.address != '') {
                    await this.UpdateScStudent({
                        id: this.student.id,
                        name: this.student.name,
                        level: this.student.grade_name,
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
@import url("../../../../../UI/CustomsCss/CustomInput.css");
</style>