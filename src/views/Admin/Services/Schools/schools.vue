<template>
    <Navbar_Component></Navbar_Component>
    <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة المدارس</span>
                <i
                    class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
                ></i>
            </div>
            <button
                class="sm:w-80 flex justify-around items-center "
                @click="this.$router.push('/Admin/Schools/addSchool')"
            >
                <span class="sm:text-xl text-sm ">اضافة مدرسة جديدة</span>
                <i class="fa-solid fa-plus p-1"></i>
            </button>
        </div>
        <FilterComponent
            :filteredArray="filtered_Array"
            @filter="handleFilter"
            :MainArray="schools"
            :nationalIDS="false"
            :Search="true"
        ></FilterComponent>
        <div class="relative">
            <table_Component
                :items="schools"
                :editRoute="'/Admin/Schools/updateSchool'"
                :infoRoute="'/Admin/Schools/InfoSchool'"
                :fetching="fetchSchoolsStatus"
                @delete-school="deleteSchool"
            ></table_Component>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from "../../../../UI/Tables/SchoolTable/Table.vue";
import FilterComponent from "../../../../components/Admin/Filtration/Filter.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
    components: { table_Component, FilterComponent },
    data() {
        return {
            showInfo: false,
            filtered_Array: [],
            search_words: "",
            search_status: false,
            selectedSortOption: "ترتيب",
            // filtered_Array : this.schools
        };
    },
    computed: {
        ...mapGetters(["schools", "fetchSchoolsStatus"]),
    },
    created() {
        this.fetchData();
        console.log(this.fetchSchoolsStatus);
    },
    methods: {
        ...mapActions(["fetchSchools", "RemoveSchool"]),
        async fetchData() {
            try {
                await this.fetchSchools();
                this.filtered_Array = this.schools;
                console.log(this.schools);
            } catch (err) {
                console.error(err);
            }
        },
        async deleteSchool(id) {
            try {
                this.RemoveSchool(id);
                this.fetchData();
                console.log(id)
                console.log("Delete Done");
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
@import url("./schools.css");
@import url("../../../../UI/CustomsCss/Custombutton.css");
</style>
../../../../UI/Tabels/SchoolTable/Table.vue
