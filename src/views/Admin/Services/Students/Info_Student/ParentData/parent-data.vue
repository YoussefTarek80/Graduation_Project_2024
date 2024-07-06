<template>
  <div class="mt-10 p-10 card rounded-2xl shadow-2xl">
    <span class="text-3xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2">  <i class="fa-duotone fa-sparkles"></i>بيانات الاب </span>
    <div class="sm:p-10" v-for="form in array" :key="form.id">
      <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-5 items-center justify-center py-10">
        <div class="">
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.parent.name">
            <label for="">اسم الاب</label>
          </div>
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.parent.national_id">
            <label for="">رقم القومي الاب</label>
          </div>
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.parent.gender">
            <label for="">النوع</label>
          </div>
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.parent.job">
            <label for="">الوظيفة</label>
          </div>
        </div>
        <div class="">
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.parent.email">
            <label for="">البريد الاكتروني</label>
          </div>
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.parent.phone">
            <label for="">رقم الهاتف</label>
          </div>
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.parent.nationality">
            <label for="">الجنسبة</label>
          </div>
          <div class="inputGroup2 sm:w-full w-auto ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.religion">
            <label for="">الديانة</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['array']

}
</script>
<style scoped>
@import url("../../../../../../UI/CustomsCss/CustomParentInput.css");
</style>