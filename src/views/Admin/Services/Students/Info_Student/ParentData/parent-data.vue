<template>
  <div class="mt-10 card rounded-2xl">
    <div class="p-10">
      <span class="text-3xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2">  <i class="fa-duotone fa-sparkles"></i>بيانات الاب </span>
      <div class="grid grid-cols-2 gap-5 items-center justify-center py-10">
        <div class="">
          <div class="inputGroup2 sm:w-full w-96 ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.name">
            <label for="">اسم الاب</label>
          </div>
          <div class="inputGroup2 sm:w-full w-96 ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.national_id">
            <label for="">رقم القومي الاب</label>
          </div>
          <div class="inputGroup2 sm:w-full w-96 ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.gender">
            <label for="">النوع</label>
          </div>
          <div class="inputGroup2 sm:w-full w-96 ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.address">
            <label for="">العنوان</label>
          </div>
        </div>
        <div class="">
          <div class="inputGroup2 sm:w-full w-96 ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.email">
            <label for="">البريد الاكتروني</label>
          </div>
          <div class="inputGroup2 sm:w-full w-96 ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.phone">
            <label for="">رقم الهاتف</label>
          </div>
          <div class="inputGroup2 sm:w-full w-96 ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.nationality">
            <label for="">الجنسبة</label>
          </div>
          <div class="inputGroup2 sm:w-full w-96 ">
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
  props:['form']

}
</script>
<style scoped>
@import url("../../../../../../../../UI/CustomsCss/CustomParentInput.css");
</style>