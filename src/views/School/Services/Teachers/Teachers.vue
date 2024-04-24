<template>
    <div>
        <sc-navbar-comp></sc-navbar-Comp>
        <section class="m-10">
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
            <FilterComponent :filteredArray="GetTeachers" @filter="handleFilter" :MainArray="GetTeachers"
                :nationalIDS="false" :Search="false" :status="true"></FilterComponent>
            <table_Component :items="GetTeachers" :infoRoute="'/School/Teachers/TeacherInfo'"
                :editRoute="'/School/Teachers/EditTeacherInfo'" @delete-teacher="deleteTeacher">
            </table_Component>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import table_Component from "../../../../UI/Tables/TeacherTable/Table.vue";
import FilterComponent from "../../../../components/Admin/Filtration/Filter.vue";

export default {
    components: {
        table_Component,
        FilterComponent
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(["GetTeachers"]),
    },
    created() {
        // console.log(this.GetTeachers);
        this.fetchData();
    },
    methods: {
        ...mapActions(["FetchTeachers", "RemoveTeacher"]),
        async fetchData() {
            try {
                await this.FetchTeachers();
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
                console.log(id);
                // console.log(this.GetTeachers);
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