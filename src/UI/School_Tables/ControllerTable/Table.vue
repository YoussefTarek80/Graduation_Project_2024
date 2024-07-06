<template>
    <div class="sm:overflow-hidden overflow-auto">

        <div v-if="paginatedItems.length === 0" class="inline-block m-auto w-full">
            <p class="text-center m-5 mt-10 p-5 text-customPurple font-bold text-2xl">لا يوجد مسؤولين حتي الأن... </p>
        </div>
        <table v-else class="sm:w-full sm:my-20 mt-9 sm:text-lg text-sm">
            <thead class="text-white">
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tr-2xl">
                    التسلسل
                </th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">إسم المسؤول</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">الدور الوظيفي</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tl-2xl">
                    الاجراء
                </th>
            </thead>
            <tbody class="text-center relative" ref="tableBody">
                <tr v-for="(item, index) in paginatedItems" :key="index" class="h-20 odd:bg-white even:bg-gray-100">
                    <td class="py-2 px-4">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td class="py-2 px-4">{{ item.staff_name }}</td>
                    <td class="py-2 px-4">{{ item.staff_role }}</td>
                    <td class="py-2 px-4 relative">
                        <img class="block m-auto w-9 cursor-pointer" :class="{ active: showInfo === index }"
                            src="../../../assets/Logo/Info.png" alt="" @click="toggleShowInfo(index)" />
                        <div class="bg-white" v-if="showInfo === index">
                            <ul
                                class="absolute rounded-xl text-customDarkPurple sm:flex sm:flex-col sm:top-5 sm:left-32 left-20 z-50 bg-white">
                                <li
                                    class="py-1 px-6 border-2 border-customSearch hover:bg-customBGCards cursor-pointer">
                                    <router-link :to="infoRoute(item.id)">التفاصيل
                                    </router-link>
                                </li>
                                <li
                                    class="py-2 px-6 border-2 border-customSearch hover:bg-customBGCards cursor-pointer">
                                    <router-link :to="editRoute(item.id)">تعديل
                                    </router-link>
                                </li>
                                <li class="py-2 px-6 border-2 border-customSearch hover:bg-customBGCards cursor-pointer"
                                    @click="confirm = true">
                                    حذف
                                </li>
                            </ul>
                            <BaseTeleport :show="confirm">
                                <div class="flex flex-col">
                                    <span class="text-red-700 text-4xl">
                                        تاكيد الحذف
                                    </span>
                                    <div class="flex items-center justify-around mt-10">
                                        <button class="w-96" @click="handleDeleteController(item.id)">
                                            تاكيد
                                        </button>
                                        <button class="w-52" @click="confirm = false">
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
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :nextPage="nextPage" :prevPage="prevPage" />
</template>
<script>
import axios from "axios"
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
        toggleShowInfo(index) {
            if (this.showInfo === index) {
                this.showInfo = null;
            } else {
                this.showInfo = index;
            }
        },
        handleDeleteController(id) {
            this.$emit("delete-controller", id);
            this.showInfo = null;
            this.confirm = false;
        },
        closeActionWindow(controller) {
            if (!this.$refs.tableBody.contains(controller.target)) {
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