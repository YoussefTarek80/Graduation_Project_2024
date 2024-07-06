<template>
  <Navbar></Navbar>
  <section class="px-20 py-10">
      <div class="flex flex-col">
        <span class="sm:text-5xl text-2xl text-customDarkPurple">قائمة المناسبات </span>
        <i
            class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
        ></i>
      </div>
      <EventTable :items="data"></EventTable>
  </section>
</template>
<script >
import Navbar from "../../../../../../components/Parent/NavBar.vue";
import EventTable from "../../../../../../UI/Tables/EventTable/Table.vue";
export default {
  components: {Navbar,EventTable},
  data(){
    return{
      data:[]
    }
  },
  mounted(){
    console.log('route',this.$route.params.routes);
  }
}
</script>
<style scoped>

</style>