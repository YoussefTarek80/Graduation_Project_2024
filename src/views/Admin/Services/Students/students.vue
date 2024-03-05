<template>
    <Navbar_Component></Navbar_Component>
    <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex flex-col">
            <span class="sm:text-3xl text-2xl">قائمة الطلاب</span>
            <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
        </div>
        <div
            class="bg-customSearch shadow-2xl flex items-center justify-around p-5 mt-6 rounded-xl flex-wrap sm:space-y-0 space-y-6"
        >
            <div class="custom-select relative sm:w-3/12 w-10/12">
                <select
                    v-model="selectedSchool"
                    @change="handleSort"
                    class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple"
                >
                    <option disabled selected>اختار المدرسة</option>
                    <option value="ascending">تصاعديا</option>
                    <option value="descending">تنازليا</option>
                </select>
                <div
                    class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none"
                >
                    <i class="fa-regular fa-angle-down"></i>
                </div>
            </div>
            <div class="custom-select relative sm:w-3/12 w-10/12">
                <select
                    v-model="selectedSortOption"
                    @change="handleSort"
                    class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple"
                >
                    <option disabled selected>ترتيب</option>
                    <option value="ascending">تصاعديا</option>
                    <option value="descending">تنازليا</option>
                </select>
                <div
                    class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none"
                >
                    <i class="fa-duotone fa-sort mx-4"></i>
                </div>
            </div>
        </div>
        <div class="relative">
            <table_Component
                :items="Students"
                :infoRoute="'/Admin/Students/InfoStudent'"
            ></table_Component>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from "../../../../UI/Tables/StudentTable/Table.vue";
export default {
    components: { table_Component },
    data() {
        return {
            selectedSortOption: "ترتيب",
            selectedSchool: "اختار المدرسة",
            Students: [
                {
                    id: 1,
                    schoolname: "السعيدية",
                    schoolAdminstration: "الجيزة",
                    name: "احمد حسام",
                    nationalID: "024144657498798354",
                },
                {
                    id: 2,
                    schoolname: "الهرم",
                    schoolAdminstration: "الجيزة",
                    name: " كريم طارق",
                    nationalID: "024144657498798354",
                },
            ],
        };
    },
    methods: {
        handleSort() {
            if (this.selectedSortOption === "ascending") {
                this.Sort_ascending();
            } else if (this.selectedSortOption === "descending") {
                this.Sort_descending();
            }
        },
        Sort_ascending() {
            this.filtered_Array.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        },
        Sort_descending() {
            this.filtered_Array.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
        },
    },
};
</script>
