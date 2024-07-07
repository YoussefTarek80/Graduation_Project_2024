<template>
  <div>
    <sc-navbar-comp></sc-navbar-Comp>

    <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
      <BaseTeleport :show="success">
        <div class="flex flex-col">
          <span class="text-green-700 text-4xl">تم قبول الطلب بنجاح </span>
          <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
        </div>
      </BaseTeleport>
      <BaseTeleport :show="failed">
        <div class="flex flex-col">
          <span class="text-red-700 text-4xl">فشل قبول الطلب </span>
          <i class="fa-sharp fa-solid fa-badge-check text-red-700 text-7xl m-3"></i>
        </div>
      </BaseTeleport>
    </section>

    <section class="flex flex-col items-center w-full mt-6" data-aos="fade-up" data-aos-duration="1000">
      <span
        class="text-2xl md:text-3xl text-customDarkPurple px-0 md:px-5 py-3 rounded-2xl flex items-center m-5 md:m-10">
        <i class="fa-duotone fa-sparkles"></i>بيانات طلب السحب </span>

      <div class="p-2 sm:p-5 w-8/12">
        <stud_form :form="request">
        </stud_form>

        <div class="flex flex-row justify-center">
          <button @click="accept" class="m-5 w-25 sm:w-40 md:w-60">موافقة علي الطلب</button>
        </div>
      </div>
    </section>
    <Footer_Component></Footer_Component>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import stud_form from "./stud-data.vue";
export default {
  components: {
    stud_form,
  },
  data() {
    return {
      id: this.$route.params.id,
      request: {},
      success: false,
      failed: false,
    }
  },
  computed: {
    ...mapGetters(['Get_SCWithdraw']),
  },
  async created() {
    await this.fetchData();
    console.log(this.request);
  },
  methods: {
    ...mapActions(['FetchWithdraw', 'withdrawStudent']),
    initData() {
      this.request = this.Get_SCWithdraw.find((v) => v.id === parseInt(this.id));
    },
    async fetchData() {
      try {
        await this.FetchWithdraw();
        this.initData();
      }
      catch (error) {
        throw `Something went wrong! ${error}`;
      }
    },
    async accept() {
      try {
        await this.withdrawStudent(this.request.id);
        this.$router.push('/school/services/withdraw-requests');
        this.fetchData();
        this.success = true;
        setTimeout(() => { this.success = false; }, 1000);
      }
      catch (err) {
        console.log(err);
        this.failed = true;
        setTimeout(() => { this.failed = false; }, 1000);
      }
    },
  },
}
</script>
<style scoped>
@import url('../../../../../../UI/CustomsCss/Custombutton.css');
</style>