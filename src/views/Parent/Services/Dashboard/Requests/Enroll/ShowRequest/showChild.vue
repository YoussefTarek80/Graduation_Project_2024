<template>
  <NavBar_View></NavBar_View>
  <section data-aos="fade-left" data-aos-duration="1000" class="px-20 py-10">
    <div class="flex items-center justify-between ">
      <div class="flex flex-col">
        <span class="sm:text-5xl text-2xl text-customDarkPurple">قائمة التقديمات </span>
        <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
      </div>
      <button class="w-3/12" @click="this.$router.push('/Darb/Dashboard/Children/AddChild')">
        تقديم للطفل
      </button>
    </div>
    <ChildrenTable @delete-request="deleteRequest" :items="getRequests" :info-route="'/Darb/Dashboard/Child'"
      :edit-route="'/Darb/Dashboard/Child/update'"></ChildrenTable>
  </section>
</template>
<script>
import NavBar_View from "../../../../../../../components/Parent/NavBar.vue";
import ChildrenTable from "../../../../../../../UI/Tables/ChildrenTable/Table.vue"
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    NavBar_View,
    ChildrenTable
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getRequests'])
  },
  async created() {
    await this.FetchRequests();
    console.log(this.getRequests)
  },
  methods: {
    ...mapActions(['FetchRequests', 'DeleteRequest']),
    async deleteRequest(id) {
      try {
        await this.DeleteRequest(id);
        await this.FetchRequests();
        console.log(id)
        console.log("Delete Done");
      } catch (err) {
        console.error(err);
      }
    },

  }
}
</script>
<style scoped>
@import url('../../../../../../../UI/CustomsCss/Custombutton.css');
</style>