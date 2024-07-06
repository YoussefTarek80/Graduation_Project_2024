<template>
  <div class="mt-10 card rounded-2xl">
    <div class="p-10">
      <span class="text-3xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2">  <i class="fa-duotone fa-sparkles"></i>بيانات الطفل </span>
      <img loading="lazy" :src="form.image" class="w-60 mx-auto rounded-full p-5 border-2 border-gray-500">
      <div class="grid grid-cols-2 gap-5  py-10">
        <div class="">
          <div class="inputGroup2 sm:w-full w-20 ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.name">
            <label for="">اسم الطالب</label>
          </div>
          <div class="inputGroup2 sm:w-full w-20 ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.national_id">
            <label for="">رقم القومي الطالب</label>
          </div>
          <div class="inputGroup2 sm:w-full w-20 ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.gender">
            <label for="">النوع</label>
          </div>
          <div class="inputGroup2 sm:w-full w-20 ">
            <input class="" type="text" required="" autocomplete="off" readonly v-model="form.level">
            <label for="">الصف الدراسي</label>
          </div>
          <div class="inputGroup2 sm:w-full w-20 ">
            <input class="" type="date" required="" autocomplete="off" readonly  v-model="form.birthdate">
            <label for="">تاريخ الميلاد</label>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <img loading="lazy" :src="form.childbirth_certificate" class="w-72 ">
        </div>
      </div>
    </div>
  </div>
</template>
<script >
export  default {
  props:['form'],
}
</script>
<style scoped>
@import url("../../../../../../../../UI/CustomsCss/CustomParentInput.css");
</style>