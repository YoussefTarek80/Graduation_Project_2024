<template>
    <div class="reqs">
        <sc-navbar-comp></sc-navbar-Comp>
        <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة التحويلات </span>
                <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
            </div>
            <FilterComponent :disable="Get_SCTRequests.length == 0" :filteredArray="filtered_Array"
                @filter="handleFilter" :MainArray="Get_SCTRequests" :request="true" :Search="true">
            </FilterComponent>
            <div class="relative">
                <table_Component :reqtype="req" :items="filtered_Array"
                    :infoRoute="'/school/services/transfer-requests/request-info'">
                </table_Component>
            </div>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import table_Component from "../../../../UI/School_Tables/RequestTable/Table.vue";
import FilterComponent from "../../../../components/School/Filtration/Filter-school.vue";

export default {
    components: { table_Component, FilterComponent },
    data() {
        return {
            req: 'تحويل',
            filtered_Array: [],
        }
    },
    computed: {
        ...mapGetters(['Get_SCTRequests'])
    },
    created() {
        this.fetchData();
        console.log(this.Get_SCTRequests);
        this.filtered_Array = this.Get_SCTRequests;
    },
    methods: {
        ...mapActions(['FetchTRequests']),
        async fetchData() {
            try {
                await this.FetchTRequests();
                this.filtered_Array = this.Get_SCTRequests;
                console.log(this.filtered_Array);
            }
            catch (error) {
                throw '( fetching School Requests Error: ' + error + ')';
            }
        },
        handleFilter(filteredArray) {
            this.filtered_Array = filteredArray;
        },
    },
}
</script>

<style scoped>

</style>