<!-- FilterComponent.vue -->
<template>
    <div class="bg-customSearch shadow-2xl flex flex-col items-center justify-around p-5 mt-6 rounded-xl">
        <div class="relative w-full mb-6" v-if="nationalIDS">
            <input type="text" placeholder="بحث" class="p-3 w-full rounded-2xl" v-model="search_words" />
            <i v-if="!search_status" class="fa-thin fa-magnifying-glass absolute left-5 top-4"></i>
            <loading_Search :show="search_status" class="absolute left-5 top-0"></loading_Search>
        </div>
        <div class="grid sm:grid-cols-2 grid-cols-1 w-full gap-6">
            <div class="relative" v-if="Search">
                <input type="text" placeholder="بحث" class="p-3 w-full rounded-2xl" v-model="search_words" />
                <i v-if="!search_status" class="fa-thin fa-magnifying-glass absolute left-5 top-4"></i>
                <loading_Search :show="search_status" class="absolute left-5 top-0"></loading_Search>
            </div>
            <div class="custom-select relative ">
                <select v-model="selectedRequestType" @change="show"
                    class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
                    <option disabled selected> ترتيب علي حسب نوع الطلب</option>
                    <option>الكل</option>
                    <option value="Transfer">تحويل طالب</option>
                    <option value="Register">تسجيل طالب </option>
                    <option value="Query">استسفار دراسي</option>
                </select>
                <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                    <i class="fa-duotone fa-sort mx-4"></i>
                </div>
            </div>
            <div class="custom-select relative">
                <select v-model="selectedSortOption" @change="handleSort"
                    class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
                    <option disabled selected>ترتيب أبجدي</option>
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
            selectedSortOption: "ترتيب أبجدي",
            selectedRequestType: "ترتيب علي حسب نوع الطلب",
            search_words: "",
            search_status: false,
        };
    },
    watch: {},
    computed: {
    },
    created() { },
    methods: {
        handleSort() {
            if (this.selectedSortOption === "ascending") {
                this.Sort_ascending();
            } else if (this.selectedSortOption === "descending") {
                this.Sort_descending();
            }
        },
        show() {
            var newData = [...this.MainArray];
            if (this.selectedRequestType == 'Transfer') {
                newData = this.MainArray.filter(A => A.type === "تحويل");
            }
            else if (this.selectedRequestType == 'Register') {
                newData = this.MainArray.filter(A => A.type === "تسجيل");
            }
            else if (this.selectedRequestType == 'Query') {
                newData = this.MainArray.filter(A => A.type === "استفسار");
            }
            this.$emit('filter', newData);
        },
        Sort_ascending() {
            this.filteredArray.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
        },
        Sort_descending() {
            this.filteredArray.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        },
    },
};
</script>
