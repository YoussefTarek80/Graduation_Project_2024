<template>
    <Navbar_Component></Navbar_Component>
    <section class="m-5" data-aos="fade-up" data-aos-duration="2000">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة المدارس</span>
                <i
                    class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
                ></i>
            </div>
            <button
                class="sm:w-80 flex justify-around items-center"
                @click="this.$router.push('/Admin/Schools/addSchool')"
            >
                <span class="sm:text-xl text-lg">اضافة مدرسة جديدة</span>
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <div
            class="bg-customSearch flex items-center justify-around p-5 mt-6 rounded-xl flex-wrap sm:space-y-0 space-y-6"
        >
            <div class="relative sm:w-3/12 w-10/12">
                <input
                    type="text"
                    placeholder="بحث"
                    class="p-3 w-full rounded-2xl"
                    v-model="search_words"
                />
                <i
                    v-if="!search_status"
                    class="fa-thin fa-magnifying-glass absolute left-5 top-4"
                ></i>
                <laoding_Search
                    :show="search_status"
                    class="absolute left-5 top-0"
                ></laoding_Search>
            </div>
            <div class="custom-select relative sm:w-3/12 w-10/12">
                <select
                    v-model="selectedSortOption"
                    @change="handleSort"
                    class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple"
                >
                    <option  disabled selected >ترتيب</option>
                    <option value="ascending">تصاعديا</option>
                    <option value="descending">تنازليا</option>
                </select>
                <div
                    class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none"
                >
                    <i class="fa-regular fa-angle-down"></i>
                </div>
            </div>
        </div>

        <div class="relative">
            <table_Component
                :items="filtered_Array"
                :editRoute="'/Admin/Schools/updateSchool'"
                :infoRoute="'/Admin/Schools/InfoSchool'"
            ></table_Component>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from "../../../../UI/Table.vue";
export default {
    components: { table_Component },
    inject: ["items"],

    data() {
        return {
            showInfo: false,
            filtered_Array: [],
            search_words: "",
            search_status: false,
            selectedSortOption:'ترتيب',
        };
    },
    created() {
        this.filtered_Array = this.items;
    },
    watch: {
        search_words() {
            this.search_status = true;
            setTimeout(() => {
                this.search_status = false;
            }, 1500);
            setTimeout(() => {
                if (this.search_words) {
                    this.filtered_Array = this.items.filter((item) => {
                        return (
                            item.schoolName &&
                            item.schoolName
                                .toLowerCase()
                                .includes(this.search_words.toLowerCase())
                        );
                    });
                } else {
                    this.filtered_Array = this.items;
                }
            }, 1500);
        },
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
                return a.schoolName.localeCompare(b.schoolName);
            });
        },
        Sort_descending() {
            this.filtered_Array.sort((a, b) => {
                return b.schoolName.localeCompare(a.schoolName);
            });
        },
    },
};
</script>

<style scoped>
@import url("./schools.css");
@import url("../../../../UI/Custombutton.css");
</style>
