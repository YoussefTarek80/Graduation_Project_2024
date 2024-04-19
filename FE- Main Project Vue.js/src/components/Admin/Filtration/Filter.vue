<!-- FilterComponent.vue -->
<template>
    <div class="bg-customSearch shadow-2xl flex flex-col items-center justify-around p-5 mt-6 rounded-xl">
        <div class="relative w-full mb-6" v-if="nationalIDS">
            <input type="text" placeholder="بحث بالرقم القومي" class="p-3 w-full rounded-2xl" v-model="search_words" />
            <i v-if="!search_status" class="fa-thin fa-magnifying-glass absolute left-5 top-4"></i>
            <loading_Search :show="search_status" class="absolute left-5 top-0"></loading_Search>
        </div>
        <div class="grid sm:grid-cols-2 grid-cols-1 w-full gap-6">
            <div class="relative" v-if="Search">
                <input type="text" placeholder="بحث" class="p-3 w-full rounded-2xl" v-model="search_words" />
                <i v-if="!search_status" class="fa-thin fa-magnifying-glass absolute left-5 top-4"></i>
                <loading_Search :show="search_status" class="absolute left-5 top-0"></loading_Search>
            </div>
            <div class="custom-select relative" v-if="!Search">
                <select v-model="selectedSchool" @change="selectSchool"
                    class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
                    <option disabled selected>اختيار مدرسة</option>
                    <option value="ascending" v-for="school in schools" :key="school.id">
                        {{ school.name }}
                    </option>
                </select>
                <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                    <i class="fa-light fa-school mx-4"></i>
                </div>
            </div>
            <div class="custom-select relative">
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
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
    props: {
        filteredArray: {
            type: Array,
            required: true,
        },
        MainArray: {
            type: Array,
            required: true,
        },
        nationalIDS: {
            type: Boolean,
            required: true,
        },
        Search: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            selectedSortOption: "ترتيب",
            selectedSchool: "اختيار مدرسة",
            search_words: "",
            search_status: false,
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
                    const filteredResults = this.filteredArray.filter(
                        (item) =>
                            item.name
                                .includes(this.search_words.toLowerCase())
                    );
                    this.$emit("filter", filteredResults);
                } else {
                    this.$emit("filter", this.MainArray);
                }
            }, 1500);
        },
    },
    computed: {
        ...mapGetters(["schools", "fetchSchoolsStatus"]),
    },
    created() {
        this.fetchData()
    },
    methods: {
        ...mapActions(["fetchSchools"]),
        async fetchData() {
            try {
                await this.fetchSchools();
            } catch (err) {
                console.error(err);
            }
        },
        selectSchool() { },
        handleSort() {
            if (this.selectedSortOption === "ascending") {
                this.Sort_ascending();
            } else if (this.selectedSortOption === "descending") {
                this.Sort_descending();
            }
        },
        Sort_ascending() {
            this.filteredArray.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        },
        Sort_descending() {
            this.filteredArray.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
        },
    },
};
</script>
