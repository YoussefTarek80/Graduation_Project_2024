<template>
    <div class="sm:overflow-hidden overflow-auto">
        <div v-if="paginatedItems.length === 0" class="inline-block m-auto w-full">
            <p class="text-center m-5 mt-10 p-5 text-customPurple font-bold text-2xl">
                لا يوجد طلبات حتي الأن... </p>
        </div>
        <table v-else class="sm:w-full sm:my-20 mt-9 sm:text-lg text-sm">
            <thead class="text-white">
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tr-2xl">
                    رقم الطلب
                </th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">إسم مُرسِل الطلب</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">نوع الطلب</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">حالة الطلب</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tl-2xl">
                    الاجراء
                </th>
            </thead>
            <tbody class="text-center relative" ref="tableBody" v-if="this.reqtype == 'تقديم'">
                <tr v-for="(item, index) in paginatedItems" :key="index" class="h-20 odd:bg-white even:bg-gray-100">
                    <td class="py-2 px-4" v-if="item.type == 'تسجيل'"> {{ (currentPage - 1) * pageSize + index + 1 }}
                    </td>
                    <td class="py-2 px-4" v-if="item.type == 'تسجيل'">{{ item.name }}</td>
                    <td class="py-2 px-4" v-if="item.type == 'تسجيل'">{{ item.type }}</td>
                    <td class="py-2 px-4 text-red-400" v-if="item.type == 'تسجيل' && item.request_status === -1">لم يتم
                        الرد
                    </td>
                    <td class="py-2 px-4 text-green-500" v-if="item.type == 'تسجيل' && item.request_status === 1">تم
                        قبول الطلب
                    </td>
                    <td class="py-2 px-4 relative" v-if="item.type == 'تسجيل'">
                        <router-link :to="infoRoute(item.id)"
                            class="bg-[#4d394d] text-white px-5 py-3 rounded-md font-bold">التفاصيل</router-link>
                    </td>
                </tr>
            </tbody>
            <tbody class="text-center relative" ref="tableBody" v-if="this.reqtype == 'تحويل'">
                <tr v-for="(item, index) in paginatedItems" :key="index" class="h-20 odd:bg-white even:bg-gray-100">
                    <td class="py-2 px-4" v-if="item.type != 'تسجيل'">{{ (currentPage - 1) * pageSize + index + 1 }}
                    </td>
                    <td class="py-2 px-4" v-if="item.type != 'تسجيل'">{{ item.name }}</td>
                    <td class="py-2 px-4" v-if="item.type != 'تسجيل' && item.new_school == GetUser2.school_id">تحويل إلي
                        مدرستي
                    </td>
                    <td class="py-2 px-4" v-else-if="item.type != 'تسجيل' && item.old_school == GetUser2.school_id">
                        تحويل إلي مدرسة أخري
                    </td>
                    <td class="py-2 px-4 text-gray-500" v-if="item.type != 'تسجيل' && item.status == -1"> قيد
                        الإنتظار...</td>
                    <td class="py-2 px-4 text-gray-500"
                        v-else-if="item.type != 'تسجيل' && item.status == 1 && item.new_school == GetUser2.id">
                        في إنتظار حذف الطالب من المدرسة القديمة
                    </td>
                    <td class="py-2 px-4 text-gray-500"
                        v-else-if="item.type != 'تسجيل' && item.status == 1 && item.old_school == GetUser2.id">
                        معلق للتأكيد علي التحويل
                    </td>
                    <td class="py-2 px-4 text-red-500" v-else-if="item.type != 'تسجيل' && item.status == 0">
                        تم الرفض
                    </td>
                    <td class="py-2 px-4 text-green-400" v-else-if="item.type != 'تسجيل' && item.status == 2">
                        تمت الموافقة
                    </td>
                    <td class="py-2 px-4 relative" v-if="item.type != 'تسجيل'">
                        <router-link :to="infoRoute(item.id)"
                            class="bg-[#4d394d] text-white px-5 py-3 rounded-md font-bold">التفاصيل</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :nextPage="nextPage" :prevPage="prevPage" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: ["items", "infoRoute", "reqtype", 'transferReqState'],
    data() {
        return {
            showInfo: null,
            currentPage: 1,
            pageSize: 5,
            confirm: false,
            clickable: false,
        }
    },
    created() {
        console.log(this.reqtype);
        console.log(this.paginatedItems);
    },
    computed: {
        ...mapGetters(['GetUser2']),
        totalPages() {
            return Math.ceil(this.items.length / this.pageSize);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.items.slice(startIndex, endIndex);
        },
        check() {
            if (this.paginatedItems.length === 0) {
                return true;
            }
            else if (this.paginatedItems.length > 0) {
                return false;
            }
        }
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
