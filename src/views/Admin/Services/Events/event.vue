<template>
    <Navbar_Component></Navbar_Component>
    <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة المناسبات</span>
                <i
                    class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
                ></i>
            </div>
            <button
                class="sm:w-80 flex justify-around items-center"
                @click="this.$router.push('/Admin/Event/AddEvent')"
            >
                <span class="sm:text-xl text-lg">اضافة مناسبة جديدة</span>
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <FilterComponent
            :filteredArray="events"
            @filter="handleFilter"
            :MainArray="events"
            :nationalIDS="false"
            :Search="false"
            :status="true"
        ></FilterComponent>
        <table_Component :items="events" :infoRoute="'/Admin/Event/InfoEvent'" :editRoute> </table_Component>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import axios from "axios";
import table_Component from "../../../../UI/Tables/EventTable/Table.vue";
import FilterComponent from "../../../../components/Admin/Filtration/Filter.vue";
import {mapGetters,mapActions} from "vuex";

export default {
    components: {
        table_Component,
        FilterComponent
    },
    data(){
        return{
        }
    },
    computed: {
      ...mapGetters(["events"]),
    },
    async created() {
      await this.FetchEvents();
    },
    methods: {
        ...mapActions(["FetchEvents"]),

        handleFilter(filteredArray) {
          this.filtered_Array = filteredArray;
        },
    },
};
</script>
<style scoped>
@import url("../../../../UI/CustomsCss/Custombutton.css");
</style>
