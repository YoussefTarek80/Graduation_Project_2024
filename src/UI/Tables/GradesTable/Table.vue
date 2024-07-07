<template>
    <div class="sm:overflow-hidden overflow-auto">
        <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
            <BaseTeleport :show="success">
                <div class="flex flex-col">
                    <span class="text-green-700 text-4xl">
                        تم تعديل درجة الطالب : {{ this.updatedStud }}</span>
                    <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
                </div>
            </BaseTeleport>
            <BaseTeleport :show="failed">
                <div class="flex flex-col">
                    <span class="text-red-700 text-4xl" v-if="this.response == 400">
                        فشل التعديل: الطالب لم يجتاز مواد الترم الأول
                    </span>
                    <i class="fa-sharp fa-solid fa-badge-check text-red-700 text-7xl m-3"></i>
                </div>
            </BaseTeleport>
        </section>

        <div v-if="paginatedItems.length === 0" class="inline-block m-auto w-full">
            <p class="text-center m-5 mt-10 p-5 text-customPurple font-bold text-2xl">لا يوجد طلاب مُسجلين بالمادة حتي
                الأن... </p>
        </div>
        <table v-else class="sm:w-full sm:my-20 mt-9 sm:text-lg text-sm">
            <thead class="text-white">
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tr-2xl">
                    التسلسل
                </th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">إسم الطالب</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">كود الطالب</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">الدرجة</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tl-2xl">الإجراء</th>
            </thead>
            <tbody class="text-center relative" ref="tableBody">
                <tr v-for="(item, index) in  paginatedItems " :key="index" class="h-20 odd:bg-white even:bg-gray-100">
                    <td class="py-2 px-4">
                        {{ (currentPage - 1) * pageSize + index + 1 }}
                    </td>
                    <td class="py-2 px-4">{{ item.name }}</td>
                    <td class="py-2 px-4">{{ item.national_id }}</td>
                    <td class="py-2 px-4"><input type="text" class="text-center" :disabled="!item.is_edit"
                            placeholder="-" v-model="item.score"></td>
                    <td class="py-2 px-4">
                        <button class="text-customPurple underline" v-if="!item.is_edit" @click="editItem(item)">
                            تعديل</button>
                        <button class="text-customPurple underline" v-else @click="saveItem(item)">حفظ</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :nextPage="nextPage" :prevPage="prevPage" />
</template>
<script>
import axios from "axios"
import { mapGetters, mapActions } from 'vuex';
export default {
    props: ["items"],
    data() {
        return {
            id: this.$route.params.id,
            updatedStud: "",
            showInfo: null,
            currentPage: 1,
            pageSize: 5,
            score: 0,
            response: "",
            confirm: false,
            success: false,
            failed: false,
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
            console.log(item.score);
            item.is_edit = true;
            this.updatedStud = item.name;
        },
        async saveItem(item) {
            console.log(item.score);
            await this.updateGrade(item.id, this.id, item.score);
            item.is_edit = false;
        },
        async updateGrade(student_id, term_subject, score) {
            try {
                console.log(student_id, term_subject, score)
                const form = new FormData();
                form.append('score', score);
                const token = localStorage.getItem('token');
                this.response = await axios.post(`http://127.0.0.1:8000/api/school/addStudentScore/${student_id}/${term_subject}`,
                    form, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                this.success = true;
                setTimeout(() => {
                    this.success = false;
                }, 2500);
            }
            catch (err) {
                console.log(err);
                this.response = err.response.status;
                this.failed = true;
                setTimeout(() => {
                    this.failed = false;
                }, 2500);
            }
        }
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
