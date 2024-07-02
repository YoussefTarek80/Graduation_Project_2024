<template>
  <Navbar_Component></Navbar_Component>
  <div v-if="!event" class="h-screen ">
    <loading_info2></loading_info2>
  </div>
  <section
      class="m-10"
      data-aos="fade-up"
      data-aos-duration="1000"
      v-if="event"
  >
    <div class="flex flex-col items-center">
            <span class="text-3xl sm:text-4xl">
              تفاصيل عن المناسبة
            </span>
      <i
          class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"
      ></i>
    </div>
    <div
        class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto"
    >
      <div class="my-5">
        <span class="text-2xl">بيانات المناسبة</span>
      </div>
      <div class="input_Div grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div class="flex flex-col">
          <label for="in1">اسم المناسبة <span class="text-red-600">*</span></label>
          <span class="item-data">{{ event.name }}</span>
        </div>
        <div class="flex flex-col">
          <label for="in4"
          >تاريخ المناسبة
            <span class="text-red-600">*</span></label
          >
          <span class="item-data">{{ event.date }}</span>
        </div>
        <div class="flex flex-col">
          <label for="in5"
          > وقت الحدث
            <span class="text-red-600">*</span></label
          >
          <span class="item-data">{{ event.time }}</span>
        </div>
        <div class="flex flex-col">
          <label for="in6"
          >عنوان الحدث
            <span class="text-red-600">*</span></label
          >
          <span class="item-data">{{ event.address }}</span>
        </div>
        <div class="flex flex-col">
          <label for="in7"
          >الحالة <span class="text-red-600">*</span></label
          >
          <span class="item-data">{{  }}</span>
        </div>
      </div>
      <div class="flex flex-col mt-10">
        <label for="in7"
        >المدارس المختارة <span class="text-red-600">*</span></label
        >
        <div class="flex flex-wrap h-52 overflow-auto  custom-scrollbar">
          <span class="item-data flex" v-for="school in event.schools">{{ school.name }}</span>
        </div>
      </div>

    </div>
    <div class="m-5 flex items-center justify-end sm:gap-5 mt-10">
      <button class="w-96" @click="this.$router.push('/Admin/Event')">الرجوع الي قائمة المدارس</button>
    </div>
  </section>
  <Footer_Component></Footer_Component>
</template>
<script>
import {mapGetters, mapActions} from "vuex";
import Footer_Component from "../../../../../components/Admin/Footer/footer.vue";
import Loading_info2 from "../../../../../UI/loadingInformation/loading_info2.vue";

export default {
  components: {Loading_info2, Footer_Component},
  data() {
    return {
      event: null
    }
  },
  computed: {
    ...mapGetters(["events"]),
  },
  created() {
    this.fetchEvent();
  },
  methods: {
    ...mapActions(["FetchEvents"]),
    async fetchEvent() {
      try {
        await this.FetchEvents();
        const index = this.$route.params.index;
        this.event = this.events.find(
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