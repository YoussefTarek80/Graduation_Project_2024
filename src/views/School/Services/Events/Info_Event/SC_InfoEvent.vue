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
          <label for="">اسم المناسبة <span class="text-red-600">*</span></label>
          <input disabled v-model="event.name"
            class="item-data border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
        <div class="flex flex-col">
          <label for="">تاريخ المناسبة <span class="text-red-600">*</span></label>
          <input disabled v-model="event.date"
            class="item-data border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
        <div class="flex flex-col">
          <label for=""> وقت الحدث<span class="text-red-600">*</span></label>
          <input disabled v-model="event.time"
            class="item-data border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
        <div class="flex flex-col">
          <label for="">عنوان الحدث<span class="text-red-600">*</span></label>
          <input disabled v-model="event.address"
            class="item-data border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div>
        <!-- <div class="flex flex-col">
          <label for="">الحالة <span class="text-red-600">*</span></label>
          <input disabled v-model="event.state"
            class="item-data border-2 border-gray-300 px-5 py-2 rounded-3xl outline-none">
        </div> -->
      </div>
      <div class="flex flex-col mt-5">
        <label for="">وصف المناسبة <span class="text-red-600">*</span></label>
        <textarea disabled v-model="event.description" rows="5" cols="10"
          class="item-data resize-none p-5 outline-none rounded-2xl"></textarea>
      </div>
      <div class="m-5 flex items-center justify-end sm:gap-5">
        <button class="w-96" @click="this.$router.push('/school/services/sc-events')">الرجوع الي قائمة
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
      id: this.$route.params.id,
      event: {}
    }
  },
  computed: {
    ...mapGetters(["GetSCEvents"]),
  },
  async created() {
    await this.fetchData();
    console.log(this.GetSCEvents);
  },
  methods: {
    ...mapActions(["FetchSCEvents"]),
    initData() {
      this.event = this.GetSCEvents.find(
        (v) => v.id == parseInt(this.id),
      );
    },
    async fetchData() {
      try {
        await this.FetchSCEvents();
        this.initData();
        console.log(this.event);
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