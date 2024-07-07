<template>
    <sc-navbar-comp></sc-navbar-comp>

    <section v-if="this.student" data-v-5f1c1d65="" class="m-16 md:mx-16 aos-init aos-animate" data-aos="fade-up"
        data-aos-duration="1000">
        <div class="flex flex-row justify-between">
            <div class="self-center flex flex-col">
                <span class="sm:text-3xl text-2xl">كشف درجات مواد الطالب </span>
                <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
            </div>
        </div>
        <FilterScores @term-selected="handleTermSelected" @level-selected="handlelevelSelected"
            @level-name-selected="handlelevelSelectedName" @Retrived-done="handleRetrived"
            @Retrived-false="handleResetRetrived" :studId="this.student.id">
        </FilterScores>
        <ScoreTable v-if="GetStdScSubjects.length != 0" :items="GetStdScSubjects" :studId="this.student.id">
        </ScoreTable>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ScoreTable from '../../../../../UI/Tables/GradesTable/ScoreTable.vue';
import FilterScores from "../../../../../components/School/Filtration/Filter-students.vue";
export default {
    components: { ScoreTable, FilterScores },
    data() {
        return {
            id: this.$route.params.id,
            student: null,
        };
    },
    computed: {
        ...mapGetters(["GetScStudents", "GetStdScSubjects"]),
    },
    async created() {
        await this.FetchData();

    },
    methods: {
        ...mapActions(["FetchScStudents", "fetchStdSubjects"]),
        initData() {
            this.student = this.GetScStudents[this.id];
        },
        async FetchData() {
            try {
                await this.FetchScStudents();
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