<template>
  <Navbar></Navbar>
  <section class="m-6 sm:m-16 " data-aos="fade-up" data-aos-duration="1000">
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <span class="sm:text-3xl text-2xl">قائمة التقارير</span>
        <i
            class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
        ></i>
      </div>
      <button
          class="sm:w-80 flex justify-around items-center"
          @click="this.$router.push('/Admin/Reports/AddReport')"
      >
        <span class="sm:text-xl text-sm">اضافة تقرير جديدة</span>
        <i class="fa-solid fa-plus p-1"></i>
      </button>
    </div>
    <table_Component :items="Getreports"
                     @delete-event="deleteEvent"></table_Component>
  </section>
  <Footer></Footer>
</template>
<script >

import {defineComponent} from "vue";
import Navbar from "../../../../components/Admin/Navbar/Navbar.vue";
import table_Component from "../../../../UI/Tables/ReportsTable/Table.vue";
import FilterComponent from "../../../../components/Admin/Filtration/Filter.vue";
import Footer from "../../../../components/Admin/Footer/footer.vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  components: {Footer, FilterComponent, table_Component, Navbar},
  data(){
    return{
      filtered_Array:[]
    }
  },
  async created() {
    await this.FetchReports();
    console.log(this.Getreports)
  },
  computed:{
    ...mapGetters(["Getreports"])
  },
  methods:{
    ...mapActions(["FetchReports","DeleteReport"]),
    handleFilter(filteredArray) {
      this.filtered_Array = filteredArray;
    },
    async deleteEvent(id) {
      try {
        await this.DeleteReport(id);
        console.log("Delete Done");
      } catch (err) {
        console.error(err);
      }
    },
  }
})
</script>
<style scoped>
@import url("../../../../UI/CustomsCss/Custombutton.css");
</style>