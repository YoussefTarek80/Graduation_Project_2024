<template>
    <div class="bg-customSearch shadow-2xl w-full grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 mt-6 rounded-xl">

        <div class="relative w-full" v-if="request">
            <input type="text" placeholder="بحث بأسم المُرسل..." class="p-3 w-full rounded-2xl"
                v-model="search_words" />
            <i v-if="!search_status" class="fa-thin fa-magnifying-glass absolute left-5 top-4"></i>
            <loading_Search :show="search_status" class="absolute left-5 top-0"></loading_Search>
        </div>

        <div class="relative col-span-1 sm:col-span-3  m-2" v-else>
            <input type="text" v-if="national_id" placeholder="بحث بالرقم القومي... " class="p-3 w-full rounded-2xl"
                v-model="search_words" />
            <input type="text" v-else-if="!national_id" placeholder="بحث بالأسم..." class="p-3 w-full rounded-2xl"
                v-model="search_words" />
            <i v-if="!search_status" class="fa-thin fa-magnifying-glass absolute left-5 top-4"></i>
            <loading_Search :show="search_status" class="absolute left-5 top-0"></loading_Search>
        </div>

        <div class="col-span-1 sm:col-span-1 m-2" v-if="!request">
            <div class="custom-select relative">
                <select v-model="selectedSortOption" @change="handleSort"
                    class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
                    <option class="font-medium" :value="selectedSortOption" disabled selected>ترتيب</option>
                    <option class="font-medium" value="ascending">تصاعديا</option>
                    <option class="font-medium" value="descending">تنازليا</option>
                </select>
                <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                    <i class="fa-duotone fa-sort mx-4"></i>
                </div>
            </div>
        </div>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6" v-else>
            <div class="custom-select relative w-full">
                <select v-model="selectedRequestType" @change="show"
                    class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
                    <option :value="selectedRequestType" disabled selected> ترتيب علي حسب نوع الطلب</option>
                    <option>الكل</option>
                    <option value="Transfer">تحويل طالب</option>
                    <option value="Register">تسجيل طالب </option>
                    <option value="Query">استسفار دراسي</option>
                </select>
                <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                    <i class="fa-duotone fa-sort mx-4"></i>
                </div>
            </div>
            <div class="w-full">
                <div class="custom-select relative">
                    <select v-model="selectedSortOption" @change="handleSort"
                        class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
                        <option :value="selectedSortOption" disabled selected>ترتيب</option>
                        <option value="ascending">تصاعديا</option>
                        <option value="descending">تنازليا</option>
                    </select>
                    <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                        <i class="fa-duotone fa-sort mx-4"></i>
                    </div>
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
        national_id: {
            type: Boolean,
            required: true,
        },
        teacher: {
            type: Boolean,
            required: true,
        },
        request: {
            type: Boolean,
            required: true,
        },
        event: {
            type: Boolean,
            required: true,
        },
        controller: {
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
    watch: {
        search_words() {
            this.search_status = true;
            setTimeout(() => {
                this.search_status = false;
            }, 1500);
            setTimeout(() => {
                if (this.search_words) {
                    if (this.national_id) {
                        const filteredResults = this.MainArray.filter(
                            (item) => item.national_id.match(this.search_words.toLowerCase()));
                        this.$emit("filter", filteredResults);
                    }
                    else if (this.teacher) {
                        const filteredResults = this.MainArray.filter(
                            (item) => item.name.includes(this.search_words.toLowerCase()));
                        this.$emit("filter", filteredResults);
                    }
                    else if (this.request) {
                        const filteredResults = this.MainArray.filter(
                            (item) => item.parentName.includes(this.search_words.toLowerCase()));
                        this.$emit("filter", filteredResults);
                    }
                    else if (this.event) {
                        const filteredResults = this.MainArray.filter(
                            (item) => item.name.includes(this.search_words.toLowerCase()));
                        this.$emit("filter", filteredResults);
                    }
                    else if (this.controller) {
                        const filteredResults = this.MainArray.filter(
                            (item) => item.name.includes(this.search_words.toLowerCase()));
                        this.$emit("filter", filteredResults);
                    }
                } else {
                    this.$emit("filter", this.MainArray);
                }
            }, 1500);
        },
    },
    created() {
    },
    methods: {
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
