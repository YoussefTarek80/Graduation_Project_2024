<template>
  <div class="bg-customSearch shadow-2xl flex flex-col gap-5 items-center justify-around p-5 mt-6 rounded-xl">
    <div class="custom-select relative w-full" >
      <select
          v-model="schoolID"
          @change="selectSchool"
          class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple"
      >
        <option disabled  value="" >اختيار مدرسة</option>
        <option
            :value="school.id"
            v-for="school in schools"
            :key="school.id"
        >
          {{ school.name }}
        </option>
      </select>
      <div
          class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none"
      >
        <i class="fa-light fa-school mx-4"></i>
      </div>
    </div>

    <div class="flex w-full items-center justify-between gap-5 ">
      <div class="w-full relative">
        <select
            v-model="stageID"
            :disabled="select"
            @change="selectStage"
            class="w-full relative appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple"
        >
          <option value="" disabled>اختر المرحلة الدراسية </option>
          <option v-for="stage in GetAllstages" :key="stage.id" :value="stage.id">{{ stage.stage_name }}</option>
        </select>
        <i class="fa-solid fa-arrow-down-big-small absolute left-5 top-2 text-2xl"></i>
      </div>

      <div class="w-full relative">
        <select
            v-model="levelID"
            :disabled="select2"
            @change="selectlevel"
            class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple"
        >
          <option value="" disabled>اختر الصف الدراسي </option>
          <option v-for="level in GetAllLevels" :key="level.id" :value="level.id">{{ level.grade_name }}</option>
        </select>
        <i class="fa-solid fa-arrow-down-big-small absolute left-5 top-2 text-2xl"></i>
      </div>
    </div>

    <div class="relative w-full mb-6" >
      <input
          type="text"
          :disabled="select3"
          placeholder="بحث بالرقم القومي"
          class="p-3 w-full rounded-2xl outline-0"
          v-model="search_NationalID"
      />
      <button class="absolute bg-customLightPurple text-white left-0 w-2/12 p-3 rounded-2xl" v-if="search_NationalID" @click="searchByNationalID">
        بحث
        <i
            class="fa-thin fa-magnifying-glass absolute left-5 top-4 text-white"
        ></i>
      </button>
    </div>
    <div v-if="levelID" class="self-end  py-2  border-2 border-black shadow-2xl rounded-full flex items-center justify-evenly w-2/12 cursor-pointer" @click="clear" >
      <button class="" >مسح الاختيارات</button>
      <i class="fa-thin fa-trash"></i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      select: true,
      select2: true,
      select3: true,
      schoolID: "",
      stageID: "",
      levelID: "",
      search_NationalID: "",
      RetrivedDone: false,
      retrivedTerms: false,

    };
  },
  computed: {
    ...mapGetters(["GetAllstages", "GetAllLevels","schools", "fetchSchoolsStatus"]),
  },
  async created() {
    await this.fetchSchools();
    await this.GetStages();
    console.log(this.GetAllLevels);
  },
  methods: {
    ...mapActions(["GetStages", "GetLevels","fetchSchools"]),
    async selectSchool(event){
      this.schoolID = event.target.value;
      this.select = false;
      this.$emit('school-selected', this.schoolID);
      this.$emit('Retrived-false', this.RetrivedDone);
    },
    async selectStage(event) {
      this.stageID = event.target.value;
      this.select2 = false;
      await this.GetLevels(this.stageID);
      this.$emit('stage-selected', this.stageID);
      this.$emit('Retrived-false', this.RetrivedDone);
    },
    async selectlevel(event) {
      this.levelID = event.target.value;
      this.select3 = false;
      this.$emit('level-selected', this.levelID);
      try {
        this.select3 = false;
        this.$emit('Retrived-false', this.RetrivedDone);
      } catch (err) {
        throw err;
      }
    },
    clear() {
      this.schoolID = "";
      this.stageID = "";
      this.levelID = "";
      this.select = true;
      this.select2 = true;
      this.select3 = true;
      this.$emit('level-selected', null);
      this.$emit('stage-selected', null);
      this.$emit('school-selected', null);
      this.$emit('Retrived-done', false);
      this.$emit('Retrived-false', false);
    },
    searchByNationalID() {
      this.$emit("search-national-id", this.search_NationalID);
    },
    search(){
      if (this.search_words) {
        const filteredResults = this.filteredArray.filter(
            (item) =>
                item.name
                    .toLowerCase()
                    .includes(this.search_words.toLowerCase())
        );
        this.$emit("filter", filteredResults);
      } else {
        this.$emit("filter", this.MainArray);
      }
    }
  }
}
</script>

<style scoped>
select {
  cursor: pointer;
}
</style>
