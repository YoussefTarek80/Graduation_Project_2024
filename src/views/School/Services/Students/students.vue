<template>
    <sc-navbar-comp></sc-navbar-comp>
    <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex flex-col">
            <span class="sm:text-3xl text-2xl">قائمة الطلاب</span>
            <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
        </div>
        <div class="bg-customSearch shadow-2xl flex flex-col items-center justify-around p-5 mt-6 rounded-xl">
            <div class="relative w-full mb-6">
                <input type="text" placeholder="بحث بالرقم القومي" class="p-3 w-full rounded-2xl"
                    v-model="search_words" />
                <i v-if="!search_status" class="fa-thin fa-magnifying-glass absolute left-5 top-4"></i>
                <laoding_Search :show="search_status" class="absolute left-5 top-0"></laoding_Search>
            </div>
            <div class="grid sm:grid-cols-2 grid-cols-1 w-full gap-6">
                <div class="custom-select relative ">
                    <select v-model="selectedSortOption" @change="handleSort"
                        class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
                        <option disabled selected>ترتيب</option>
                        <option value="ascending">تصاعديا</option>
                        <option value="descending">تنازليا</option>
                    </select>
                    <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                        <i class="fa-duotone fa-sort mx-4"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative">
            <table_Component :items="filtered_Array" :infoRoute="'/School/Services/Students/InfoStudent'">
            </table_Component>
        </div>
    </section>

    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from "../../../../UI/Tables/StudentTable/Table.vue";

export default {
    components: { table_Component },
    inject: ['students'],
    data() {
        return {
            selectedSortOption: "ترتيب",
            search_words: "",
            search_status: false,
            schools: [
                {
                    id: 1,
                    schoolname: "السعيدية",
                    schoolAdminstration: "الجيزة",
                    nationalID: "024144657498798354",
                },
                {
                    id: 2,
                    schoolname: "الهرم",
                    schoolAdminstration: "الجيزة",
                    nationalID: "1",
                },
            ],
            options: [
                {
                    option: "تصاعدي",
                },
                {
                    option: "تنازلي",
                },
            ],
            filtered_Array: [],
        };
    },
    watch: {
        search_words() {
            this.search_status = true;
            setTimeout(() => {
                this.search_status = false;
            }, 1500);
            setTimeout(() => {
                if (this.search_words) {
                    this.filtered_Array = this.Students.filter((item) => {
                        return (
                            item.nationalID &&
                            item.nationalID
                                .toLowerCase()
                                .includes(this.search_words.toLowerCase())
                        );
                    });
                } else {
                    this.filtered_Array = this.Students;
                }
            }, 1500);
        },
    },
    created() {
        this.filtered_Array = this.students;
    },
    methods: {
        selectSchool() {

        },
        handleSort() {
            if (this.selectedSortOption === "ascending") {
                this.Sort_ascending();
            } else if (this.selectedSortOption === "descending") {
                this.Sort_descending();
            }
        },
        Sort_ascending() {
            this.Students.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        },
        Sort_descending() {
            this.Students.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
        },
    },
};
</script>
