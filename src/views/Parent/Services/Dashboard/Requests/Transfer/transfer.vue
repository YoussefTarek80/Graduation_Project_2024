<template>
  <NavBar_View></NavBar_View>
  <div v-if="!loading">
    <loading_info2></loading_info2>
  </div>
  <section data-aos="fade-left" data-aos-duration="1000" class="sm:px-20 p-10 py-10"  v-if="loading">
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <span class="sm:text-5xl text-2xl text-customDarkPurple">تحويل طالب</span>
        <i
            class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
        ></i>
      </div>
      <div>
        <button class="sm:w-80" @click="this.$router.push('/Darb/Dashboard/Transfer/Search')">
          الاستعلام عن نتيجة التحويل
        </button>
      </div>
    </div>

    <div class="flex gap-10 mt-10 flex-wrap items-center justify-center ">
      <div  class="flex-col flex items-start justify-between shadow-2xl p-7 rounded-2xl sm:w-5/12 sm:h-auto"
           v-for="std in getChildren" :key="std.id" >
        <div class="flex flex-wrap text-center gap-5 items-center justify-center w-full">
<!--          vif src="../../../../../../assets/Logo/Profile.png"-->
          <img :src="std.image"
               class="w-40 p-2 border-2 border-amber-600 rounded-full">
          <div class="flex flex-col text-center">
            <span class="text-2xl sm:p-0 pt-5">
              {{ std.name }}
            </span>
            <span class="text-amber-600  text-xl">
              طالب
            </span>
          </div>
        </div>
        <span class="w-full my-5 button2 text-center" @click="Transfer(std.id)">
          تحويل
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import NavBar_View from "../../../../../../components/Parent/NavBar.vue";
import {mapActions, mapGetters} from "vuex";
import Loading_info2 from "../../../../../../UI/loadingInformation/loading_info2.vue";

export default {
  components: {Loading_info2, NavBar_View},
  data(){
    return{
      loading:false
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
    console.log(this.getChildren)
  },
  methods: {
    ...mapActions(['ShowChildren']),
    Transfer(id) {
      this.$router.push(`/Darb/Dashboard/Transfer/${id}`);
    }
  },

};
</script>
<style scoped>
@import url("./transfer.css");
@import url("../../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../../UI/CustomsCss/CustombuttonOrange.css");
</style>