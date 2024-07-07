<template>
  <sc-navbar-comp></sc-navbar-Comp>
  <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col items-center">
      <span class="text-3xl sm:text-4xl">تفاصيل عن المناسبة</span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
    </div>
    <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto">
      <span
        class="text-2xl md:text-3xl text-customDarkPurple px-0 md:px-5 py-3 rounded-2xl flex items-center m-5">
        <i class="fa-duotone fa-sparkles"></i>بيانات المناسبة</span>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col">
          <label>اسم المناسبة <span class="text-red-600">*</span></label>
          <input disabled v-model="event.name" class="item-data">
        </div>
        <div class="flex flex-col">
          <label>تاريخ المناسبة <span class="text-red-600">*</span></label>
          <input disabled v-model="event.date" class="item-data">
        </div>
        <div class="flex flex-col">
          <label> وقت الحدث<span class="text-red-600">*</span></label>
          <input disabled v-model="event.time" class="item-data">
        </div>
        <div class="flex flex-col">
          <label>عنو ان الحدث<span class="text-red-600">*</span></label>
          <input disabled v-model="event.address" class="item-data">
        </div>
        <div class="flex flex-col">
          <label>حالة الحدث <span class="text-red-600">*</span></label>
          <input disabled v-if="event.status == 0" value="جاري" class="item-data">
          <input disabled v-else value="تم الحدث" class="item-data">
        </div>
      </div>

      <div class="mt-10 flex flex-col">
        <label for="" class="">وصف المناسبة <span class="text-red-600">*</span></label>
        <textarea disabled v-model="event.description" rows="5" cols="10"
          class="item-data resize-none p-5 outline-none rounded-2xl"></textarea>
        <span v-if="event.description == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
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
      id: this.$route.params.id,
      event: {}
    }
  },
  computed: {
    ...mapGetters(["GetADEvents"]),
  },
  async created() {
    console.log(this.id);
    await this.fetchData();
    console.log(this.event);
  },
  methods: {
    ...mapActions(["FetchADEvents"]),
    initData() {
      this.event = this.GetADEvents.find(
        (v) => v.id == parseInt(this.id),
      );
    },
    async fetchData() {
      try {
        await this.FetchADEvents();
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