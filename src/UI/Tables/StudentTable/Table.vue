<template>
    <div class="sm:overflow-hidden overflow-auto">
        <table class="sm:w-full sm:my-20 mt-9 sm:text-lg text-sm">
            <thead class="text-white">
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tr-2xl">
                    التسلسل
                </th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">اسم المدرسة</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">اسم الادارة</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">اسم الطالب</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">الرقم القومي</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tl-2xl">
                    الاجراء
                </th>
            </thead>
            <tbody class="text-center relative" ref="tableBody">
                <tr
                    v-for="(item, index) in paginatedItems"
                    :key="index"
                    class="h-20 odd:bg-white even:bg-gray-100"
                >
                    <td class="py-2 px-4">
                        {{ (currentPage - 1) * pageSize + index + 1 }}
                    </td>
                    <td class="py-2 px-4">{{ item.schoolname }}</td>
                    <td class="py-2 px-4">{{ item.schoolAdminstration }}</td>
                    <td class="py-2 px-4">{{ item.name }}</td>
                    <td class="py-2 px-4 relative">
                        {{ item.nationalID }}
                    </td>
                    <td class="py-2 px-4 relative">
                        <router-link :to="infoRoute(index)"  class="bg-[#4d394d] text-white px-5 py-3 rounded-md font-bold">التفاصيل</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :nextPage="nextPage"
        :prevPage="prevPage"
    />
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
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
