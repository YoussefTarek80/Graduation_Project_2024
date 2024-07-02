<template>
  <div class="bg-customSearch shadow-2xl flex flex-col items-center justify-around p-5 mt-6 rounded-xl">
    <div class="relative w-full mb-6" v-if="nationalIDS">
      <input
          type="text"
          placeholder="بحث بالرقم القومي"
          class="p-3 w-full rounded-2xl outline-0"
          v-model="search_NationalID"
      />
      <button class="absolute bg-customLightPurple text-white left-0 w-2/12 p-3 rounded-2xl" v-if="search_NationalID">
        بحث
        <i class="fa-thin fa-magnifying-glass absolute left-5 top-4 text-white"></i>
      </button>
    </div>
    <div class="grid sm:grid-cols-2 grid-cols-1 w-full gap-6">
      <div class="relative" v-if="Search">
        <input
            type="text"
            placeholder="بحث"
            class="p-3 w-full rounded-2xl outline-0"
            v-model="search_words"
        />
        <button class="absolute bg-customLightPurple text-white left-0 w-2/12 p-3 rounded-2xl transition-all" v-if="search_words" @click="search">
          بحث
          <i v-if="!search_words" class="fa-thin fa-magnifying-glass absolute left-5 top-4 text-white"></i>
        </button>
      </div>
      <div class="custom-select relative" v-if="select_school">
        <select v-model="selectedSchool" @change="selectSchool"
                class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
          <option disabled selected>اختيار مدرسة</option>
          <option value="ascending" v-for="school in schools" :key="school.id">{{ school.name }}</option>
        </select>
        <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
          <i class="fa-light fa-school mx-4"></i>
        </div>
      </div>
      <div class="custom-select relative" v-if="status">
        <select v-model="selectedStatus" @change="handleFilterByStatus"
                class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
          <option value="" disabled selected>الحالة</option>
          <option value="0">جاري</option>
          <option value="1">انتهي</option>
        </select>
        <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
          <i class="fa-duotone fa-sort mx-4"></i>
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
import { mapActions, mapGetters } from "vuex";

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
    select_school: {
      type: Boolean,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    rearrange: {
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
      selectedStatus: "",
      search_NationalID: null,
    };
  },
  watch: {
    search_words() {
      if (!this.search_words) {
        this.$emit("filter", this.MainArray);
      }
    },
  },
  computed: {
    ...mapGetters(["schools", "fetchSchoolsStatus"]),
  },
  created() {
    this.fetchData();
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
      this.filteredArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    },
    Sort_descending() {
      this.filteredArray.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    },
    search() {
      if (this.search_words) {
        const filteredResults = this.filteredArray.filter(
            (item) =>
                item.name.toLowerCase().includes(this.search_words.toLowerCase())
        );
        this.$emit("filter", filteredResults);
      } else {
        this.$emit("filter", this.MainArray);
      }
    },
    handleFilterByStatus() {
      const statusToFilter = parseInt(this.selectedStatus);
      if (!isNaN(statusToFilter)) {
        const filteredResults = this.filteredArray.filter(
            (item) => item.status.toString() === statusToFilter.toString()
        );
        console.log(filteredResults)
        this.$emit("filter", filteredResults);
      } else {
        this.$emit("filter", this.MainArray);
      }
    },
  },
};
</script>
