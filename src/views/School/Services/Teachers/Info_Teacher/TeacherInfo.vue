<template>
    <div>
        <sc-navbar-comp></sc-navbar-Comp>
        <section class="mt-20 mx-6 sm:mx-24" data-aos="fade-up" data-aos-duration="1000">
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
                <div class="input_Div grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col">
                        <label for="in1">اسم المُعلم </label>
                        <input disabled v-model="teacher.name"
                            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
                    </div>
                    <div class="flex flex-col">
                        <label for="in4">المادة </label>
                        <input disabled v-model="teacher.subject"
                            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
                    </div>
                    <div class="flex flex-col">
                        <label for="in5">العمر </label>
                        <input disabled v-model="teacher.age"
                            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
                    </div>
                    <div class="flex flex-col">
                        <label for="in6">العنوان </label>
                        <input disabled v-model="teacher.address"
                            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
                    </div>
                    <div class="flex flex-col">
                        <label for="in6">الهاتف </label>
                        <input disabled v-model="teacher.phone"
                            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
                    </div>
                </div>
                <div class="m-5 flex items-center justify-end sm:gap-5">
                    <button class="w-96" @click="this.$router.push('/school/teachers')">الرجوع الي قائمة
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
            id: this.$route.params.id,
            teacher: {}
        }
    },
    computed: {
        ...mapGetters(["GetTeachers"]),
    },
    async created() {
        await this.FetchTeacher();
    },
    methods: {
        ...mapActions(["FetchTeachers"]),
        async FetchTeacher() {
            try {
                await this.FetchTeachers();
                this.teacher = this.GetTeachers.find(
                    (teacher) => teacher.id === parseInt(this.id)
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
input[disabled] {
    background: linear-gradient(to left, #d9d9d9, #f3f3f3);
}

@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../UI/CustomsCss/CustomInput.css");
</style>