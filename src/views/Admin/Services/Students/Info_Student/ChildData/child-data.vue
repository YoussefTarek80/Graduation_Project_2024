<template>
  <div class="mt-10 p-10 card rounded-2xl shadow-2xl">
    <span class="text-3xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2">  <i class="fa-duotone fa-sparkles"></i>بيانات الطالب </span>
    <div class="sm:p-10" v-for="form in array" :key="form.id">
      <img loading="lazy" :src="form.image" class="w-60 mx-auto rounded-full p-5 border-2 border-gray-500">
      <div class="grid sm:grid-cols-2 grid-cols-1 gap-5  py-10">
        <div class="">
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.name">
            <label for="">اسم الطالب</label>
          </div>
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.national_id">
            <label for="">رقم القومي الطالب</label>
          </div>
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.gender">
            <label for="">النوع</label>
          </div>
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.grade_name">
            <label for="">الصف الدراسي</label>
          </div>
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="date" required="" autocomplete="off" readonly  v-model="form.date_of_birth">
            <label for="">تاريخ الميلاد</label>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <img loading="lazy" :src="form.childbirth_certificate" class="w-72 ">
        </div>
      </div>

      <div >
        <span class="text-3xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2">  <i class="fa-duotone fa-sparkles"></i>درجات الطالب </span>
        <button @click="this.$router.push(gradeRoute(this.$route.params.index))" class="flex items-center justify-center flex-wrap gap-5 sm:m-10 m-5" >
           كشف الدرجات الطالب
        </button>
      </div>
    </div>
  </div>
</template>
<script >
export  default {
  props:['array'],
  methods:{
    gradeRoute(index){
      return `${'/Admin/Students/InfoStudent/studScores'}/${index}`;
    },
  }
}
</script>
<style scoped>
@import url("../../../../../../UI/CustomsCss/CustomParentInput.css");
@import url("../../../../../../UI/CustomsCss/Custombutton.css");
</style>