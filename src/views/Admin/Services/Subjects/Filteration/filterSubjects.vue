<template>
  <div class="bg-customSearch shadow-2xl flex flex-col gap-5 items-center justify-around p-5 mt-6 rounded-xl">
    <div class="flex w-full items-center justify-between gap-5 ">
      <div class="w-full relative">
        <select
            v-model="stageID"
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
            :disabled="select"
            @change="selectlevel"
            class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple"
        >
          <option value="" disabled>اختر الصف الدراسي </option>
          <option v-for="level in GetAllLevels" :key="level.id" :value="level.id">{{ level.grade_name }}</option>
        </select>
        <i class="fa-solid fa-arrow-down-big-small absolute left-5 top-2 text-2xl"></i>
      </div>
    </div>
    <div class="w-full relative">
      <select
          v-model="termID"
          @change="selectTerm"
          :disabled="select2"
          class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple"
      >
        <option value="" disabled>اختر الترم الدراسي </option>
        <option v-for="term in GetAllTerms" :key="term.id" :value="term.id">{{ term.term_name }}</option>
      </select>
      <i class="fa-solid fa-arrow-down-big-small absolute left-5 top-2 text-2xl"></i>
    </div>
    <div v-if="termID&&levelID&&stageID" class="self-end  py-2  border-2 border-black shadow-2xl rounded-full flex items-center justify-evenly w-2/12 cursor-pointer" @click="clear" >
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
      stageID: "",
      levelID: "",
      termID: "",
      levelName: "",
      RetrivedDone: false,
      retrivedTerms: false,

    };
  },
  computed: {
    ...mapGetters(["GetAllstages", "GetAllLevels", "GetAllTerms"])
  },
  async created() {
    await this.GetStages();
    console.log(this.GetAllLevels);
  },
  methods: {
    ...mapActions(["GetStages", "GetLevels", "GetTerms"]),
    async selectStage(event) {
      this.stageID = event.target.value;
      await this.GetLevels(this.stageID);
      this.select = false;
      this.$emit('Retrived-false', this.RetrivedDone);

    },
    async selectlevel(event) {
      this.levelID = event.target.value;
      const selectedLevel = this.GetAllLevels.find(level => level.id == this.levelID);
      this.levelName = selectedLevel ? selectedLevel.grade_name : "";
      this.$emit('level-selected', this.levelID);
      this.$emit('level-name-selected', this.levelName);
      try {
        await this.GetTerms();
        this.select2 = false;
        this.$emit('Retrived-false', this.RetrivedDone);
      } catch (err) {
        throw err;
      }
    },
    selectTerm(event) {
      this.termID = event.target.value;
      this.$emit('term-selected', this.termID);
      this.$emit('Retrived-done', this.RetrivedDone);

    },
    clear() {
      this.stageID = "";
      this.levelID = "";
      this.termID = "";
      this.select = true;
      this.select2 = true;
      this.levelName = "";
      this.$emit('level-selected', null);
      this.$emit('level-name-selected', null);
      this.$emit('term-selected', null);
      this.$emit('Retrived-done', false);
      this.$emit('Retrived-false', false);
    }
  }
}
</script>

<style scoped>
select {
  cursor: pointer;
}
</style>
