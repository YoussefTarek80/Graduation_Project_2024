<template>
    <sc-navbar-comp></sc-navbar-comp>
    <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex flex-col">
            <span class="sm:text-3xl text-2xl"> عرض المناهج للصفوف الدراسية</span>
            <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
        </div>
        <FilterSubjects @term-selected="handleTermSelected" @level-selected="handlelevelSelected"
            @level-name-selected="handlelevelSelectedName" @Retrived-done="handleRetrived"
            @Retrived-false="handleResetRetrived"></FilterSubjects>
        <laoding_INFO3 v-if="!RetrivedDone && termID"></laoding_INFO3>
        <div class="subjects bg-customBGCards shadow-2xl rounded-2xl py-10" v-if="RetrivedDone" data-aos="fade-left">
            <div class="flex  justify-evenly">
                <div class="flex flex-col gap-10 ">
                    <div class=" text-3xl text-customDarkPurple">
                        <span>الصف الدراسي: </span>
                        <span class="underline font-bold">{{ levelName }} </span>
                    </div>
                    <span class="text-2xl">
                        عدد المواد الاساسية: 12
                    </span>
                    <span class="text-2xl">
                        عدد المواد الفرعية: 12
                    </span>
                </div>
                <Table :items="GetScSubjects"></Table>
            </div>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import FilterSubjects from '../../../../components/School/Filtration/Filter-Subject.vue'
import Table from "../../../../UI/Tables/SubjectTable/Table.vue";
import { mapActions, mapGetters } from "vuex";

export default {
    components: { Table, FilterSubjects },
    data() {
        return {
            items: [],
            termID: null,
            levelID: null,
            levelName: "",
            RetrivedDone: false,
            SubhjectRetrivedDone: false,
            RetrivedTermDone: false
        }
    },
    computed: {
        ...mapGetters(['GetScSubjects']),
        RetrivedDone() {
            if (this.RetrivedDone && this.SubhjectRetrivedDone) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    created() { },
    mounted() { },
    methods: {
        ...mapActions(['fetchScSubjects'])
        ,
        async handleTermSelected(termID) {
            try {
                this.termID = termID;
                console.log('Selected termID:', this.termID);
                await this.fetchScSubjects({ levelID: this.levelID, termID: this.termID })
                this.SubhjectRetrivedDone = true;
            }
            catch (err) {
                console.log(err)
            }
        },
        handlelevelSelected(levelID) {
            this.levelID = levelID;
            console.log('Selected levelID:', this.levelID);
        },
        handlelevelSelectedName(levelName) {
            this.levelName = levelName;
            console.log('Selected level Name:', this.levelName);
        },
        handleRetrived() {
            this.RetrivedDone = true
        },
        handleResetRetrived() {
            this.RetrivedDone = false
        },
    }
}
</script>
<style scoped></style>