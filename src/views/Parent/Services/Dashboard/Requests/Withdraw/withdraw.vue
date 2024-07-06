<template>
  <NavBar_View></NavBar_View>
  <div v-if="!loading">
    <loading_info2></loading_info2>
  </div>
  <section class="px-20 py-10" data-aos="fade-left" data-aos-duration="1000" v-if="loading">
    <div class="flex flex-col">
      <span class="text-2xl sm:text-5xl text-customDarkPurple">سحب ملف طالب</span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
    </div>
    <div class="student flex gap-10 mt-10 flex-wrap items-center justify-center">
      <div class="flex-col flex items-start justify-between shadow-2xl p-7 rounded-2xl sm:w-5/12 sm:h-auto"
           v-for="std in getChildren" :key="std.id">
        <div class="flex flex-wrap text-center gap-5 items-center justify-around w-full">
          <img :src="std.image" class="w-40 p-2 border-2 border-amber-600 rounded-full">
          <div class="flex flex-col">
            <span class="text-2xl">{{ std.name }}</span>
            <span class="text-xl text-amber-600">طالب</span>
          </div>
        </div>
          <span class=" button2 mx-auto my-10  w-full text-center" @click="generatePdf(std)" >
            تقديم طلب للسحب
          </span>
      </div>
    </div>
  </section>

</template>

<script>
import { defineComponent } from 'vue';
import NavBar_View from "../../../../../../components/Parent/NavBar.vue";

import { mapActions, mapGetters } from "vuex";
import Loading_info2 from "../../../../../../UI/loadingInformation/loading_info2.vue";
export default defineComponent({
  components: {Loading_info2, NavBar_View },
  data(){
    return{
      loading:false,
      sent: false
    }
  },
  computed: {
    ...mapGetters(['getChildren']),
  },
  async created() {
    setTimeout(()=>{
      this.loading=true;
    },2000)
    await this.ShowChildren();
    this.loading=false;
  },
  methods: {
    ...mapActions(['ShowChildren']),
    generatePdf(std) {
      this.$router.push(`/Darb/Dashboard/Withdraw/pdf/${std.id}`)
    }
  }
})
</script>

<style scoped>
@import url("../../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../../UI/CustomsCss/CustombuttonOrange.css");
</style>
