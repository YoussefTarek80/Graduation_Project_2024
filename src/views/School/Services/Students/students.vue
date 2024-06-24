<template>
    <sc-navbar-comp></sc-navbar-comp>
    <section class="m-16 md:mx-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex flex-row justify-between">
            <div class="self-center flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة الطلاب</span>
                <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
            </div>
        </div>
        <FilterComponent :filteredArray="filtered_Array" @filter="handleFilter" :MainArray="this.GetStudents"
            :nationalId="true" :Search="true"></FilterComponent>
        <div class="relative">
            <table_Component :items="filtered_Array" :infoRoute="'/School/Services/Students/InfoStudent'">
            </table_Component>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from "../../../../UI/Tables/StudentTable/Table.vue";
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
        ...mapGetters(["GetStudents"])
    },
    created() {
        this.fetchData();
        console.log(this.filtered_Array);
    },
    methods: {
        ...mapActions(["FetchStudents"]),
        async fetchData() {
            try {
                await this.FetchStudents();
                this.filtered_Array = this.GetStudents;
                console.log(this.filtered_Array);
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