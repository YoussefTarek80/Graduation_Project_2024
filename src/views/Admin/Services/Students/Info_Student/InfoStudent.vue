<template>
    <Navbar_Component></Navbar_Component>
    <section
        class="m-10"
        data-aos="fade-up"
        data-aos-duration="1000"
    >
      <div v-if="!loading" class="h-screen">
        <Loading_info2></Loading_info2>
      </div>
      <div v-if="loading">
        <child-data :array="GetStdInfo" ></child-data>
        <parent-data :array="GetStdInfo" ></parent-data>
      </div>

    </section>
  <Footer></Footer>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import ChildData from "../../../../Admin/Services/Students/Info_Student/ChildData/child-data.vue";
import ParentData from "../../../../Admin/Services/Students/Info_Student/ParentData/parent-data.vue";
import Loading_info2 from "../../../../../UI/loadingInformation/loading_info2.vue";
import Footer from "../../../../../components/Admin/Footer/footer.vue";

export default {
  components: {Footer, Loading_info2, ChildData,ParentData},
    data() {
        return {
            item:[],
          loading:false
        };
    },
    computed:{
      ...mapGetters(["GetStdInfo"])
    },
    async created() {
      try {
        this.loading = false;
        await this.FetchSpecificStudent(this.$route.params.index);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = true;
      }

    },
    methods: {
      ...mapActions(["FetchSpecificStudent"]),
    },
};
</script>
<style scoped>

</style>
