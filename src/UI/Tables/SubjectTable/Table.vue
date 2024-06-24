<template>
    <div class="sm:overflow-hidden overflow-auto">
        <table class="sm:w-full sm:text-lg text-sm ">
            <thead class="text-white">
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tr-2xl">
                    التسلسل
                </th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">اسم المادة</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tl-2xl">المنهج </th>
            </thead>
            <tbody class="text-center relative " ref="tableBody">
                <tr v-for="(item, index) in paginatedItems" :key="index" class="h-20 odd:bg-white even:bg-gray-100">
                    <td class="py-2 px-4">
                        {{ (currentPage - 1) * pageSize + index + 1 }}
                    </td>
                    <td class="py-2 px-4">{{ item.subject }} </td>
                    <td class="py-2 px-4">
                    <td class="py-2 px-4 relative">
                        <router-link :to="infoRoute(index)"
                            class="bg-[#4d394d] text-white px-5 py-3 rounded-md font-bold">التفاصيل</router-link>
                    </td>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination :currentPage="currentPage" :totalPages="totalPages" :nextPage="nextPage" :prevPage="prevPage" />
    </div>
</template>
<script>
// import Loading_info2 from "../../loadingInformation/loading_info2.vue";
export default {
    // components: { Loading_info2 },
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
            return `/School/Services/Subjects/SubjectInfo/${index}`;
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