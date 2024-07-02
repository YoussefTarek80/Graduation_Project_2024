<template>
    <sc-navbar-comp></sc-navbar-comp>
    <section class="m-16 md:mx-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex flex-row justify-between">
            <div class="self-center flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة التقارير</span>
                <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
            </div>
        </div>
        <FilterComponent :disable="GetSCReports.length === 0" :filteredArray="filtered_Array" @filter="handleFilter"
            :MainArray="GetSCReports" :Search="true"></FilterComponent>
        <div class="relative">
            <table_Component :items="filtered_Array" :infoRoute="'/school/services/reports/report-info'">
            </table_Component>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from "../../../../UI/Tables/ReportTable/Table.vue";
import FilterComponent from "../../../../components/School/Filtration/Filter-school.vue";
import { mapGetters, mapActions } from 'vuex';
export default {
    components: { table_Component, FilterComponent },
    data() {
        return {
            filtered_Array: [],
        };
    },
    computed: {
        ...mapGetters(["GetSCReports"])
    },
    created() {
        this.fetchData();
        console.log(this.GetSCReports);
    },
    methods: {
        ...mapActions(["FetchSCReports"]),
        initData() {
            this.filtered_Array = this.GetSCReports;
        },
        async fetchData() {
            try {
                await this.FetchSCReports();
                this.initData();
            } catch (err) {
                console.error(err);
            }
        },
        handleFilter(filteredArray) {
            this.filtered_Array = filteredArray;
        },
    },
};
</script>

<style scoped>
@import url('../../../../UI/CustomsCss/Custombutton.css');
</style>