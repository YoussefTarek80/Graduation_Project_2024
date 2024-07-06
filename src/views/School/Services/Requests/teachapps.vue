<template>
    <div class="reqs">
        <sc-navbar-comp></sc-navbar-Comp>
        <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة طلبات التوظيف</span>
                <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
            </div>
            <FilterComponent :disable="GetTeacherApps.length == 0" :filteredArray="filtered_Array"
                @filter="handleFilter" :MainArray="GetTeacherApps" :request="true" :Search="true">
            </FilterComponent>
            <div class="relative">
                <table_Component :reqtype="req" :items="filtered_Array"
                    :infoRoute="'/school/services/teachapps-requests/request-info'">
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
            req: 'سحب ملف',
            filtered_Array: [],
        }
    },
    computed: {
        ...mapGetters(['GetTeacherApps'])
    },
    async created() {
        await this.fetchData();
        console.log(this.GetTeacherApps);
        this.filtered_Array = this.GetTeacherApps;
    },
    methods: {
        ...mapActions(['FetchTeacherApps']),
        async fetchData() {
            try {
                await this.FetchTeacherApps();
                this.filtered_Array = this.GetTeacherApps;
                console.log(this.filtered_Array);
            }
            catch (error) {
                console.log("fetching School TeacherApps Error: ", error);
            }
        },
        handleFilter(filteredArray) {
            this.filtered_Array = filteredArray;
        },
    },
}
</script>

<style scoped>
@import url('../../../../UI//CustomsCss/CustomInput.css');
</style>