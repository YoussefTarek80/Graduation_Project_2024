<template>
  <div>
    <sc-navbar-comp></sc-navbar-Comp>

    <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
      <BaseTeleport :show="success">
        <div class="flex flex-col">
          <span class="text-green-700 text-4xl"> تم التحويل بنجاح </span>
          <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
        </div>
      </BaseTeleport>
      <BaseTeleport :show="failed">
        <div class="flex flex-col">
          <span class="text-red-700 text-4xl"> فشل الإرسال</span>
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

      <div class="flex flex-row flex-wrap justify-center"
        v-if="request.status == -1 && request.old_school != GetUser2.school_id">
        <div class="m-5">
          <button @click="accept()" class="w-25 sm:w-40 md:w-60">موافقة علي الطلب</button>
        </div>
        <div class="m-5">
          <button @click="reject()" class="w-25 sm:w-40 md:w-60">رفض الطلب</button>
        </div>
      </div>
      <div class="m-5">
        <button @click="confirmTransfer()" v-if="request.status == 1 && request.old_school == GetUser2.school_id"
          class="w-25 sm:w-40 md:w-80">
          تأكيد التحويل وحذف الطالب
        </button>
      </div>
    </section>
    <Footer_Component></Footer_Component>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import stud_form from "./stud-data.vue";
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      request: {},
      success: false,
      failed: false,
    }
  },
  components: {
    stud_form,
  },
  computed: {
    ...mapGetters(['GetUser2', 'Get_SCTRequests']),
  },
  async created() {
    await this.fetchData();
    console.log(this.GetUser2);
    console.log(this.request);
  },
  methods: {
    ...mapActions(['FetchUser2', 'FetchTRequests', 'AcceptTransferStudent']),
    initData() {
      this.request = this.Get_SCTRequests.find((v) => v.id === parseInt(this.id));
    },
    async fetchData() {
      try {
        await this.FetchUser2();
        await this.FetchTRequests();
        this.initData();
        console.log(this.request);
      }
      catch (error) {
        throw `Something went wrong! ${error}`;
      }
    },
    async accept() {
      try {
        const form = new FormData();
        form.append('status', 1);
        await this.AcceptTransferStudent({ id: this.request.id, status: form });
        this.fetchData();
        this.success = true;
        setTimeout(() => { this.success = false; }, 1000);
      }
      catch (err) {
        console.log(err);
        this.failed = true;
        setTimeout(() => {
          this.failed = false;
        }, 1000);
      }
    },
    async reject() {
      try {
        this.request.id
        const form = new FormData();
        form.append('status', 0);
        await this.AcceptTransferStudent({ id: this.request.id, status: form });
        this.fetchData();
        this.success = true;
        setTimeout(() => { this.success = false; }, 1000);
      }
      catch (err) {
        console.log(err);
        this.failed = true;
        setTimeout(() => {
          this.failed = false;
        }, 1000);
      }
    },
    async confirmTransfer() {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const data = new FormData();
        data.append("status", 2);
        await axios.post(
          `http://127.0.0.1:8000/api/school/SendTransferReqToOld/${this.request.id}`, data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        this.success = true;
        setTimeout(() => { this.success = false; }, 1000);
      }
      catch (err) {
        console.log(err);
        this.failed = true;
        setTimeout(() => {
          this.failed = false;
        }, 1000);
      }
    }
  },
}
</script>
<style scoped>
@import url('../../../../../../UI/CustomsCss/Custombutton.css');
</style>