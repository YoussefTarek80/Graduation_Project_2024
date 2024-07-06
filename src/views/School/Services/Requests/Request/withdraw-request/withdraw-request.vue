<template>
  <div>
    <sc-navbar-comp></sc-navbar-Comp>

    <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
      <BaseTeleport :show="success">
        <div class="flex flex-col">
          <span class="text-green-700 text-4xl"> تم قبول الطلب بنجاح </span>
          <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
        </div>
      </BaseTeleport>
      <BaseTeleport :show="failed">
        <div class="flex flex-col">
          <span class="text-red-700 text-4xl"> فشل القبول </span>
          <i class="fa-sharp fa-solid fa-badge-check text-red-700 text-7xl m-3"></i>
        </div>
      </BaseTeleport>
    </section>

    <section class="flex flex-col items-center w-full mt-6" data-aos="fade-up" data-aos-duration="1000">
      <div class="flex flex-col mb-5">
        <span class="sm:text-3xl text-2xl font-bold">بيانات الطلب </span>
        <span class="w-11/12 h-1 bg-black m-1 rounded-2xl"></span>
      </div>

      <stud_form :form="request">
      </stud_form>

      <div class="flex flex-row justify-center">
        <button @click="accept" class="m-5 w-25 sm:w-40 md:w-60">موافقة علي الطلب</button>
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