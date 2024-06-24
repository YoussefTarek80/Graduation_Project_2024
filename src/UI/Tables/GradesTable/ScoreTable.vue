<template>
    <div class="sm:overflow-hidden overflow-auto">
        <table class="sm:w-full sm:my-20 mt-9 sm:text-lg text-sm">
            <thead class="text-white">
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tr-2xl">
                    التسلسل
                </th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">إسم المادة</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">الصف الدراسي </th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">الفصل الدراسي </th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">أعمال السنة</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">درجة الإمتحان</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">الدرجة النهائية</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tl-2xl">الإجراء</th>
            </thead>
            <tbody class="text-center relative" ref="tableBody">
                <tr v-for="(item, index) in  paginatedItems " :key="index" class="h-20 odd:bg-white even:bg-gray-100">
                    <td class="py-2 px-4">
                        {{ (currentPage - 1) * pageSize + index + 1 }}
                    </td>
                    <td class="py-2 px-4">{{ item.subjname }}</td>
                    <td class="py-2 px-4">{{ item.level }}</td>
                    <td class="py-2 px-4">{{ item.class }}</td>
                    <td class="py-2 px-4"><input type="text" :disabled="!item.isEdit" v-model="item.worksheet"></td>
                    <td class="py-2 px-4"><input type="text" :disabled="!item.isEdit" v-model="item.examscore"></td>
                    <td class="py-2 px-4"><input type="text" disabled v-model="item.total"></td>
                    <td class="py-2 px-4">
                        <button class="text-customPurple underline" v-if="!item.isEdit"
                            @click="editItem(item)">تعديل</button>
                        <button class="text-customPurple underline" v-else @click="saveItem(item)">حفظ</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :nextPage="nextPage" :prevPage="prevPage" />
</template>
<script>
export default {
    props: ["items"],
    data() {
        return {
            showInfo: null,
            currentPage: 1,
            pageSize: 5,
            worksheet: 50,
            examscore: 45,
            fGrade: 0,
            edit: false,
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
        editItem(item) {
            item.isEdit = true;
        },
        saveItem(item) {
            item.isEdit = false;
        },
    },
};
</script>
<style scoped>
@import url("../../../UI/Tables/table.css");

input {
    border-radius: 0.75rem;
    padding: 0.84rem;
    margin-top: 0.75rem;
    font-size: 20px;
    border: 1px solid rgb(210, 208, 208);
    outline: none;
    width: 5rem;
}

table input:disabled {
    background-color: #f0f0f0;
}
</style>
