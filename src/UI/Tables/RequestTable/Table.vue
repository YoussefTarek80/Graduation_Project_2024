<template>
    <div class="sm:overflow-hidden overflow-auto">
        <table class="sm:w-full sm:my-20 mt-9 sm:text-lg text-sm">
            <thead class="text-white">
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tr-2xl">
                    رقم الطلب
                </th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">إسم مُرسِل الطلب</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">نوع الطلب</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tl-2xl">
                    الاجراء
                </th>
            </thead>
            <tbody class="text-center relative" ref="tableBody">
                <tr v-for="(item, index) in paginatedItems" :key="index" class="h-20 odd:bg-white even:bg-gray-100">
                    <td class="py-2 px-4">
                        {{ (currentPage - 1) * pageSize + index + 1 }}
                    </td>
                    <td class="py-2 px-4">{{ item.parentName }}</td>
                    <td class="py-2 px-4">{{ item.type }}</td>
                    <td class="py-2 px-4 relative">
                        <router-link :to="infoRoute(index)"
                            class="bg-[#4d394d] text-white px-5 py-3 rounded-md font-bold">التفاصيل</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :nextPage="nextPage" :prevPage="prevPage" />
</template>

<script>
export default {
    props: ["items", "infoRoute"],
    data() {
        return {
            showInfo: null,
            currentPage: 1,
            pageSize: 5,
            confirm: false,
            clickable: false,
        }
    },
    created() { },
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
    },
    components: {}
}
</script>

<style scoped>
@import url("../../../UI/CustomsCss/Custombutton.css");
@import url("../../../UI/Tables/table.css");
</style>
