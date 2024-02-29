<template>
    <table
        class="sm:w-full border-collapse border border-gray-200 mt-9 rounded-lg sm:text-lg text-sm"
    >
        <thead class="text-white">
            <th class="sm:py-5 sm:px-4 rounded-tr-2xl">التسلسل</th>
            <th class="sm:py-5 sm:px-4">اسم المدرسة</th>
            <th class="sm:py-5 sm:px-4">الادارة</th>
            <th class="sm:py-5 sm:px-4">الحالة</th>
            <th class="sm:py-5 sm:px-4 rounded-tl-2xl">الاجراء</th>
        </thead>
        <tbody class="text-center relative">
            
            <tr v-for="(item, index) in items" :key="index">
                <td class="py-2 px-4">{{ index + 1 }}</td>
                <td class="py-2 px-4">{{ item.schoolName }}</td>
                <td class="py-2 px-4">{{ item.management }}</td>
                <td class="py-2 px-4">{{ item.status }}</td>
                <td class="py-2 px-4 relative">
                    <img
                        class="block m-auto w-9 cursor-pointer"
                        src="../assets/Logo/Info.png"
                        alt=""
                        @click="toggleShowInfo(index)"
                    />
                    <div
                        class="absolute bg-white sm:w-56 w-24 top-2 sm:-right-20 -right-24  z-50 "
                        v-if="showInfo === index"
                    >
                        <ul class="rounded-xl text-customDarkPurple sm:flex ">
                            <li
                                class="py-2 px-6  border-2 border-customSearch hover:bg-customBGCards cursor-pointer"
                            >
                                <router-link :to="infoRoute(index)"
                                    >التفاصيل</router-link
                                >
                            </li>
                            <li
                                class="py-2 px-6 border-2 border-customSearch hover:bg-customBGCards cursor-pointer"
                            >
                                <router-link :to="editRoute(index)"
                                    >تعديل</router-link
                                >
                            </li>
                            <li
                                class="py-2 px-6 border-2 border-customSearch hover:bg-customBGCards cursor-pointer"
                                @click="deleteItem(index)"
                            >
                                حذف
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props: ["items", "editRoute","infoRoute"],
    data() {
        return {
            showInfo: null,

        };
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
        deleteItem(index) {
            this.items.splice(index, 1);
            this.showInfo = null;
        },
    },
};
</script>
<style scoped>
thead {
    background: linear-gradient(to left, #e546e8, #4d394d);
}
</style>
