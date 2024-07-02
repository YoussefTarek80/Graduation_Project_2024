<template>
    <div>
        <sc-navbar-comp></sc-navbar-Comp>

        <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
            <BaseTeleport :show="success">
                <div class="flex flex-col">
                    <span class="text-green-700 text-4xl"> تم الحذف بنجاح </span>
                    <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
                </div>
            </BaseTeleport>
            <BaseTeleport :show="failed">
                <div class="flex flex-col">
                    <span class="text-red-700 text-4xl"> فشل الحذف</span>
                    <i class="fa-sharp fa-solid fa-badge-check text-red-700 text-7xl m-3"></i>
                </div>
            </BaseTeleport>
        </section>

        <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="sm:text-3xl text-2xl">قائمة مسؤولون الكنترول</span>
                    <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
                </div>
                <button class="sm:w-80 flex justify-around items-center"
                    @click="this.$router.push('/school/services/controllers/add-controller')">
                    <span class="sm:text-xl text-sm">اضافة مدير كنترول</span>
                    <i class="fa-solid fa-plus p-1"></i>
                </button>
            </div>
            <FilterComponent :disable="GetControllers.length === 0" :filteredArray="filtered_Array"
                @filter="handleFilter" :MainArray="GetControllers" :controller="true" :Search="true"></FilterComponent>
            <table_Component :items="filtered_Array" :infoRoute="'/school/services/controllers/controller-info'"
                :editRoute="'/school/services/controllers/edit-controller'" @delete-controller="deleteController">
            </table_Component>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
import table_Component from "../../../../UI/School_Tables/ControllerTable/Table.vue";
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
            success: false,
            failed: false,
        }
    },
    computed: {
        ...mapGetters(["GetControllers"]),
    },
    created() {
        this.fetchData();
    },
    methods: {
        ...mapActions(["FetchControllers", "RemoveController"]),
        initData() {
            this.filtered_Array = this.GetControllers;
        },
        async fetchData() {
            try {
                await this.FetchControllers();
                this.initData();
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
                this.initData();
                console.log("Controller the administrator has been dismissed successfully");
                this.success = true;
                setTimeout(() => { this.success = false }, 1500)
            } catch (error) {
                console.error(error);
                this.failed = true;
                setTimeout(() => { this.failed = false }, 1500)
            }
        },
    },
};
</script>
<style scoped>
@import url("../../../../UI/CustomsCss/Custombutton.css");
</style>