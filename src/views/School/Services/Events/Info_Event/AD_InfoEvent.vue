<template>
  <sc-navbar-comp></sc-navbar-Comp>
  <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">
        تفاصيل عن المناسبة
      </span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">
      <div class="my-5">
        <span class="text-2xl">بيانات المناسبة</span>
      </div>
      <div class="input_Div grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col">
          <label for="in1">اسم المناسبة <span class="text-red-600">*</span></label>
          <input disabled v-model="this.event.name" class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
        <div class="flex flex-col">
          <label for="in4">تاريخ المناسبة <span class="text-red-600">*</span></label>
          <input disabled v-model="this.event.date" class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
        <div class="flex flex-col">
          <label for="in5"> وقت الحدث<span class="text-red-600">*</span></label>
          <input disabled v-model="this.event.time" class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
        <div class="flex flex-col">
          <label for="in6">عنوان الحدث<span class="text-red-600">*</span></label>
          <input disabled v-model="this.event.address"
            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
        <div class="flex flex-col">
          <label for="in7">الحالة <span class="text-red-600">*</span></label>
          <input disabled v-model="this.event.state"
            class="border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
      </div>
      <div class="m-5 flex items-center justify-end sm:gap-5">
        <button class="w-96" @click="this.$router.push('/school/services/ad-events')">الرجوع الي قائمة
          المناسبات</button>
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
      event: {}
    }
  },
  computed: {
    ...mapGetters(["GetSCEvents"]),
  },
  created() {
    this.fetchEvent();
  },
  methods: {
    ...mapActions(["FetchSCEvents"]),
    async fetchEvent() {
      try {
        await this.FetchSCEvents();
        const index = this.$route.params.id;
        this.event = this.GetSCEvents.find(
          (event) => event.id === parseInt(index)
        );
        console.log(this.event)
      } catch (err) {
        console.error(err);
      }
    },
  },
}
</script>
<style scoped>
@import url("./infoEvent.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../../../../UI/CustomsCss/CustomInput.css");
</style>