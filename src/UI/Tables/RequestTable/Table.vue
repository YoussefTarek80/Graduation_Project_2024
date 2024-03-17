<template>
    <div class="sm:overflow-hidden overflow-auto">
        <table class="sm:w-full sm:my-20 mt-9 sm:text-lg text-sm">
            <thead class="text-white">
                <th class="sm:py-5 sm:px-4 px-7 py-3 rounded-tr-2xl">
                    رقم الطلب
                </th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">الموضوع</th>
                <th class="sm:py-5 sm:px-4 px-7 py-3">اسم المدرسة</th>
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
                        <router-link
                            :to="infoRoute(index)"
                            class="bg-[#4d394d] text-white px-5 py-3 rounded-md font-bold"
                            >التفاصيل</router-link
                        >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
@import url("../../../UI/CustomsCss/Custombutton.css");
@import url("../../../UI/Tables/table.css");
</style>
