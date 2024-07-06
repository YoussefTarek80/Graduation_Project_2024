<template>
    <div class="reqs">
        <sc-navbar-comp></sc-navbar-Comp>
        <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة طلبات سحب الملفات </span>
                <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
            </div>
            <FilterComponent :disable="Get_SCWithdraw.length == 0" :filteredArray="filtered_Array"
                @filter="handleFilter" :MainArray="Get_SCWithdraw" :request="true" :Search="true">
            </FilterComponent>
            <div class="relative">
                <table_Component :items="filtered_Array" :reqtype="req"
                    :infoRoute="'/school/services/withdraw-requests/request-info'">
                </table_Component>
            </div>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import table_Component from "../../../../UI/School_Tables/RequestTable/withdrawTable.vue";
import FilterComponent from "../../../../components/School/Filtration/Filter-school.vue";

export default {
    components: { table_Component, FilterComponent },
    data() {
        return {
            req: 'سحب',
            filtered_Array: [],
        }
    },
    computed: {
        ...mapGetters(['Get_SCWithdraw'])
    },
    async created() {
        await this.fetchData();
        this.filtered_Array = this.Get_SCWithdraw;
    },
    methods: {
        ...mapActions(['FetchWithdraw']),
        async fetchData() {
            try {
                await this.FetchWithdraw();
                this.filtered_Array = this.Get_SCWithdraw;
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

<style scoped></style>