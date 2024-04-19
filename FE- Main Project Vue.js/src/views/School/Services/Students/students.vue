<template>
    <sc-navbar-comp></sc-navbar-comp>
    <section class="m-6 sm:mx-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex flex-row justify-between">
            <div class="self-center flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة الطلاب</span>
                <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
            </div>
            <button class="float-left sm:m-10 m-2 absolute top-0 left-0 sm:w-96 w-32 flex items-center justify-around"
                @click="this.$router.push('/School/Services/Students/add-n-stud')">
                <span class="sm:text-2xl text-sm">اضافة طالب جديد</span>
                <i class="fa-regular fa-arrow-turn-left sm:text-3xl text-sm"></i>
            </button>
        </div>
        <FilterComponent :filteredArray="filtered_Array" @filter="handleFilter" :MainArray="Students"
            :nationalIDS="true"></FilterComponent>
        <div class="relative">
            <table_Component :items="filtered_Array" :infoRoute="'/School/Services/Students/InfoStudent'">
            </table_Component>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from "../../../../UI/Tables/StudentTable/Table.vue";
import FilterComponent from "../../../../components/Admin/Filtration/Filter.vue";

export default {
    components: { table_Component, FilterComponent },
    inject: ['students'],
    data() {
        return {
            selectedSortOption: "ترتيب",
            search_status: false,
            filtered_Array: [],
        };
    },
    watch: {
    },
    created() {
        this.filtered_Array = this.students;
    },
    methods: {
        handleFilter(filteredArray) {
            this.filtered_Array = filteredArray;
        },
    },
};
</script>

<style scoped>
@import url('../../../../UI/CustomsCss/Custombutton.css');
</style>