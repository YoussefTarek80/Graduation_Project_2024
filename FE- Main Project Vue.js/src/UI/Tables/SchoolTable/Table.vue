<template>
    <div class="sm:overflow-hidden overflow-auto">
        <table class="sm:w-full sm:my-20 mt-9 sm:text-lg text-sm">
            <thead class="text-white">
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tr-2xl">
                    التسلسل
                </th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">اسم المدرسة</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">شعار المدرسة</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">رقم الهاتف</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">الحالة</th>
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
                    <td class="py-2 px-4">{{ item.name }}</td>
                    <td class="py-2 px-4 sm:w-28 sm:h-28">
                        <img
                            :src="item.image"
                            alt="Null"
                            class="rounded-full"
                        />
                    </td>
                    <td class="py-2 px-4">{{ item.phone }}</td>
                    <td class="py-2 px-4">{{ HandleStatus(item.status) }}</td>
                    <td class="py-2 px-4 relative">
                        <img
                            class="block m-auto w-9 cursor-pointer"
                            :class="{ active: showInfo === index }"
                            src="../../../assets/Logo/Info.png"
                            alt=""
                            @click="toggleShowInfo(index)"
                        />
                        <div class="bg-white" v-if="showInfo === index">
                            <ul
                                class="absolute rounded-xl text-customDarkPurple sm:flex sm:flex-col sm:top-10 sm:left-32 left-10 z-50 bg-white"
                            >
                                <li
                                    class="py-2 px-6 border-2 border-customSearch hover:bg-customBGCards cursor-pointer"
                                >
                                    <router-link :to="infoRoute(item.id)"
                                        >التفاصيل</router-link
                                    >
                                </li>
                                <li
                                    class="py-2 px-6 border-2 border-customSearch hover:bg-customBGCards cursor-pointer"
                                >
                                    <router-link :to="editRoute(item.id)"
                                        >تعديل</router-link
                                    >
                                </li>
                                <li
                                    class="py-2 px-6 border-2 border-customSearch hover:bg-customBGCards cursor-pointer"
                                    @click="confirm = true"
                                >
                                    حذف
                                </li>
                            </ul>
                        </div>
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
    props: ["items", "editRoute", "infoRoute"],
    data() {
        return {
            showInfo: null,
            currentPage: 1,
            pageSize: 5,
            confirm: false,
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
        toggleShowInfo(index) {
            if (this.showInfo === index) {
                this.showInfo = null;
            } else {
                this.showInfo = index;
            }
        },
        infoRoute(index) {
            return `${this.infoRoute}/${index}`;
        },
        editRoute(index) {
            return `${this.editRoute}/${index}`;
        },
        HandleStatus(status) {
            if (status === 0) {
                return "غير مفعل";
            } else if (status === 1) {
                return "مفعل";
            } else {
                return "Unknown";
            }
        },
        handleDeleteSchool(id) {
            this.$emit("delete-school", id);
            this.showInfo = null;
            this.confirm = false;
        },
        closeActionWindow(event) {
            if (!this.$refs.tableBody.contains(event.target)) {
                this.showInfo = null;
            }
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
thead {
    background: linear-gradient(to left, #e546e8, #4d394d);
}
.active {
    filter: drop-shadow(5px 5px 2px #b00eb3);
    transition: 0.3s ease;
}
</style>
