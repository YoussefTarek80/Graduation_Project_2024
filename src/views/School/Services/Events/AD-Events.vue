<template>
    <sc-navbar-comp></sc-navbar-Comp>
    <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة المناسبات</span>
                <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
            </div>
        </div>
        <FilterComponent :disable="GetADEvents.length === 0" :filteredArray="filtered_Array" @filter="handleFilter"
            :MainArray="GetADEvents" :event="true" :Search="true"></FilterComponent>
        <table_Component :items="filtered_Array" :infoRoute="'/school/services/ad-events/event-info'">
        </table_Component>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from "../../../../UI//School_Tables/EventTable/AD_Table.vue";
import FilterComponent from "../../../../components/School/Filtration/Filter-school.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    components: { table_Component, FilterComponent },
    data() {
        return {
            filtered_Array: [],
        }
    },
    computed: {
        ...mapGetters(["GetADEvents"]),
    },
    created() {
        this.fetchData();
        console.log(this.GetADEvents);
    },
    methods: {
        ...mapActions(["FetchADEvents", "RemoveADEvent"]),
        initData() {
            this.filtered_Array = this.GetADEvents;
        },
        async fetchData() {
            try {
                await this.FetchADEvents();
                this.initData();
            }
            catch (error) {
                throw `Fetching Events Error ${error}`;
            }
        }, handleFilter(filteredArray) {
            this.filtered_Array = filteredArray;
        },
    },
};
</script>
<style scoped>
@import url("../../../../UI/CustomsCss/Custombutton.css");
</style>