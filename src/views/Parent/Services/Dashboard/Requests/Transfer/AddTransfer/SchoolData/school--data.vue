<template>
  <div class="mt-20 card rounded-2xl">
    <div class="p-10">
      <span class="text-3xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2">  <i class="fa-duotone fa-sparkles"></i>بيانات المدرسة </span>
      <div class="p-10 text-2xl text-black">
        اختار المدرسة المراد التحويل اليها
        <form class="max-w-lg ">
          <select id="countries" v-model="selectId" @change="select"
                  class="bg-gray-50 border border-gray-300  text-lg rounded-lg   block w-full p-2.5 mt-10">
            <option selected disabled>اختار مدرسة</option>
            <option v-for="school in getAllSchools" :key="school.id" :value="school.id">{{ school.name }}</option>

          </select>
        </form>
      </div>
      <div class="flex items-end justify-end">
        <button class="w-96" @click="sendTransferRequest">ارسال طلب تحويل</button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

  export  default {
    props:['scID','adID'],
    data(){
      return{
        selectId:'اختار مدرسة'
      }
    },
    computed:{
      ...mapGetters(['getAllSchools'])
    },
    async created(){
      console.log(this.scID,this.adID)
      const form=new FormData();
      form.append('school_Id',this.scID)
      if(this.adID&&this.scID) {
        await this.FetchNotOwnSchool({AdID: this.adID, ScID: form});
      }

    },
    methods:{
      ...mapActions(['FetchNotOwnSchool']),
      select(){
        console.log(this.selectId)
      },
      sendTransferRequest() {
        this.$emit('transfer-request', this.selectId);
      }
    }
  }
</script>
<style scoped>
@import url("../../../../../../../../UI/CustomsCss/CustomParentInput.css");
@import url("../../../../../../../../UI/CustomsCss/Custombutton.css");
</style>