<template>
  <Navbar_Component></Navbar_Component>
  <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
    <!-- Title and Add Button Section -->
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <span class="sm:text-3xl text-2xl">قائمة المناسبات</span>
        <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
      </div>
      <button class="sm:w-80 flex justify-around items-center" @click="this.$router.push('/Admin/Event/AddEvent')">
        <span class="sm:text-xl text-sm">اضافة مناسبة جديدة</span>
        <i class="fa-solid fa-plus p-1"></i>
      </button>
    </div>

    <!-- Filter Component -->
    <FilterComponent :filteredArray="events" @filter="handleFilter" :status="true"></FilterComponent>

    <!-- Table Component -->
    <table_Component :items="filteredResults" :infoRoute="'/Admin/Event/InfoEvent'" :editRoute="'/Admin/Event/UpdateEvent'" @delete-event="deleteEvent"></table_Component>
  </section>

  <!-- Footer Component -->
  <Footer_Component></Footer_Component>
</template>

<script>
import axios from "axios";
import table_Component from "../../../../UI/Tables/EventTable/Table.vue";
import FilterComponent from "../../../../components/Admin/Filtration/Filter.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    table_Component,
    FilterComponent
  },
  computed: {
    ...mapGetters(["events"]),
  },
  data() {
    return {
      filteredResults: [],
    };
  },
  async created() {
    await this.FetchEvents();
    this.filteredResults=this.events
  },
  methods: {
    ...mapActions(["FetchEvents", "RemoveEvent"]),
    handleFilter(filteredArray) {
      this.filteredResults = filteredArray;
    },
    async deleteEvent(id) {
      try {
        await this.RemoveEvent(id);
        console.log("Delete Done");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
@import url("../../../../UI/CustomsCss/Custombutton.css");
</style>
