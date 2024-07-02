<template>
  <Navbar-view></Navbar-view>
  <section data-aos="fade-left" data-aos-duration="1000" class="px-20 py-10">
    <div class="flex items-center justify-between ">
      <div class="flex flex-col">
        <span class="sm:text-5xl text-2xl text-customDarkPurple">قائمة الدعم </span>
        <i
            class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
        ></i>
      </div>
      <button class="w-3/12" @click="this.$router.push('/Darb/Assistant/Support/AddTicket')" >
        انشاء تذكرة
      </button>
    </div>
    <SupportTable :items="support"></SupportTable>
  </section>
</template>
<script>

import {defineComponent} from "vue";
import NavbarView from "../../../../../../components/Parent/NavBar.vue";
import SupportTable from "../../../../../../UI/Tables/SupportTable/Table.vue"
export default defineComponent({
  components: {NavbarView,SupportTable},
  inject:['support'],
  mounted(){
    console.log(this.support)
  },
})
</script>
<style scoped>
@import url('../../../../../../UI/CustomsCss/Custombutton.css');
</style>