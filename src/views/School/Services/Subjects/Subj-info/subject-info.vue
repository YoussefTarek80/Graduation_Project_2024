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

        <section class="flex flex-col items-center w-full mt-6" data-aos="fade-up" data-aos-duration="1000">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl font-bold">بيانات المادة </span>
                <span class="w-11/12 h-1 bg-black m-1 rounded-2xl"></span>
            </div>
            <div class="p-2 sm:p-5">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 sm:p-10 rounded-xl bg-[#f2f2f2]">
                    {{ subject.id }}
                    {{ subject.subject }}
                </div>
                <div class="flex flex-row flex-wrap justify-center">
                    <div class="m-5">
                        <button class="w-25 sm:w-40 md:w-96">
                            <router-link :to="infoRoute(subject.id)"> عرض الطلاب المُسجلين بالدورة</router-link>
                        </button>
                    </div>
                    <div class="m-5">
                        <button class="flex items-center justify-around w-25 sm:w-40 md:w-80">
                            <router-link to="/school/services/subjects">الرجوع إلي قائمة المواد</router-link>
                            <i class="fa-duotone fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </section>

    <Footer_Component></Footer_Component>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            id: this.$route.params.id,
            subject: {},
            success: false,
            failed: false,
        };
    },
    computed: {
        ...mapGetters(["GetScSubjects"]),
    },
    async created() {
        console.log(this.GetScSubjects)
        await this.fetchData();
    },
    methods: {
        ...mapActions(["fetchScSubjects"]),
        initData() {
            this.subject = this.GetScSubjects.find((v) => v.id === parseInt(this.id));
        },
        async fetchData() {
            try {
                this.initData();
            } catch (error) {
                console.error("Error fetching subject info:", error);
            }
        },
        infoRoute(index) {
            return `/school/services/subjects/subject-info/subject-studs/${index}`;
        },
    },
}
</script>
<style scoped>
@import url('../../../../../UI/CustomsCss/Custombutton.css');
</style>