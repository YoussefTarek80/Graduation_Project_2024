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

    <section data-v-5f1c1d65="" class="m-16 md:mx-16 aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex flex-row justify-between">
            <div class="self-center flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة الطلاب</span>
                <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
            </div>
        </div>
        <FilterComponent :filteredArray="filtered_Array" @filter="handleFilter" :MainArray="this.scores.data"
            :Subject="true" :Search="true">
        </FilterComponent>
        <ScoreTable :items="this.scores.data">
        </ScoreTable>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ScoreTable from '../../../../../UI/Tables/GradesTable/ScoreTable.vue';
import FilterComponent from '../../../../../components/School/Filtration/Filter-school.vue';
import { reactive, toRefs } from 'vue';
export default {
    components: { ScoreTable, FilterComponent },
    data() {
        return {
            id: this.$route.params.id,
            student: {},
            scores: reactive({
                data: [
                    {
                        subjname: "عربي",
                        level: "الصف الأول الإبتدائي",
                        class: "الفصل الدراسي الأول",
                        worksheet: 40,
                        examscore: 50,
                        total: 90,
                        isEdit: false
                    },
                    {
                        subjname: "الرياضيات",
                        level: "الصف الثاني الإبتدائي",
                        class: "الفصل الدراسي الأول",
                        worksheet: 40,
                        examscore: 55,
                        total: 95,
                        isEdit: false
                    },
                ],
            }),
            filtered_Array: [],
            success: false,
            failed: false,
        };
    },
    computed: {
        ...mapGetters(["GetStudents"]),
    },
    created() {
        this.FetchData();
    },
    methods: {
        ...mapActions(["FetchStudents"]),
        initData() {
            this.student = this.GetStudents[this.id];
            this.filtered_Array = this.scores.data;
        },
        async FetchData() {
            try {
                await this.FetchStudents();
                this.initData();
            } catch (error) {
                console.error("Error fetching student info:", error);
            }
        },
        handleFilter(filteredArray) {
            this.filtered_Array = filteredArray;
        },

    },
};
</script>
<style scoped>
@import url("../../../Profile/profile.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
</style>