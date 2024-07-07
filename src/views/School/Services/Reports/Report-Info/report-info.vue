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
        <div class="my-5 flex flex-col mb-10">
            <span class="text-3xl font-bold">بيانات التقرير</span>
            <i data-v-5f1c1d65="" class=" fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
        </div>
        <div class="bg-customBGCards rounded-xl shadow-xl p-6 sm:w-full">
            <form action="" @submit.prevent="update">
                <div class="grid grid-cols-1 gap-6">
                    <div class="flex flex-col w-4/12">
                        <span
                            class="text-xl md:text-2xl text-customDarkPurple px-0 md:px-5 py-3 rounded-2xl flex items-center">
                            <i class="fa-duotone fa-sparkles"></i>موضوع التقرير (الموضوع):</span>
                        <input disabled v-model="report.subject" type="text" class="item-data " />
                    </div>
                    <div class="flex flex-col">
                        <label class="text-xl md:text-2xl text-customDarkPurple px-0 md:px-5 py-3 rounded-2xl flex
                            items-center">
                            <i class="fa-duotone fa-sparkles"></i>الوصف</label>
                        <textarea disabled v-model="report.description" rows="5" cols="10"
                            class="item-data resize-none p-5 outline-none rounded-2xl"></textarea>
                    </div>
                </div>
                <div class="m-5 flex items-center justify-end">
                    <button class="w-96" @click="this.$router.push('/school/reports')">الرجوع الي قائمة
                        التقارير</button>
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
            report: {},
            success: false,
            failed: false,
        };
    },
    computed: {
        ...mapGetters(["GetSCReports"]),
    },
    created() {
        this.FetchData();
    },
    methods: {
        ...mapActions(["FetchSCReports"]),
        initData() {
            this.report = this.GetSCReports.find(
                (item) => item.id == parseInt(this.id));
        },
        async FetchData() {
            try {
                await this.FetchSCReports();
                this.initData();
            } catch (error) {
                console.error("Error fetching report:", error);
            }
        },
    },
};
</script>
<style scoped>
@import url("../../../Profile/profile.css");
@import url("../../Events/Info_Event/infoEvent.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../UI/CustomsCss/CustomInput.css");
</style>