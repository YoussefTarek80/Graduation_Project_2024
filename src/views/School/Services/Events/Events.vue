<template>
    <sc-navbar-comp></sc-navbar-Comp>
    <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة المناسبات</span>
                <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
            </div>
            <button class="sm:w-80 flex justify-around items-center"
                @click="this.$router.push('/School/Services/Events/AddEvent')">
                <span class="sm:text-xl text-sm">اضافة مناسبة جديدة</span>
                <i class="fa-solid fa-plus p-1"></i>
            </button>
        </div>
        <FilterComponent :filteredArray="filtered_Array" @filter="handleFilter" :MainArray="GetSCEvents" :event="true"
            :Search="true"></FilterComponent>
        <table_Component :items="filtered_Array" :infoRoute="'/School/Services/Events/InfoEvent'"
            :editRoute="'/School/Services/Events/UpdateEvent'" @delete-event="deleteEvent"></table_Component>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from "../../../../UI/Tables/EventTable/Table.vue";
import FilterComponent from "../../../../components/School/Filtration/Filter-school.vue";
import { mapGetters, mapActions } from "vuex";

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
        ...mapGetters(["GetSCEvents"]),
    },
    created() {
        this.filtered_Array = this.GetSCEvents;
        this.fetchData();
    },
    methods: {
        ...mapActions(["FetchSCEvents", "RemoveSCEvent"]),
        async fetchData() {
            try {
                await this.FetchSCEvents();
            }
            catch (error) {
                throw `Fetching Events Error ${error}`;
            }
        }, handleFilter(filteredArray) {
            this.filtered_Array = filteredArray;
        },
        async deleteEvent(id) {
            try {
                await this.RemoveSCEvent(id);
                console.log("Event Deleted Successfully");
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