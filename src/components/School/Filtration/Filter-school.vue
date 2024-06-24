<template>
    <div class="bg-customSearch shadow-2xl w-full grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 mt-6 rounded-xl">

        <div class="relative w-full" v-if="request">
            <input type="text" placeholder="بحث بأسم المُرسل..." class="p-3 w-full rounded-2xl"
                v-model="search_words" />
            <i v-if="!search_status" class="fa-thin fa-magnifying-glass absolute left-5 top-4"></i>
            <loading_Search :show="search_status" class="absolute left-5 top-0"></loading_Search>
        </div>

        <div class="relative  w-full" v-else>
            <input type="text" v-if="nationalId" placeholder="بحث بالرقم القومي... " class="p-3 w-full rounded-2xl"
                v-model="search_words" />
            <input type="text" v-else-if="!nationalId" placeholder="بحث بالأسم..." class="p-3 w-full rounded-2xl"
                v-model="search_words" />
            <i v-if="!search_status" class="fa-thin fa-magnifying-glass absolute left-5 top-4"></i>
            <loading_Search :show="search_status" class="absolute left-5 top-0"></loading_Search>
        </div>

        <div class="col-span-1 sm:col-span-1" v-if="!this.Subject">
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
        <div class="col-span-1 sm:col-span-1" v-if="this.Subject">
            <div class="custom-select relative">
                <select v-model="selectedLevel" @change="handleLevel"
                    class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
                    <option class="font-medium text-gray-400" :value="selectedLevel" selected> إختيار الصف...
                    </option>
                    <option class="font-medium text-gray-400" v-for="(item, index) in stages" :value="selectedLevel"
                        selected> {{ item.stage_name }}
                    </option>
                    <!-- <option class="font-medium" value="الصف الأول الإبتدائي">الصف الأول الإبتدائي</option>
                    <option class="font-medium" value="الصف الثاني الإبتدائي">الصف الثاني الإبتدائي</option>
                    <option class="font-medium" value="الصف الثالث الإبتدائي">الصف الثالث الإبتدائي</option>
                    <option class="font-medium" value="الصف الرابع الإبتدائي">الصف الرابع الإبتدائي</option>
                    <option class="font-medium" value="الصف الخامس الإبتدائي">الصف الخامس الإبتدائي</option>
                    <option class="font-medium" value="الصف السادس الإبتدائي">الصف السادس الإبتدائي</option> -->
                </select>
                <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                    <i class="fa-solid fa-arrow-down-up-across-line"></i>
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
        nationalId: {
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
        Subject: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            selectedSortOption: "ترتيب أبجدي",
            selectedLevel: "إختار الصف...",
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
                    if (this.nationalId) {
                        const filteredResults = this.MainArray.filter(
                            (item) => item.national_id.toString().includes(this.search_words));
                        this.$emit("filter", filteredResults);
                    }
                    else if (this.teacher) {
                        const filteredResults = this.MainArray.filter(
                            (item) => item.name.includes(this.search_words));
                        this.$emit("filter", filteredResults);
                    }
                    else if (this.request) {
                        const filteredResults = this.MainArray.filter(
                            (item) => item.parentName.includes(this.search_words));
                        this.$emit("filter", filteredResults);
                    }
                    else if (this.event) {
                        const filteredResults = this.MainArray.filter(
                            (item) => item.name.includes(this.search_words));
                        this.$emit("filter", filteredResults);
                    }
                    else if (this.controller) {
                        const filteredResults = this.MainArray.filter(
                            (item) => item.name.includes(this.search_words));
                        this.$emit("filter", filteredResults);
                    }
                    else if (this.Subject) {
                        const filteredResults = this.MainArray.filter(
                            (item) => item.subjname.includes(this.search_words));
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
            this.$emit('filter', newData);
        },
        handleLevel() {
            var newData = [...this.MainArray];
            if (this.selectedLevel === "الصف الأول الإبتدائي") {
                newData = this.MainArray.filter(A => A.level === "الصف الأول الإبتدائي");
            } else if (this.selectedLevel === "الصف الثاني الإبتدائي") {
                newData = this.MainArray.filter(A => A.level === "الصف الثاني الإبتدائي");
            } else if (this.selectedLevel === "الصف الثالث الإبتدائي") {
                newData = this.MainArray.filter(A => A.level === "الصف الثالث الإبتدائي");
            } else if (this.selectedLevel === "الصف الرابع الإبتدائي") {
                newData = this.MainArray.filter(A => A.level === "الصف الرابع الإبتدائي");
            } else if (this.selectedLevel === "الصف الخامس الإبتدائي") {
                newData = this.MainArray.filter(A => A.level === "الصف الخامس الإبتدائي");
            } else if (this.selectedLevel === "الصف السادس الإبتدائي") {
                newData = this.MainArray.filter(A => A.level === "الصف السادس الإبتدائي");
            } else {
                newData = this.MainArray;
            }
            this.$emit('filter', newData);
        },
        handleSort() {
            if (this.selectedLevel === "ascending") {
                this.Sort_ascending();
            } else if (this.selectedLevel === "descending") {
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
