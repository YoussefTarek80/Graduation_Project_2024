<template>
  <NavBar_View></NavBar_View>
  <base-teleport :show="success">
    <div class="flex  items-center justify-center w-full p-10">
              <span class="text-customDarkPurple mx-5">
                  تم انشاء تذكرة
              </span>
              <i class="fa-sharp fa-solid fa-badge-check text-customDarkPurple text-6xl"></i>
    </div>
  </base-teleport>
  <section class="flex flex-col items-center justify-between m-10" data-aos="fade-left" data-aos-duration="1000">
    <div class="grid sm:grid-cols-1 grid-cols-10 px-10  w-full  " data-aos="fade-left">
      <div ref="responsesDiv" class="Responses overflow-auto w-full sm:p-10  rounded-2xl sm:col-span-5 col-span-10 border-dashed border-2 border-gray-400  shadow-xl ">
        <div class="flex flex-col text-xl gap-3">
          <span class="font-bold text-customDarkPurple text-2xl">اهلا بك في Darb Chat Bot</span>
          <span>يمكن لهذا الشات مساعدتك في معرفه معلومات اكثر عن النظام او ارسال اي سوال  </span>
        </div>
        <div class=" bg-gray-200 w-full my-10 flex flex-wrap flex-col items-end justify-start p-5 rounded-3xl element"
               v-for="(ques,index) in Questions" :key="index">
            <div class="flex flex-col items-center justify-between w-full gap-5 px-10" >
              <p class="w-full text-customDarkPurple font-bold  h-auto">{{ques.input}}</p>
            </div>
            <div class="p-5 flex flex-row-reverse items-center justify-center" v-if="ques.answer!=='Not learned'">
              <div class="flex flex-row-reverse items-center">
                <img src="../../../../assets/Parent/chatbot.png" class="w-16 p-2" >
              </div>
              {{ ques.answer }}
            </div>
            <div v-if="ques.answer==='Not learned'" class="mt-10 flex flex-col items-center justify-center w-full">
              <span>
               لم يتم التعرف علي هذا السؤال
                يمكنك الان الارسال الي الدعم الرسالة وسوف ينم الرد عليك في اسرع
              </span>
              <div class="inputSupport sm:w-full w-96 flex  relative mt-10">
                <input placeholder="ادخل عنوان الرسالة" type="text" required="" autocomplete="off"  v-model="description" class="p-3 rounded-br-2xl rounded-tr-2xl w-full">
                <button @click="AddQuestion(ques.input)" class="   bg-customLightPurple text-white rounded-bl-2xl rounded-tl-2xl w-2/12">
                  ارسال الرسالة
                </button>
              </div>
            </div>
          </div>
      </div>
      <div class="flex flex-col items-center justify-evenly sm:gap-5 px-5  rounded-2xl  sm:col-span-6 col-span-12 ">
        <div class="flex  items-center justify-center w-full">
          <img src="../../../../assets/Parent/chatbot.png" class="w-24 p-2">
          <form @submit.prevent class="flex sm:w-full w-full sm:mt-0 mt-10">
            <input placeholder="ادخل نص" type="text" id="input-field"
                   class="sm:w-full px-3 py-2 border-2 border-black rounded-2xl" v-model="input">
            <button class="submit-button px-4" @click="DarbGPT" id="btn">
              <i class="fa-sharp fa-solid fa-paper-plane-top text-4xl rotate-180"></i>
            </button>
          </form>
        </div>
      </div>
    </div>

  </section>
</template>
<script>
import NavBar_View from "../../../../components/Parent/NavBar.vue"
import axios from "axios";
import BaseTeleport from "../../../../UI/BaseTeleport.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    BaseTeleport,
    NavBar_View
  },
  inject:['support'],
  data() {
    return {
      input: "",
      Questions:[],
      QuestionId:0,
      description:"",
      supportQuestions:"",
      supportQuestionsID:0,
      success:false,
      schoolID:null
    }
  },
  mounted() {
    console.log(this.support)
  },
  watch: {
    Questions: {
      handler() {
        this.scrollToBottom();
      },
      deep: true,
    },
  },
  async created() {
    await this.GetChildSchools();
  },
  computed:{
    ...mapGetters(["GetSchools"])
  },
  methods: {
    ...mapActions(["Add_Question_For_School","GetChildSchools"]),
    show(){
      this.showAI=true
    },
    async DarbGPT() {
      try {
        const questions = {
          // question: this.input
          message:this.input
        }
        const response = await axios.post("http://127.0.0.1:5000/ask", questions);
        this.Questions[this.QuestionId++] = { input: this.input, answer: response.data.response };
        this.input = "";
        console.log(this.Questions);
      } catch (err) {
        console.log(err);
      }
    },
    async AddQuestion(message){
      try{
        console.log("message",message)
        console.log("answer",null)
        console.log("school_id",this.schoolID)
        console.log("description",this.description)
        const formData= new FormData();
        formData.append("question",message);
        formData.append("answer","");
        formData.append("school_id",this.schoolID);
        formData.append("description",this.description);
        await this.Add_Question_For_School(formData);
        // this.support[this.supportQuestionsID++] = { question: message, answer: "", desc: this.description };
        this.success=true;
        setTimeout(()=>{
          this.success=false;
        },2000)
      }catch(err){
        console.log(err)
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const responsesDiv = this.$refs.responsesDiv;
        responsesDiv.scrollTop = responsesDiv.scrollHeight;
      });
    },
  }
}
</script>
<style scoped>
@import url("./ai.css");
@import url("../../../../UI/CustomsCss/CustomInput.css");
</style>