<template>
  <Navbar></Navbar>
  <section class="m-6 sm:m-16 " data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col ">
      <span class="sm:text-4xl text-2xl text-customDarkPurple"> عرض نتيجة الطالب </span>
      <i
          class="fa-regular fa-horizontal-rule fa-2xl text-customPink text-2xl"
      ></i>
    </div>
    <Filter @term-selected="handleTermSelected" @level-selected="handlelevelSelected" @level-name-selected="handlelevelSelectedName" @Retrived-done="handleRetrived" @Retrived-false="handleResetRetrived"> </Filter>
    <div v-if="!GetScoreStud">
      <loading_info2></loading_info2>
    </div>
    <div  v-if="GetScoreStud" data-aos="fade-left" data-aos-duration="1000" class="score text-xl sm:mx-52 sm:my-20 bg-gray-200 sm:p-20 p-5 rounded-xl" v-for="score in GetScoreStud" :key="score.id">
      <div class="bg-customDarkPurple flex items-center justify-around rounded-2xl " v-for="std in GetStdInfo" :key="std.id">
        <div class="scoreHead flex flex-col sm:text-xl text-sm  text-white  p-5 gap-3   ">
          <span>الاسم : {{ std.name }} </span>
          <span>الرقم القومي: {{ std.national_id }}</span>
          <span>المدرسة :{{std.school.school_name }}</span>
        </div>
        <img :src="std.school.school_image" class="m-4 sm:w-32 sm:h-32 w-20 h-20 rounded-full p-2 border-gray-400 border-2">
      </div>
      <div class="scoreDetails flex flex-col gap-4 m-5" v-for="term in score.terms " :key="term.id">
        <div class="font-bold underline sm:text-2xl text-customDarkPurple  p-5 flex gap-2 items-end justify-end">
          <span>شهاده {{score.GradeName }}</span>
          <span class="">{{ term.TermName }}</span>
        </div>
        <div class="font-bold underline sm:text-2xl  text-center text-customDarkPurple  p-5">

        </div>
        <div class="flex flex-col  gap-6  mt-5 sm:text-xl text-sm" >
          <div v-for="subject in term.scores " :key="subject.id" class="flex items-center justify-start gap-2">
            <span class="font-bold  " >{{ subject.score_subject }}:</span>
            <span class="">{{subject.Score}}</span>
          </div>
        </div>
        <hr class="h-0.5 bg-customDarkPurple">
        <div class="flex sm:flex-row flex-col items-center justify-around sm:text-xl text-sm">
          <div class="flex  gap-2  mt-5">
            <span class="font-bold ">النتيجة النهائية:</span>
            <span>{{ term.totalScore }}</span>
          </div>
          <div class="flex  gap-2  mt-5">
            <span class="font-bold ">النسبة المئوية:</span>
            <span>{{ term.percentage }}%</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script >
import Navbar from "../../../../../../components/Admin/Navbar/Navbar.vue";
import Filter from "./Filteration/filter.vue";
import {mapActions, mapGetters} from "vuex";
import FilterSubjects from "../../../Subjects/Filteration/filterSubjects.vue";
import Loading_info2 from "../../../../../../UI/loadingInformation/loading_info2.vue";

export default {
  components: { Loading_info2, FilterSubjects, Filter, Navbar},
  data() {
    return {
      items: [],
      termID:null,
      levelID:null,
      levelName:"",
      RetrivedDone:false,
      SubhjectRetrivedDone:false,
      RetrivedTermDone:false,
      scores:0,
      scorePre:null
    }
  },
  async created(){
    await this.FetchSpecificStudent(this.$route.params.index)
  },
  computed:{
    ...mapGetters(['GetScoreStud',"GetStdInfo"])
  },
  methods:{
    ...mapActions(['FetchScore',"FetchSpecificStudent"]),
    async handleTermSelected(termID){
      try{
        this.termID=termID
        console.log('Selected termID:', this.termID);
        await this.FetchScore({studentId:this.$route.params.index,levelId:this.levelID,termId:this.termID})
        this.SubhjectRetrivedDone=true;
        console.log("students",this.GetStdInfo)
      }
      catch(err){
        throw err
      }
    },
    handlelevelSelected(levelID){
      this.levelID = levelID;
      console.log('Selected levelID:', this.levelID);

    },
    handlelevelSelectedName(levelName){
      this.levelName = levelName;
      console.log('Selected level Name:', this.levelName);
    },
    handleRetrived(){
      this.RetrivedDone=true
    },
    handleResetRetrived(){
      this.RetrivedDone=false
    },
    calcSums(scores){
      this.scores+=scores;
      console.log(this.scores)
    }
  }
}
</script>



<style scoped>

</style>