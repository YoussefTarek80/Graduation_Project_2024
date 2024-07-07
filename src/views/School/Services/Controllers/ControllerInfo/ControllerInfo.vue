<template>
  <sc-navbar-comp></sc-navbar-Comp>
  <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">
        تفاصيل عن المسؤول
      </span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">

      <span class="text-2xl md:text-3xl text-customDarkPurple px-0 md:px-5 py-3 rounded-2xl flex items-center m-5">
        <i class="fa-duotone fa-sparkles"></i>بيانات المسؤول</span>
      <div class="pt-5 grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div class="flex flex-col">
          <label>اسم مدير الكنترول </label>
          <input disabled required v-model="controller.staff_name" class="item-data">
        </div>
        <div class="flex flex-col">
          <label>الدور الوظيفي </label>
          <input disabled required v-model="controller.staff_role" class="item-data">
        </div>
        <div class="flex flex-col">
          <label> الهاتف </label>
          <input disabled required v-model="controller.staff_phone" class="item-data">
        </div>
        <div class="flex flex-col">
          <label>العنوان </label>
          <input disabled required v-model="controller.staff_address" class="item-data">
        </div>
        <div class="flex flex-col">
          <label>البريد الإلكتروني </label>
          <input disabled required v-model="controller.email" class="item-data">
        </div>
      </div>
      <div class="m-5 flex items-center justify-end sm:gap-5">
        <button class="w-96" @click="this.$router.push('/school/services/controllers')">الرجوع الي قائمة
          المُدراء</button>
      </div>
    </div>

  </section>
  <Footer_Component></Footer_Component>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Footer_Component from "../../../../../components/Admin/Footer/footer.vue";

export default {
  components: { Footer_Component },
  data() {
    return {
      id: this.$route.params.id,
      controller: {}
    }
  },
  computed: {
    ...mapGetters(["GetControllers"]),
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    ...mapActions(["FetchControllers"]),
    initData() {
      this.controller = this.GetControllers.find(
        (item) => item.id === parseInt(this.id)
      );
    },
    async fetchData() {
      try {
        await this.FetchControllers();
        this.initData();
        console.log(this.controller);
      } catch (err) {
        console.error(err);
      }
    },
  },
}
</script>
<style scoped>
@import url("../../Events/Info_Event/infoEvent.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../UI/CustomsCss/CustomInput.css");
</style>