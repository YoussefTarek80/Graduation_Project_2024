<template>
  <NavBar_View></NavBar_View>
  <section class="py-10 px-20" data-aos="fade-left" data-aos-duration="1000">
    <CompliemntTable :items="support"></CompliemntTable>
  </section>

</template>
<script >
import NavBar_View from "../../../../../components/Parent/NavBar.vue";
import CompliemntTable from "../../../../../UI/Tables/ComplimentTable/Table.vue";

export default {
  components:{
    NavBar_View,
    CompliemntTable
  },
  inject:['support'],
  date(){
    return{

    }
  }
}
</script>