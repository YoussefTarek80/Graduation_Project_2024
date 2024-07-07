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
                <span
                    class="text-2xl md:text-3xl text-customDarkPurple px-0 md:px-5 py-3 rounded-2xl flex items-center m-5 md:m-10">
                    <i class="fa-duotone fa-sparkles"></i>بيانات الطالب</span>
            </div>
            <form action="" @submit.prevent="update">
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    <div class="flex flex-col input-group">
                        <input required v-model="student.name" type="text" class="input" />
                        <label class="user-label">اسم الطالب<span class="text-red-600">*</span></label>
                        <span v-if="student.name == ''" class="text-red-600">هذا الحقل مطلوب</span>
                    </div>
                    <div class="flex flex-col input-group">
                        <input required v-model="student.address" type="text" class="input" />
                        <label class="user-label">العنوان<span class="text-red-600">*</span></label>
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
                        <span v-if="student.grade_name == ''" class="text-red-600">هذا الحقل مطلوب</span>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-5">
                    <div class="flex flex-col">
                        <label>الرقم القومي</label>
                        <input disabled type="text" class="item-data" v-model="student.national_id" />
                    </div>
                    <div class="flex flex-col">
                        <label> الجنس</label>
                        <input disabled type="text" class="item-data" v-model="student.gender" />
                    </div>
                    <div class="flex flex-col">
                        <label>مكان المنشأ/الاقامة</label>
                        <input disabled type="text" class="item-data" v-model="student.address" />
                    </div>
                </div>
                <div class="mt-5 flex items-center justify-end">
                    <button class="w-80 m-1">
                        <router-link :to="this.infoRoute(this.id)">
                            كشف درجات الطالب
                        </router-link>
                    </button>
                    <button @click="submit" class="w-60">حفظ</button>
                </div>
            </form>
        </div>

        <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full">
            <div v-if="this.isAppriate" class="my-5">
                <span
                    class="text-2xl md:text-3xl text-customDarkPurple px-0 md:px-5 py-3 rounded-2xl flex items-center m-5 md:m-10">
                    <i class="fa-duotone fa-sparkles"></i> بيانات ولي الأمر ({{ this.appriateNational }})</span>
            </div>
            <div v-else-if="!this.isAppriate" class="my-5">
                <span
                    class="text-2xl md:text-3xl text-customDarkPurple px-0 md:px-5 py-3 rounded-2xl flex items-center m-5 md:m-10">
                    <i class="fa-duotone fa-sparkles"></i>بيانات ولي الأمر</span>
            </div>
            <form action="" @submit.prevent>
                <div class="input_Div grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="flex flex-col">
                        <label>الإسم </label>
                        <input disabled type="text" class="item-data" v-model="student.parent_name" />
                    </div>
                    <div class="flex flex-col">
                        <label>الدولة</label>
                        <input disabled type="text" class="item-data" v-model="student.country">
                    </div>
                    <div class="flex flex-col">
                        <label>الجنسية</label>
                        <input disabled type="text" class="item-data" v-model="student.nationality" />
                    </div>
                    <div class=" flex flex-col" v-if="!this.isAppriate">
                        <label>المحافظة</label>
                        <input disabled type="text" class="item-data" v-model="student.state">
                    </div>
                    <div class="flex flex-col">
                        <label>المهنة</label>
                        <input disabled type="text" class="item-data" v-model="student.parent_job">
                    </div>
                </div>
            </form>
        </div>
    </section>

    <Footer_Component></Footer_Component>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
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
    async created() {
        await this.FetchData();
        console.log(this.student);
    },
    methods: {
        ...mapActions(["FetchScStudents", "UpdateScStudent"]),
        initData() {
            this.student = this.GetScStudents.find(
                (item) => item.id == parseInt(this.id));
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