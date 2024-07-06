<template>
  <NavBar_View></NavBar_View>
  <section class="py-10 px-20" data-aos="fade-left" data-aos-duration="1000">
    <div class="flex items-center justify-between ">
      <div class="flex flex-col">
        <span class="sm:text-5xl text-2xl text-customDarkPurple">قائمة الشكاوي </span>
        <i
            class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
        ></i>
      </div>
      <button class="w-3/12" @click="this.$router.push('/Darb/Assistant/Compliment/AddCompliment')" >
        انشاء شكوي
      </button>
    </div>
    <CompliemntTable :items="support"></CompliemntTable>
  </section>

</template>
<script >
import NavBar_View from "../../../../../../components/Parent/NavBar.vue";
import CompliemntTable from "../../../../../../UI/Tables/ComplimentTable/Table.vue";

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
<style scoped>
@import url('../../../../../../UI/CustomsCss/Custombutton.css');
</style>