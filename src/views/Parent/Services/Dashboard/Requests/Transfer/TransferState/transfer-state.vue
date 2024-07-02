<template>
  <NavBar_View></NavBar_View>
  <section data-aos="fade-left" data-aos-duration="1000" class="sm:px-20 p-10 py-10">
    <div class="flex flex-col">
      <span class="sm:text-5xl text-2xl text-customDarkPurple">الاستعلام عن نتيجة التحويل طالب</span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
    </div>
    <ChildSearch @search="fetchTransferDegree" :isRecording="isRecording" @update:isRecording="isRecording = $event"></ChildSearch>
    <div v-for="student in getTransfer" :key="student.id" class="bg-white shadow-lg rounded-lg p-4 sm:w-6/12 mx-auto mt-10" v-if="response && !notResponse" data-aos="fade-left">
      <div class="flex flex-col mb-4">
        <span class="font-semibold flex">
          <p>اسم الطالب:</p>
          <p>{{student.name}}</p>
        </span>
        <span class="font-semibold flex">
          <p>الرقم القومي:</p>
          <p>{{student.student_national_id}}</p>
        </span>
      </div>
      <div class="border-t pt-4">
        <p class="text-gray-700 mb-2 line-clamp-2">
          <span>تم إرسال طلب تحويل الطالب صاحب الرقم القومي <span class="font-bold">{{student.student_national_id}}</span></span><br>
        </p>
        <p class="text-gray-700 mb-2 line-clamp-2">
          <span>برجاء الذهاب إلى المدرسة القديمة لتأكيد حالة الطلب.</span>
        </p>
        <span class="font-semibold text-green-600" v-if="student.status === 1">
          حالة الطلب: تمت الموافقة من المدرسة المحول اليها وفي انتظار موافقة المدرسة القديمة
        </span>
        <span class="font-semibold text-green-600" v-if="student.status === 2">
          حالة الطلب: تم التحويل
        </span>
        <span class="font-semibold text-gray-600" v-if="student.status === -1">
          حالة الطلب: قيد الانتظار
        </span>
        <span class="font-semibold text-red-600" v-if="student.status === 0">
          حالة الطلب: الرفض
        </span>
      </div>
    </div>
    <div v-if="notResponse" class="text-center p-10 text-3xl text-red-600 flex justify-center items-center gap-10">
      <span>ليس موجود طالب بهذا الرقم القومي</span>
      <i class="fa-light fa-ban text-6xl"></i>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import NavBar_View from "../../../../../../../components/Parent/NavBar.vue";
import { mapActions, mapGetters } from "vuex";
import ChildSearch from '../../../../../../../components/Parent/SearchInput/search.vue';

export default defineComponent({
  components: { NavBar_View, ChildSearch },
  data() {
    return {
      isRecording: false,
      response: false,
      notResponse: false,
    };
  },
  computed: {
    ...mapGetters(['getTransfer']),
  },
  methods: {
    ...mapActions(['FetchTransferDegree']),
    async fetchTransferDegree(nationalID) {
      try {
        await this.FetchTransferDegree(nationalID);
        this.response = true;
        this.notResponse = false;
      } catch (err) {
        console.error(err);
        this.response = false;
        this.notResponse = true;
      }
    },
  },
});
</script>

<style scoped>
</style>
