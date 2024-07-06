<template>
  <div class="sm:overflow-hidden overflow-auto">
    <table class="sm:w-full sm:my-20 mt-9 sm:text-lg text-sm">
      <thead class="text-white relative">
      <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tr-2xl">
        التسلسل
      </th>
      <th class="sm:py-5 sm:px-4 px-7 py-3">اسم الطفل</th>
      <th class="sm:py-5 sm:px-4 px-7 py-3">تاريخ التقديم</th>
      <th class="sm:py-5 sm:px-4 px-7 py-3">وقت التقديم</th>
      <th class="sm:py-5 sm:px-4 px-7 py-3">الحالة</th>
      <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tl-2xl">
        الاجراء
      </th>
      </thead>
      <tbody class="flex text-3xl p-10 items-center justify-center absolute left-1/3" v-if="items.length===0">
          لم يتم تقديم اي طفل حتي الان
      </tbody>
      <tbody class="text-center relative" ref="tableBody">
      <tr
          v-for="(req, index) in paginatedItems"
          :key="index"
          class="h-20 odd:bg-white even:bg-gray-100"
      >
        <td class="py-2 px-4">
          {{ (currentPage - 1) * pageSize + index + 1 }}
        </td>
        <td class="py-2 px-4">{{ req.name }}</td>
        <td class="py-2 px-4">{{ timeRequest(req.created_at) }}</td>
        <td class="py-2 px-4">{{ dateRequest(req.created_at) }}</td>
        <td class="py-2 px-4">
          <template v-if="!req.schools.some(school => school.pivot.status === 1)">
            <template v-if="req.schools.some(school => school.pivot.status === -1)">
              <span class="text-gray-600">قيد الانتظار</span>
            </template>
            <template v-else-if="req.schools.every(school => school.pivot.status === 0)">
              <span class="text-red-600">تم الرفض</span>
            </template>
          </template>
          <template v-else>
            <span class="text-green-600">تم القبول</span>
          </template>
        </td>
        <td class="py-2 px-4 relative" v-if="req.schools.some(school => school.pivot.status === 1) || req.schools.every(school => school.pivot.status === 0)">
          <router-link
              :to="infoRoute(req.id)"
              class="bg-[#4d394d] text-white px-5 py-3 rounded-md font-bold"
          >التفاصيل</router-link
          >
        </td>
        <td class="py-2 px-4 relative" v-else>
          <img
              class="block m-auto w-9 cursor-pointer"
              :class="{ active: showInfo === index }"
              src="../../../assets/Logo/Info.png"
              alt=""
              @click="toggleShowInfo(index)"
          />
          <div class="bg-white" v-if="showInfo === index">
            <ul
                class="absolute rounded-xl text-customDarkPurple sm:flex sm:flex-col sm:top-5 sm:left-40 left-20 z-50 bg-white"
            >
              <li
                  class="py-1 px-6 border-2 border-customSearch hover:bg-customBGCards cursor-pointer"
              >
                <router-link :to="infoRoute(req.id)"
                >التفاصيل
                </router-link
                >
              </li>
              <li
                  class="py-2 px-6 border-2 border-customSearch hover:bg-customBGCards cursor-pointer"

              >
                <router-link :to="editRoute(req.id)"
                >تعديل
                </router-link
                >
              </li>
              <li
                  class="py-2 px-6 border-2 border-customSearch hover:bg-customBGCards cursor-pointer"
                  @click="confirm = true"

              >
                حذف
              </li>
            </ul>
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
                      @click="handleDeleteSchool(req.id)"
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
  <Pagination
      :show="items.length===0"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :nextPage="nextPage"
      :prevPage="prevPage"

  />
</template>
<script>
import axios from "axios";
import {mapActions} from "vuex";

export default {
  props: ["items", "editRoute", "infoRoute"],
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
    infoRoute(index) {
      return `${this.infoRoute}/${index}`;
    },
    editRoute(index) {
      return `${this.editRoute}/${index}`;
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
    timeRequest(time){
      const dateTime = new Date(time);
      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Month is zero-based
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
    toggleShowInfo(index) {
      if (this.showInfo === index) {
        this.showInfo = null;
      } else {
        this.showInfo = index;
      }
    },
    handleDeleteSchool(id) {
      this.$emit("delete-request", id);
      this.showInfo = null;
      this.confirm = false;
    },
    closeActionWindow(event) {
      if (!this.$refs.tableBody.contains(event.target)) {
        this.showInfo = null;
      }
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
