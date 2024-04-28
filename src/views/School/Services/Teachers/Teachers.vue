<template>
    <div>
        <sc-navbar-comp></sc-navbar-Comp>
        <section class="m-16 md:mx-16" data-aos="fade-up" data-aos-duration="1000">
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="sm:text-3xl text-2xl">قائمة المدرسين</span>
                    <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
                </div>
                <button class="sm:w-80 flex justify-around items-center"
                    @click="this.$router.push('/School/Teachers/AddEvent')">
                    <span class="sm:text-xl text-sm">اضافة مُعلم جديد</span>
                    <i class="fa-solid fa-plus p-1"></i>
                </button>
            </div>
            <FilterComponent :filteredArray="filtered_Array" @filter="handleFilter" :MainArray="GetTeachers"
                :teacher="true" :Search="true" :request="false"></FilterComponent>
            <table_Component :items="filtered_Array" :infoRoute="'/School/Teachers/TeacherInfo'"
                :editRoute="'/School/Teachers/EditTeacherInfo'" @delete-teacher="deleteTeacher">
            </table_Component>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import table_Component from "../../../../UI/Tables/TeacherTable/Table.vue";
import FilterComponent from "../../../../components/School/Filtration/Filter-school.vue";

export default {
    components: {
        table_Component,
        FilterComponent
    },
    data() {
        return {
            filtered_Array: [],
        }
    },
    computed: {
        ...mapGetters(["GetTeachers"]),
    },
    created() {
        this.fetchData();
        this.filtered_Array = this.GetTeachers;
    },
    methods: {
        ...mapActions(["FetchTeachers", "RemoveTeacher"]),
        async fetchData() {
            try {
                await this.FetchTeachers();
                this.filtered_Array = this.GetTeachers;
                console.log(this.filtered_Array);
            }
            catch (error) {
                throw `Fetching Teachers Error ${error}`;
            }
        }, handleFilter(filteredArray) {
            this.filtered_Array = filteredArray;
        },
        async deleteTeacher(id) {
            try {
                await this.RemoveTeacher(id, this.GetTeachers);
                console.log("Deleted Done");
            } catch (error) {
                console.error(error);
            }
        },
    },
}
</script>
<style scoped>
@import url("../../../../UI/CustomsCss/Custombutton.css");
</style>