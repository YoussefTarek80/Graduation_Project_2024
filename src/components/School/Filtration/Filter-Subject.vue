<template>
    <div class="bg-customSearch shadow-2xl flex flex-col mb-10 gap-5 items-center justify-around p-5 mt-6 rounded-xl">
        <div class="flex w-full items-center justify-between gap-5 ">
            <div class="w-full relative">
                <select v-model="stageID" @change="selectStage"
                    class="w-full relative appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
                    <option value="" disabled>اختر المرحلة الدراسية</option>
                    <option v-for="stage in GetScStages" :key="stage.id" :value="stage.id">{{ stage.stage_name }}
                    </option>
                </select>
                <i class="fa-solid fa-arrow-down-big-small absolute left-5 top-2 text-2xl"></i>
            </div>
            <div class="w-full relative">
                <select v-model="levelID" :disabled="select" @change="selectlevel"
                    class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
                    <option value="" disabled>اختر الصف الدراسي</option>
                    <option v-for="level in GetScLevels" :key="level.id" :value="level.id">{{ level.grade_name }}
                    </option>
                </select>
                <i class="fa-solid fa-arrow-down-big-small absolute left-5 top-2 text-2xl"></i>
            </div>
        </div>
        <div class="w-full relative">
            <select v-model="termID" :disabled="select2" @change="selectTerm"
                class="w-full appearance-none bg-white border border-gray-300 rounded-2xl p-3 px-4 focus:outline-none focus:border-customDarkPurple">
                <option value="" disabled>اختر الترم الدراسي</option>
                <option v-for="term in GetScTerms" :key="term.id" :value="term.id">{{ term.term_name }}</option>
            </select>
            <i class="fa-solid fa-arrow-down-big-small absolute left-5 top-2 text-2xl"></i>
        </div>
        <div v-if="termID && levelID && stageID"
            class="self-end  py-2  border-2 border-black shadow-2xl rounded-full flex items-center justify-evenly w-2/12 cursor-pointer"
            @click="clear">
            <button>مسح الاختيارات</button>
            <i class="fa-thin fa-trash"></i>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
    data() {
        return {
            select: true,
            select2: true,
            stageID: localStorage.getItem('stageID'),
            levelID: localStorage.getItem('levelID'),
            termID: localStorage.getItem('termID'),
            levelName: "",
            RetrivedDone: false,
            retrivedTerms: false,
        };
    },
    computed: {
        ...mapGetters(["GetScStages", "GetScLevels", "GetScTerms"])
    },
    async mounted() {
        if (localStorage.getItem('levelID') && localStorage.getItem('termID')) {
            this.select = false; this.select2 = false;
            await this.fetchScLevels(this.stageID);
            await this.fetchScTerms();
        }

    },
    async created() {
        await this.fetchScStages();
    },
    methods: {
        ...mapActions(["fetchScStages", "fetchScLevels", "fetchScTerms"]),
        async selectStage(event) {
            this.stageID = event.target.value;
            await this.fetchScLevels(this.stageID);
            localStorage.setItem('stageID', this.stageID);
            this.select = false
            this.$emit('Retrived-false', this.RetrivedDone);
        },
        async selectlevel(event) {
            this.levelID = event.target.value;
            localStorage.setItem('levelID', this.levelID);
            const selectedLevel = this.GetScLevels.find(level => level.id == this.levelID);
            this.levelName = selectedLevel ? selectedLevel.grade_name : "";
            this.$emit('level-selected', this.levelID);
            this.$emit('level-name-selected', this.levelName);
            try {
                await this.fetchScTerms();
                this.select2 = false;
                this.$emit('Retrived-false', this.RetrivedDone);
            } catch (err) {
                throw err;
            }
        },
        selectTerm(event) {
            this.termID = event.target.value;
            localStorage.setItem('termID', this.termID);
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
            localStorage.setItem('stageID', '');
            localStorage.setItem('levelID', '');
            localStorage.setItem('termID', '');
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
