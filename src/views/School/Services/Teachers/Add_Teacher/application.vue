<template>
    <sc-navbar-comp></sc-navbar-Comp>
    <BaseTeleport :show="success">
        <div class="flex flex-col">
            <span class="text-green-700 text-4xl">تم الإضافة بنجاح </span>
            <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
        </div>
    </BaseTeleport>
    <BaseTeleport :show="failed">
        <div class="flex flex-col">
            <span class="text-red-700 text-4xl"> فشل الإضافة</span>
            <i class="fa-sharp fa-solid fa-badge-check text-red-700 text-7xl m-3"></i>
        </div>
    </BaseTeleport>

    <section class="m-6 sm:m-16 z-50 " data-aos="fade-up" data-aos-duration="1000">
        <div class="flex flex-col items-center">
            <span class="text-3xl sm:text-4xl">إضافة مُعلم جديدة</span>
            <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
        </div>
        <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto school">
            <span
                class="text-2xl md:text-3xl text-customDarkPurple px-0 md:px-5 py-3 rounded-2xl flex items-center m-5">
                <i class="fa-duotone fa-sparkles"></i>بيانات المُعلم</span>
            <form action="" class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6" @submit.prevent="">
                <div class="flex flex-col input-group">
                    <input type="text" required v-model="application.name" class="outline-customDarkPurple input" />
                    <label for="" class="user-label">اسم المُعلم <span class="text-red-600">*</span></label>
                    <span v-if="application.name == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
                </div>
                <div class="flex flex-col input-group">
                    <input required type="text" v-model="application.email" class="input" />
                    <label class="user-label">البريد الإلكتروني<span class="text-red-600">*</span></label>
                    <span v-if="application.email == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
                    <span v-else-if="isValidEmail(application.email) && application.email !== '' && empty"
                        class=" text-red-600">
                        هذا الحقل يجب أن يكون بريد إلكتروني صحيح
                    </span>
                </div>
                <div class="flex flex-col input-group">
                    <label for="" class="user-slabel">المادة <span class="text-red-600">*</span></label>
                    <select v-model="this.subject_id" class="input outline-customDarkPurple input" @change="cc">
                        <option value="" disabled>إختر المادة</option>
                        <option v-for="(item, index) in GetTeacherSubjects" :key="index" :value="item.id">
                            {{ item.subject_name }}
                        </option>
                    </select>
                    <span v-if="this.subject_id == '' && empty" class="text-red-600">إختيار المادة إلزامي</span>
                </div>
                <div class="flex flex-col input-group">
                    <input type="text" required v-model="application.address" class="outline-customDarkPurple input" />
                    <label for="" class="user-label">العنوان<span class="text-red-600">*</span></label>
                    <span v-if="application.address == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
                </div>
                <div class="flex flex-col input-group">
                    <input type="text" required v-model="application.phone" class="outline-customDarkPurple input" />
                    <label for="" class="user-label">الهاتف<span class="text-red-600">*</span></label>
                    <span v-if="application.phone == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
                </div>
            </form>
        </div>
        <div class=" m-5 mt-10 flex items-center justify-end sm:gap-5">
            <button class="w-60" @click="addTeacher">
                حفظ
            </button>
            <button class="w-48" @click="this.$router.replace('/school/teachers')">
                الغاء
            </button>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>

import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            id: this.$route.params.id,
            application: {},
            subject_id: '',
            success: false,
            failed: false,
            empty: false,
        };
    },
    computed: {
        ...mapGetters(["GetTeacherApps", "GetTeacherSubjects"]),
    },
    async created() {
        await this.fetchData();
        const subject_idd = this.GetTeacherSubjects.find((v) => v.subject_name === this.application.subject);
        console.log(subject_idd);
        this.subject_id = subject_idd.id;
    },
    methods: {
        ...mapActions(["FetchTeacherApps", "subjectList", "AcceptRejectTeachApp", "AddTeacher"]),
        initData() {
            this.application = this.GetTeacherApps.find((v) => v.id == parseInt(this.id));
        },
        cc() {
            console.log(this.subject_id);
        },
        async fetchData() {
            try {
                await this.subjectList();
                await this.FetchTeacherApps();
                this.initData();
            }
            catch (err) {
                console.log(err);
            }
        },
        async addTeacher() {
            try {
                if (this.application.name != '' && this.application.address != '' && this.application.email != ''
                    && this.application.phone != '') {
                    console.log(this.subject_id);
                    await this.AddTeacher({
                        name: this.application.name,
                        email: this.application.email,
                        address: this.application.address,
                        subject_id: this.subject_id,
                        phone: this.application.phone
                    });
                    this.success = true;
                    setTimeout(() => {
                        this.success = false;
                    }, 1500);
                    setTimeout(() => {
                        this.toTeachers();
                    }, 1000);
                }
                else {
                    this.empty = true;
                    this.failed = true;
                    setTimeout(() => {
                        this.failed = false;
                    }, 1000);
                }
            } catch (err) {
                console.log(err);
            }
        }, isValidEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailPattern.test(email);
        },
        toTeachers() {
            this.$router.push(`/school/teachers`);
        }
    },
};
</script>
<style scoped>
@import url("../../../Profile/profile.css");
@import url("../../../../../UI/CustomsCss/CustomInput.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../Events/Add_Event/add_event.css");
@import url("../../Events/Update_Event/updateEvent.css");
</style>