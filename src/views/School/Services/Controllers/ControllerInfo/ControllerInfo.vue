<template>
  <sc-navbar-comp></sc-navbar-Comp>
  <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">
        تفاصيل عن المدير
      </span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">
      <div class="pt-12 input_Div grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div class="flex flex-col">
          <label for="in1">اسم مدير الكنترول </label>
          <input disabled v-model="this.controller.name"
            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
        <div class="flex flex-col">
          <label for="in4">الدور الوظيفي </label>
          <input disabled v-model="this.controller.role"
            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
        <div class="flex flex-col">
          <label for="in5"> العمر </label>
          <input disabled v-model="this.controller.age"
            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
        <div class="flex flex-col">
          <label for="in6">العنوان </label>
          <input disabled v-model="this.controller.address"
            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
      </div>
      <div class="m-5 flex items-center justify-end sm:gap-5">
        <button class="w-96" @click="this.$router.push('/School/Services/Controllers')">الرجوع الي قائمة
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
      controller: {}
    }
  },
  computed: {
    ...mapGetters(["GetControllers"]),
  },
  created() {
    this.fetchEvent();
  },
  methods: {
    ...mapActions(["FetchControllers"]),
    async fetchEvent() {
      try {
        await this.FetchControllers();
        const index = this.$route.params.id;
        this.controller = this.GetControllers.find(
          (controller) => controller.id === parseInt(index)
        );
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