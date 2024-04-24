<template>
    <div>
        <sc-navbar-comp></sc-navbar-Comp>
        <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
            <div class="flex flex-col items-center">
                <span class="text-3xl sm:text-4xl">
                    تفاصيل عن المُعلم
                </span>
                <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
            </div>
            <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">
                <div class="my-5">
                    <span class="text-2xl block">بيانات المُعلم</span>
                    <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
                </div>
                <div class="input_Div grid grid-cols-1 sm:grid-cols-4 gap-6">
                    <div class="flex flex-col">
                        <label for="in1">اسم المُعلم </label>
                        <input disabled v-model="this.teacher.name"
                            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
                    </div>
                    <div class="flex flex-col">
                        <label for="in4">المادة </label>
                        <input disabled v-model="this.teacher.subject"
                            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
                    </div>
                    <div class="flex flex-col">
                        <label for="in5">العمر </label>
                        <input disabled v-model="this.teacher.age"
                            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
                    </div>
                    <div class="flex flex-col">
                        <label for="in6">العنوان </label>
                        <input disabled v-model="this.teacher.address"
                            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
                    </div>
                </div>
                <div class="m-5 flex items-center justify-end sm:gap-5">
                    <button class="w-96" @click="this.$router.push('/School/Teachers')">الرجوع الي قائمة
                        المُعلمين</button>
                </div>
            </div>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Footer_Component from "../../../../../components/Admin/Footer/footer.vue";
export default {
    components: { Footer_Component },
    data() {
        return {
            teacher: {}
        }
    },
    computed: {
        ...mapGetters(["GetTeachers"]),
    },
    created() {
        this.FetchTeacher();
    },
    mounted() {
    },
    methods: {
        ...mapActions(["FetchTeachers"]),
        async FetchTeacher() {
            try {
                await this.FetchTeachers();
                const index = this.$route.params.id;
                this.teacher = this.GetTeachers.find(
                    (teacher) => teacher.id === parseInt(index)
                );
                console.log(this.teacher);
            } catch (err) {
                console.error(err);
            }
        },
    },
}
</script>
<style scoped>
@import url("./TeacherInfo.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../UI/CustomsCss/CustomInput.css");
</style>