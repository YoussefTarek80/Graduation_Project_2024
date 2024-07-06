<template>
  <NavBar></NavBar>
  <div v-if="loading">
    <loading_info2></loading_info2>
  </div>
  <section data-aos="fade-left" data-aos-duration="1000" class="sm:px-20 p-10 py-10" v-if="!loading" >
    <div class="flex flex-col">
      <span class="sm:text-5xl text-2xl text-customDarkPurple">نتائج الطالب</span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="student flex gap-10 mt-10 flex-wrap items-center justify-center" >

      <div   class="flex-col flex items-start justify-between shadow-2xl p-7 rounded-2xl sm:w-5/12 sm:h-auto"
           v-for="std in getChildren" :key="std.id">
        <div class="flex flex-wrap text-center gap-5 items-center justify-center w-full">
          <img :src="std.image" v-if="std.image"
               class="w-40 p-2 border-2 border-amber-600 rounded-full">
          <div class="flex flex-col">
            <span class="text-2xl">
              {{ std.name }}
            </span>
            <span class="text-xl text-amber-600">
              طالب
            </span>
          </div>
        </div>
        <span class="button2 mx-auto my-10  w-full text-center" @click="Grade(std.id)">
          عرض النتيجة
        </span>
      </div>
    </div>
  </section>
</template>
<script >
import NavBar from "../../../../../../components/Parent/NavBar.vue";
import ChildSearch from "../../../../../../components/Parent/SearchInput/search.vue";
import {mapActions, mapGetters} from "vuex";
import Loading_info2 from "../../../../../../UI/loadingInformation/loading_info2.vue";
export default {
  components: {Loading_info2, NavBar},
  data(){
    return{
      loading:false
    }
  },
  computed: {
    ...mapGetters(['getChildren']),
  },
  async created() {
    this.loading=true;
    await this.ShowChildren();
    this.loading=false;
    console.log(this.getChildren)
  },
  methods: {
    ...mapActions(['ShowChildren']),
    Grade(id) {
      this.$router.push(`/Darb/ShowGrade/GradeData/${id}`);
    }
  },

};
</script>

<style scoped>

@import url("../../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../../UI/CustomsCss/CustombuttonOrange.css");
</style>
