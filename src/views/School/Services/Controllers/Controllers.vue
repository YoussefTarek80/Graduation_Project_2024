<template>
    <div>
        <sc-navbar-comp></sc-navbar-Comp>
        <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="sm:text-3xl text-2xl">قائمة مُدِيرون الكنترول</span>
                    <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
                </div>
                <button class="sm:w-80 flex justify-around items-center"
                    @click="this.$router.push('/School/Services/Controllers/AddController')">
                    <span class="sm:text-xl text-sm">اضافة مدير كنترول</span>
                    <i class="fa-solid fa-plus p-1"></i>
                </button>
            </div>
            <FilterComponent :filteredArray="GetControllers" @filter="handleFilter" :MainArray="GetControllers"
                :nationalIDS="false" :Search="false" :status="true"></FilterComponent>
            <table_Component :items="GetControllers" :infoRoute="'/School/Services/Controllers/ControllerInfo'"
                :editRoute="'/School/Services/Controllers/UpdateController'" @delete-controller="deleteController">
            </table_Component>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>

import table_Component from "../../../../UI/Tables/ControllerTable/Table.vue";
import FilterComponent from "../../../../components/Admin/Filtration/Filter.vue";
import { mapGetters, mapActions } from "vuex";
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
        ...mapGetters(["GetControllers"]),
    },
    created() {
        console.log(this.GetControllers);
        this.fetchData();
    },
    methods: {
        ...mapActions(["FetchControllers", "RemoveController"]),
        async fetchData() {
            try {
                await this.FetchControllers();
            }
            catch (error) {
                throw `Fetching Controllers Error ${error}`;
            }
        }, handleFilter(filteredArray) {
            this.filtered_Array = filteredArray;
        },
        async deleteController(id) {
            try {
                await this.RemoveController(id);
                console.log("Controller Deleted Successfully");
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
<style scoped>
@import url("../../../../UI/CustomsCss/Custombutton.css");
</style>