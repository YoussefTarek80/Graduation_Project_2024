<template>
  <div class="sm:overflow-hidden overflow-auto">
    <table class="sm:w-full sm:my-20 mt-9 sm:text-lg text-sm">
      <thead class="text-white">
      <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tr-2xl">
        التسلسل
      </th>
      <th class="sm:py-5 sm:px-4 px-7 py-3">موضوع التقرير</th>
      <th class="sm:py-5 sm:px-4 px-7 py-3">وقت التقرير</th>
      <th class="sm:py-5 sm:px-4 px-7 py-3">تاريخ التقرير</th>
      <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tl-2xl">
        الاجراء
      </th>
      </thead>
      <tbody class="flex text-3xl p-10 items-center justify-center absolute left-1/3" v-if="items.length===0">
      لم يتم انشاء تقرير  حني الان
      </tbody>
      <tbody class="text-center relative" ref="tableBody" v-if="paginatedItems">
      <tr
          v-for="(item, index) in paginatedItems"
          :key="index"
          class="h-20 odd:bg-white even:bg-gray-100"
      >
        <td class="py-2 px-4">
          {{ (currentPage - 1) * pageSize + index + 1 }}
        </td>
        <td class="py-2 px-4">{{ item.subject }}</td>
        <td class="py-2 px-4">{{ timeRequest(item.created_at)}}</td>
        <td class="py-2 px-4">{{ dateRequest(item.created_at)}}</td>
        <td class="py-2 px-4 relative">
          <span @click="confirm = true"  class="bg-[#4d394d] text-white px-5 py-3 rounded-md font-bold cursor-pointer">حذف</span>
          <div >
            <BaseTeleport :show="confirm">
              <div class="flex flex-col">
                                <span class="text-red-700 text-4xl">
                                    تاكيد الحذف
                                </span>
                <div
                    class="flex items-center justify-around mt-10"
                >
                  <button
                      class="w-96"
                      @click="handleDeleteSchool(item.id)"
                  >
                    تاكيد
                  </button>
                  <button
                      class="w-52"
                      @click="confirm = false"
                  >
                    الغاء
                  </button>
                </div>
              </div>
            </BaseTeleport>
          </div>

        </td>



      </tr>

      </tbody>

    </table>

  </div>
<!--  <div class="flex w-full  " v-if="items.length===0">-->
<!--    <loading_info2></loading_info2>-->
<!--  </div>-->
  <Pagination
      v-if="items.length!==0"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :nextPage="nextPage"
      :prevPage="prevPage"
  />
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
import Loading_info2 from "../../loadingInformation/loading_info2.vue";
export default {
  components: {Loading_info2},
  props: ["items", "infoRoute"],
  data() {
    return {
      showInfo: null,
      currentPage: 1,
      pageSize: 5,
      confirm: false,
      clickable: false,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.pageSize);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.items.slice(startIndex, endIndex);
    },
  },
  methods: {
    handleDeleteSchool(id) {
      this.$emit("delete-event", id);
      this.showInfo = null;
      this.confirm = false;
    },
    infoRoute(index) {
      return `${this.infoRoute}/${index}`;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    toggleShowInfo(index) {
      if (this.showInfo === index) {
        this.showInfo = null;
      } else {
        this.showInfo = index;
      }
    },
    closeActionWindow(event) {
      if (!this.$refs.tableBody.contains(event.target)) {
        this.showInfo = null;
      }
    },
    timeRequest(time){
      const dateTime = new Date(time);
      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, '0');
      const day = String(dateTime.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;

    },
    dateRequest(date){
      const dateTime = new Date(date);
      const hours = String(dateTime.getHours()).padStart(2, '0');
      const minutes = String(dateTime.getMinutes()).padStart(2, '0');
      const seconds = String(dateTime.getSeconds()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      return formattedTime;
    },
  },
  mounted() {
    document.body.addEventListener("click", this.closeActionWindow);
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this.closeActionWindow);
  },
};
</script>
<style scoped>
@import url("../../../UI/CustomsCss/Custombutton.css");
@import url("../../../UI/Tables/table.css");
</style>
